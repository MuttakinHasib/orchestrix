package server

import (
	"errors"
	"net/http"

	"github.com/go-chi/chi/v5/middleware"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/httpx"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/modules/workspace"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/pagination"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/validate"
)

// fail is the global error handler: every error returned by any handler in
// any module funnels through this one function. It maps the error to HTTP
// semantics, logs 5xx-class failures with context, and writes the standard
// envelope. Handlers never write their own errors.
func (s *server) fail(w http.ResponseWriter, r *http.Request, err error) {
	herr := s.mapError(err)

	if herr.Status >= http.StatusInternalServerError {
		s.log.Error("request failed",
			"err", err,
			"method", r.Method,
			"path", r.URL.Path,
			"status", herr.Status,
			"request_id", middleware.GetReqID(r.Context()),
		)
	}

	httpx.WriteError(w, herr)
}

// mapError converts any handler error to HTTP semantics in one place. As
// modules grow, each new domain sentinel gains exactly one case here.
func (s *server) mapError(err error) *httpx.Error {
	var (
		herr *httpx.Error
		verr *validate.ValidationError
	)

	switch {
	case errors.As(err, &herr): // already carries HTTP semantics
		return herr

	case errors.As(err, &verr):
		return &httpx.Error{
			Status:  http.StatusBadRequest,
			Code:    "validation_failed",
			Message: "request validation failed",
			Fields:  []httpx.FieldError{{Field: verr.Field, Message: verr.Message}},
		}

	case errors.Is(err, workspace.ErrWorkspaceNotFound):
		return httpx.New(http.StatusNotFound, "not_found", "workspace not found")

	case errors.Is(err, workspace.ErrWorkspaceSlugExists):
		return httpx.New(http.StatusConflict, "conflict", "workspace slug already exists")

	case errors.Is(err, pagination.ErrInvalidCursor):
		return httpx.New(http.StatusBadRequest, "invalid_cursor", "cursor is not valid")

	default:
		// Unknown errors stay opaque to the client; the full error is
		// logged above.
		return httpx.New(http.StatusInternalServerError, "internal_error", "something went wrong")
	}
}
