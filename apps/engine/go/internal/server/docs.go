package server

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/api"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/httpx"
)

// mountDocs exposes the OpenAPI contract and its viewer. Only mounted
// when Options.Docs is set — never in production.
func (s *server) mountDocs(r chi.Router) {
	r.Get("/openapi.yaml", serveSpec)
	r.Get("/swagger", serveSwaggerUI)
}

// serveSpec writes the embedded OpenAPI document.
func serveSpec(w http.ResponseWriter, _ *http.Request) {
	spec, err := api.Spec()

	if err != nil {
		// The spec is embedded; failing here is a build error, not a
		// runtime condition.
		httpx.WriteError(w, httpx.New(http.StatusInternalServerError, "internal_error", "contract is unavailable"))
		return
	}

	w.Header().Set("Content-Type", "application/yaml")
	_, _ = w.Write(spec)
}

// serveSwaggerUI writes the Swagger UI viewer page pointing at /openapi.yaml.
func serveSwaggerUI(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	_, _ = w.Write([]byte(api.SwaggerUI))
}
