package workspace

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/httpx"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/pagination"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/validate"
)

// Handler exposes the workspace HTTP API. Handlers return errors instead
// of writing them; httpx.Handle routes every failure through the server's
// global error handler.
type Handler struct {
	svc     *Service
	onError httpx.ErrorHandler
}

// NewHandler returns a Handler for svc. onError is the server-wide error
// writer every module shares.
func NewHandler(svc *Service, onError httpx.ErrorHandler) *Handler {
	return &Handler{svc: svc, onError: onError}
}

// Routes mounts the workspace collection endpoints: POST /, GET /.
func (h *Handler) Routes() chi.Router {
	r := chi.NewRouter()

	r.Post("/", httpx.Handle(h.onError, h.create))
	r.Get("/", httpx.Handle(h.onError, h.list))

	return r
}

// MountItem mounts the workspace-item endpoints on a router whose path
// ends at the {workspace_id} segment: GET /, PATCH /, DELETE /. Nested
// module subtrees (e.g. /teams) mount alongside it in the server.
func (h *Handler) MountItem(r chi.Router) {
	r.Get("/", httpx.Handle(h.onError, h.get))
	r.Patch("/", httpx.Handle(h.onError, h.update))
	r.Delete("/", httpx.Handle(h.onError, h.remove))
}

// create creates a workspace.
//
//	@Summary     Create a workspace
//	@Description Slug is derived from the name when omitted ("Acme Inc!"
//	@Description becomes "acme-inc"). Slugs are globally unique.
//	@Tags        workspaces
//	@Accept      json
//	@Produce     json
//	@Param       request body CreateWorkspaceInput true "Workspace to create"
//	@Success     201 {object} Workspace
//	@Failure     400 {object} httpx.Error "invalid_json or validation_failed"
//	@Failure     409 {object} httpx.Error "conflict — slug already exists"
//	@Failure     500 {object} httpx.Error
//	@Router      /api/v1/workspaces [post]
func (h *Handler) create(w http.ResponseWriter, r *http.Request) error {
	var in CreateWorkspaceInput

	if err := httpx.Decode(r, &in); err != nil {
		return err
	}

	if err := validate.Check(in); err != nil {
		return err
	}

	ws, err := h.svc.Create(r.Context(), in)

	if err != nil {
		return err
	}

	w.Header().Set("Location", "/api/v1/workspaces/"+ws.ID.String())

	httpx.JSON(w, http.StatusCreated, ws)

	return nil
}

// list returns workspaces newest first, cursor-paginated.
//
//	@Summary     List workspaces
//	@Description The window is stable under concurrent writes; follow
//	@Description next_cursor until it is empty. search matches name and
//	@Description slug case-insensitively.
//	@Tags        workspaces
//	@Produce     json
//	@Param       limit  query int    false "Page size; defaults to 50, capped at 100" minimum(1) maximum(100)
//	@Param       cursor query string false "Opaque continuation token from the previous page"
//	@Param       search query string false "Case-insensitive substring match on name and slug"
//	@Success     200 {object} WorkspacePage
//	@Failure     400 {object} httpx.Error "invalid_limit or invalid_cursor"
//	@Failure     500 {object} httpx.Error
//	@Router      /api/v1/workspaces [get]
func (h *Handler) list(w http.ResponseWriter, r *http.Request) error {
	q := r.URL.Query()

	limit := 0

	if raw := q.Get("limit"); raw != "" {
		n, err := strconv.Atoi(raw)

		if err != nil {
			return httpx.New(http.StatusBadRequest, "invalid_limit", "limit must be an integer")
		}

		limit = n
	}

	page, err := h.svc.List(r.Context(), QueryParams{
		Params: pagination.Params{Limit: limit, Cursor: q.Get("cursor")},
		Search: q.Get("search"),
	})

	if err != nil {
		return err
	}

	httpx.JSON(w, http.StatusOK, WorkspacePage(*page))

	return nil
}

// get returns one workspace by id.
//
//	@Summary Get a workspace
//	@Tags    workspaces
//	@Produce json
//	@Param   workspaceID path string true "Workspace id (UUID)"
//	@Success 200 {object} Workspace
//	@Failure 400 {object} httpx.Error "invalid_id"
//	@Failure 404 {object} httpx.Error "not_found"
//	@Failure 500 {object} httpx.Error
//	@Router  /api/v1/workspaces/{workspace_id} [get]
func (h *Handler) get(w http.ResponseWriter, r *http.Request) error {
	id, err := httpx.PathUUID(r, "workspace_id")

	if err != nil {
		return err
	}

	ws, err := h.svc.Get(r.Context(), id)

	if err != nil {
		return err
	}

	httpx.JSON(w, http.StatusOK, ws)

	return nil
}

// update partially updates a workspace.
//
//	@Summary     Partially update a workspace
//	@Description Only the fields present in the body change.
//	@Tags        workspaces
//	@Accept      json
//	@Produce     json
//	@Param       workspaceID path string true "Workspace id (UUID)"
//	@Param       request body UpdateWorkspaceInput true "Fields to update"
//	@Success     200 {object} Workspace
//	@Failure     400 {object} httpx.Error
//	@Failure     404 {object} httpx.Error "not_found"
//	@Failure     500 {object} httpx.Error
//	@Router      /api/v1/workspaces/{workspace_id} [patch]
func (h *Handler) update(w http.ResponseWriter, r *http.Request) error {
	id, err := httpx.PathUUID(r, "workspace_id")

	if err != nil {
		return err
	}

	var in UpdateWorkspaceInput

	if err := httpx.Decode(r, &in); err != nil {
		return err
	}

	if err := validate.Check(in); err != nil {
		return err
	}

	ws, err := h.svc.Update(r.Context(), id, in)

	if err != nil {
		return err
	}

	httpx.JSON(w, http.StatusOK, ws)

	return nil
}

// remove deletes a workspace.
//
//	@Summary Delete a workspace
//	@Tags    workspaces
//	@Param   workspaceID path string true "Workspace id (UUID)"
//	@Success 204 "The workspace was deleted"
//	@Failure 400 {object} httpx.Error "invalid_id"
//	@Failure 404 {object} httpx.Error "not_found"
//	@Failure 500 {object} httpx.Error
//	@Router  /api/v1/workspaces/{workspace_id} [delete]
func (h *Handler) remove(w http.ResponseWriter, r *http.Request) error {
	id, err := httpx.PathUUID(r, "workspace_id")

	if err != nil {
		return err
	}

	if err := h.svc.Delete(r.Context(), id); err != nil {
		return err
	}

	w.WriteHeader(http.StatusNoContent)

	return nil
}
