package teams

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/httpx"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/pagination"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/validate"
)

// Handler exposes the team HTTP API nested under a workspace.
type Handler struct {
	svc     *Service
	onError httpx.ErrorHandler
}

// NewHandler returns a Handler for svc. onError is the server-wide error
// writer every module shares.
func NewHandler(svc *Service, onError httpx.ErrorHandler) *Handler {
	return &Handler{svc: svc, onError: onError}
}

// Routes mounts the team endpoints: POST /, GET /, GET /{team_id},
// PATCH /{team_id}, DELETE /{team_id}.
func (h *Handler) Routes() chi.Router {
	r := chi.NewRouter()

	r.Post("/", httpx.Handle(h.onError, h.create))
	r.Get("/", httpx.Handle(h.onError, h.list))
	r.Get("/{team_id}", httpx.Handle(h.onError, h.get))
	r.Patch("/{team_id}", httpx.Handle(h.onError, h.update))
	r.Delete("/{team_id}", httpx.Handle(h.onError, h.remove))

	return r
}

// create creates a team inside the workspace.
//
//	@Summary     Create a team
//	@Description The workspace must exist; the team is scoped to it.
//	@Tags        teams
//	@Accept      json
//	@Produce     json
//	@Param       workspace_id path string true "Workspace id (UUID)"
//	@Param       request body CreateTeamInput true "Team to create"
//	@Success     201 {object} Team
//	@Failure     400 {object} httpx.Error "invalid_json, validation_failed, or invalid_id"
//	@Failure     404 {object} httpx.Error "workspace does not exist"
//	@Failure     500 {object} httpx.Error
//	@Router      /api/v1/workspaces/{workspace_id}/teams [post]
func (h *Handler) create(w http.ResponseWriter, r *http.Request) error {
	workspaceID, err := httpx.PathUUID(r, "workspace_id")

	if err != nil {
		return err
	}

	var req CreateTeamInput

	if err := httpx.Decode(r, &req); err != nil {
		return err
	}

	if err := validate.Check(req); err != nil {
		return err
	}

	team, err := h.svc.Create(r.Context(), workspaceID, CreateTeamInput{
		Name:        req.Name,
		Description: req.Description,
	})

	if err != nil {
		return err
	}

	w.Header().Set("Location", "/api/v1/workspaces/"+workspaceID.String()+"/teams/"+team.ID.String())

	httpx.JSON(w, http.StatusCreated, team)

	return nil
}

// list returns the workspace's teams newest first, cursor-paginated.
//
//	@Summary     List teams
//	@Description The window is stable under concurrent writes; follow
//	@Description next_cursor until it is empty. search matches the team
//	@Description name case-insensitively.
//	@Tags        teams
//	@Produce     json
//	@Param       workspace_id path string true "Workspace id (UUID)"
//	@Param       limit  query int    false "Page size; defaults to 50, capped at 100" minimum(1) maximum(100)
//	@Param       cursor query string false "Opaque continuation token from the previous page"
//	@Param       search query string false "Case-insensitive substring match on name"
//	@Success     200 {object} TeamPage
//	@Failure     400 {object} httpx.Error "invalid_limit, invalid_cursor, or invalid_id"
//	@Failure     500 {object} httpx.Error
//	@Router      /api/v1/workspaces/{workspace_id}/teams [get]
func (h *Handler) list(w http.ResponseWriter, r *http.Request) error {
	workspaceID, err := httpx.PathUUID(r, "workspace_id")

	if err != nil {
		return err
	}

	q := r.URL.Query()

	limit := 0

	if raw := q.Get("limit"); raw != "" {
		n, err := strconv.Atoi(raw)

		if err != nil {
			return httpx.New(http.StatusBadRequest, "invalid_limit", "limit must be an integer")
		}

		limit = n
	}

	page, err := h.svc.List(r.Context(), workspaceID, QueryParams{
		Params: pagination.Params{Limit: limit, Cursor: q.Get("cursor")},
		Search: q.Get("search"),
	})

	if err != nil {
		return err
	}

	httpx.JSON(w, http.StatusOK, TeamPage(*page))

	return nil
}

// get returns one team by id.
//
//	@Summary Get a team
//	@Tags    teams
//	@Produce json
//	@Param   workspace_id path string true "Workspace id (UUID)"
//	@Param   team_id path string true "Team id (UUID)"
//	@Success 200 {object} Team
//	@Failure 400 {object} httpx.Error "invalid_id"
//	@Failure 404 {object} httpx.Error "not_found"
//	@Failure 500 {object} httpx.Error
//	@Router  /api/v1/workspaces/{workspace_id}/teams/{team_id} [get]
func (h *Handler) get(w http.ResponseWriter, r *http.Request) error {
	workspaceID, err := httpx.PathUUID(r, "workspace_id")

	if err != nil {
		return err
	}

	teamID, err := httpx.PathUUID(r, "team_id")

	if err != nil {
		return err
	}

	team, err := h.svc.Get(r.Context(), workspaceID, teamID)

	if err != nil {
		return err
	}

	httpx.JSON(w, http.StatusOK, team)

	return nil
}

// update partially updates a team.
//
//	@Summary     Partially update a team
//	@Description Only the fields present in the body change.
//	@Tags        teams
//	@Accept      json
//	@Produce     json
//	@Param       workspace_id path string true "Workspace id (UUID)"
//	@Param       team_id path string true "Team id (UUID)"
//	@Param       request body UpdateTeamInput true "Fields to update"
//	@Success     200 {object} Team
//	@Failure     400 {object} httpx.Error
//	@Failure     404 {object} httpx.Error "not_found"
//	@Failure     500 {object} httpx.Error
//	@Router      /api/v1/workspaces/{workspace_id}/teams/{team_id} [patch]
func (h *Handler) update(w http.ResponseWriter, r *http.Request) error {
	workspaceID, err := httpx.PathUUID(r, "workspace_id")

	if err != nil {
		return err
	}

	teamID, err := httpx.PathUUID(r, "team_id")

	if err != nil {
		return err
	}

	var req UpdateTeamInput

	if err := httpx.Decode(r, &req); err != nil {
		return err
	}

	if err := validate.Check(req); err != nil {
		return err
	}

	team, err := h.svc.Update(r.Context(), workspaceID, teamID, UpdateTeamInput{
		Name:        req.Name,
		Description: req.Description,
	})

	if err != nil {
		return err
	}

	httpx.JSON(w, http.StatusOK, team)

	return nil
}

// remove deletes a team.
//
//	@Summary Delete a team
//	@Tags    teams
//	@Param   workspace_id path string true "Workspace id (UUID)"
//	@Param   team_id path string true "Team id (UUID)"
//	@Success 204 "The team was deleted"
//	@Failure 400 {object} httpx.Error "invalid_id"
//	@Failure 404 {object} httpx.Error "not_found"
//	@Failure 500 {object} httpx.Error
//	@Router  /api/v1/workspaces/{workspace_id}/teams/{team_id} [delete]
func (h *Handler) remove(w http.ResponseWriter, r *http.Request) error {
	workspaceID, err := httpx.PathUUID(r, "workspace_id")

	if err != nil {
		return err
	}

	teamID, err := httpx.PathUUID(r, "team_id")

	if err != nil {
		return err
	}

	if err := h.svc.Delete(r.Context(), workspaceID, teamID); err != nil {
		return err
	}

	w.WriteHeader(http.StatusNoContent)

	return nil
}
