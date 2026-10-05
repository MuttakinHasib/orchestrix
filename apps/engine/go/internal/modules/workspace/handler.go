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

type createRequest struct {
	Name        string `json:"name"        validate:"required,max=100"`
	Slug        string `json:"slug"        validate:"omitempty,max=63,slug"`
	Description string `json:"description" validate:"max=500"`
}

func (h *Handler) create(w http.ResponseWriter, r *http.Request) error {
	var req createRequest

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

	httpx.JSON(w, http.StatusOK, page)

	return nil
}

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

type updateRequest struct {
	Name        *string `json:"name"        validate:"omitempty,max=100"`
	Description *string `json:"description" validate:"omitempty,max=500"`
}

func (h *Handler) update(w http.ResponseWriter, r *http.Request) error {
	id, err := workspaceID(r)

	if err != nil {
		return err
	}

	var req updateRequest

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
