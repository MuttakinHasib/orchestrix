// Package server assembles the HTTP server: middleware, health endpoints,
// and every feature module's routes. It is the only place that composes
// modules, and it owns the global error handler.
package server

import (
	"context"
	"log/slog"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/uptrace/bun"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/httpx"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/modules/teams"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/modules/workspace"
)

// Options carries the server's dependencies.
type Options struct {
	DB     *bun.DB
	Logger *slog.Logger

	// Ready overrides the readiness probe; it defaults to a DB ping.
	// Tests inject a stub to stay hermetic.
	Ready func(ctx context.Context) error

	// Docs serves the OpenAPI contract (/openapi.yaml) and Swagger UI
	// (/swagger). Only non-production builds should enable it.
	Docs bool
}

type server struct {
	db         *bun.DB
	log        *slog.Logger
	ready      func(ctx context.Context) error
	workspaces *workspace.Service
}

// New builds the fully wired HTTP handler.
func New(opts Options) http.Handler {
	s := &server{
		db:         opts.DB,
		log:        opts.Logger,
		ready:      opts.Ready,
		workspaces: workspace.NewService(workspace.NewRepository(opts.DB)),
	}

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(s.requestLogger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(15 * time.Second))

	r.Get("/healthz", health)
	r.Get("/readyz", httpx.Handle(s.fail, s.readyz))

	// Unknown paths and methods answer in the standard envelope too.
	r.NotFound(func(w http.ResponseWriter, _ *http.Request) {
		httpx.WriteError(w, httpx.New(http.StatusNotFound, "not_found", "resource not found"))
	})

	r.MethodNotAllowed(func(w http.ResponseWriter, _ *http.Request) {
		httpx.WriteError(w, httpx.New(http.StatusMethodNotAllowed, "method_not_allowed", "method not allowed"))
	})

	if opts.Docs {
		s.mountDocs(r)
	}

	r.Route("/api/v1", func(r chi.Router) {
		// One error handler instance shared by every module.
		onError := httpx.ErrorHandler(s.fail)

		r.Mount("/workspaces", workspace.NewHandler(s.workspaces, onError).Routes())

		r.Route("/workspaces/{workspace_id}", func(r chi.Router) {
			workspace.NewHandler(s.workspaces, onError).MountItem(r)

			// Tenant-scoped subtrees mount behind the workspace guard.
			r.With(s.requireWorkspace).Mount("/teams",
				teams.NewHandler(teams.NewService(teams.NewRepository(s.db)), onError).Routes())
		})
	})

	return r
}

// health is the liveness probe: the process is up, no dependencies checked.
//
//	@Summary Liveness probe
//	@Description The process is up; no dependencies are checked.
//	@Tags    system
//	@Produce json
//	@Success 200 {object} map[string]string
//	@Router  /healthz [get]
func health(w http.ResponseWriter, _ *http.Request) {
	httpx.JSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

// readyz is the readiness probe: dependencies reachable. The injected
// Ready overrides the default DB ping (used by tests).
//
//	@Summary  Readiness probe
//	@Description Checks that dependencies (currently PostgreSQL) are reachable.
//	@Tags     system
//	@Produce  json
//	@Success  200 {object} map[string]string
//	@Failure  503 {object} httpx.Error "unavailable"
//	@Router   /readyz [get]
func (s *server) readyz(w http.ResponseWriter, r *http.Request) error {
	ready := s.ready

	if ready == nil {
		ready = s.db.PingContext
	}

	ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)

	defer cancel()

	if err := ready(ctx); err != nil {
		return httpx.New(http.StatusServiceUnavailable, "unavailable", "readiness check failed")
	}

	httpx.JSON(w, http.StatusOK, map[string]string{"status": "ok"})

	return nil
}

// requestLogger logs one structured line per request.
func (s *server) requestLogger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)

		start := time.Now()

		defer func() {
			s.log.Info("http request",
				"method", r.Method,
				"path", r.URL.Path,
				"status", ww.Status(),
				"duration_ms", time.Since(start).Milliseconds(),
				"request_id", middleware.GetReqID(r.Context()),
			)
		}()

		next.ServeHTTP(ww, r)
	})
}
