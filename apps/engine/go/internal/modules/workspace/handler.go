package workspace

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

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

// Routes mounts the workspace endpoints: POST /, GET /, GET /{workspaceID},
// PATCH /{workspaceID}, DELETE /{workspaceID}.
func (h *Handler) Routes() chi.Router {
	r := chi.NewRouter()

	r.Post("/", httpx.Handle(h.onError, h.create))
	r.Get("/", httpx.Handle(h.onError, h.list))
	r.Get("/{workspaceID}", httpx.Handle(h.onError, h.get))
	r.Patch("/{workspaceID}", httpx.Handle(h.onError, h.update))
	r.Delete("/{workspaceID}", httpx.Handle(h.onError, h.remove))

	return r
}

type CreateRequest struct {
	Name        string `json:"name"        validate:"required,max=100" example:"Acme Inc"`
	Slug        string `json:"slug"        validate:"omitempty,max=63,slug" example:"acme-inc"`
	Description string `json:"description" validate:"max=500" example:"The Acme engineering org"`
}

// create creates a workspace.
//
//	@Summary     Create a workspace
//	@Description Slug is derived from the name when omitted ("Acme Inc!"
//	@Description becomes "acme-inc"). Slugs are globally unique.
//	@Tags        workspaces
//	@Accept      json
//	@Produce     json
//	@Param       request body CreateRequest true "Workspace to create"
//	@Success     201 {object} Workspace
//	@Failure     400 {object} httpx.Error "invalid_json or validation_failed"
//	@Failure     409 {object} httpx.Error "conflict — slug already exists"
//	@Failure     500 {object} httpx.Error
//	@Router      /api/v1/workspaces [post]
func (h *Handler) create(w http.ResponseWriter, r *http.Request) error {
	var req CreateRequest

	if err := httpx.Decode(r, &req); err != nil {
		return err
	}

	if err := validate.Check(req); err != nil {
		return err
	}

	ws, err := h.svc.Create(r.Context(), CreateInput{
		Name:        req.Name,
		Slug:        req.Slug,
		Description: req.Description,
	})

	if err != nil {
		return err
	}

	w.Header().Set("Location", "/api/v1/workspaces/"+ws.ID.String())

	httpx.JSON(w, http.StatusCreated, ws)

	return nil
}

// WorkspacePage is the workspace list envelope — a concrete specialization
// of pagination.Page so generated OpenAPI schema names stay clean.
type WorkspacePage struct {
	Items      []Workspace `json:"items"`
	NextCursor string      `json:"next_cursor"`
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

	httpx.JSON(w, http.StatusOK, WorkspacePage{Items: page.Items, NextCursor: page.NextCursor})

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
//	@Router  /api/v1/workspaces/{workspaceID} [get]
func (h *Handler) get(w http.ResponseWriter, r *http.Request) error {
	id, err := workspaceID(r)

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

type UpdateRequest struct {
	Name        *string `json:"name"        validate:"omitempty,max=100" example:"Acme Inc (renamed)"`
	Description *string `json:"description" validate:"omitempty,max=500" example:"Updated description"`
}

// update partially updates a workspace.
//
//	@Summary     Partially update a workspace
//	@Description Only the fields present in the body change.
//	@Tags        workspaces
//	@Accept      json
//	@Produce     json
//	@Param       workspaceID path string true "Workspace id (UUID)"
//	@Param       request body UpdateRequest true "Fields to update"
//	@Success     200 {object} Workspace
//	@Failure     400 {object} httpx.Error "invalid_json, validation_failed, or invalid_id"
//	@Failure     404 {object} httpx.Error "not_found"
//	@Failure     500 {object} httpx.Error
//	@Router      /api/v1/workspaces/{workspaceID} [patch]
func (h *Handler) update(w http.ResponseWriter, r *http.Request) error {
	id, err := workspaceID(r)

	if err != nil {
		return err
	}

	var req UpdateRequest

	if err := httpx.Decode(r, &req); err != nil {
		return err
	}

	if err := validate.Check(req); err != nil {
		return err
	}

	ws, err := h.svc.Update(r.Context(), id, UpdateInput{
		Name:        req.Name,
		Description: req.Description,
	})

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
//	@Router  /api/v1/workspaces/{workspaceID} [delete]
func (h *Handler) remove(w http.ResponseWriter, r *http.Request) error {
	id, err := workspaceID(r)

	if err != nil {
		return err
	}

	if err := h.svc.Delete(r.Context(), id); err != nil {
		return err
	}

	w.WriteHeader(http.StatusNoContent)

	return nil
}

// workspaceID parses the path parameter; a malformed id is a client error.
func workspaceID(r *http.Request) (uuid.UUID, error) {
	id, err := uuid.Parse(chi.URLParam(r, "workspaceID"))

	if err != nil {
		return uuid.Nil, httpx.New(http.StatusBadRequest, "invalid_id", "workspace id must be a UUID")
	}

	return id, nil
}
