package server

import (
	"net/http"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/httpx"
)

// requireWorkspace rejects requests whose {workspace_id} does not exist.
// Tenant-scoped subtrees mount behind it: the URL is not trusted.
func (s *server) requireWorkspace(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id, err := httpx.PathUUID(r, "workspace_id")

		if err != nil {
			s.fail(w, r, err)

			return
		}

		if _, err := s.workspaces.Get(r.Context(), id); err != nil {
			s.fail(w, r, err)

			return
		}

		next.ServeHTTP(w, r)
	})
}
