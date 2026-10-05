// Package api embeds the engine's OpenAPI contract. The spec is synced
// from packages/api-contract/openapi.yaml (the single source of truth —
// make swagger-sync copies it here; make swagger-check fails when the
// copy drifts).
package api

import (
	"embed"
)

//go:embed openapi.yaml
var files embed.FS

// Spec returns the embedded OpenAPI document.
func Spec() ([]byte, error) {
	return files.ReadFile("openapi.yaml")
}

// SwaggerUI is the viewer page for the contract. The UI assets load from
// a CDN so the binary stays small; the docs endpoints are only mounted
// outside production.
const SwaggerUI = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Orchestrix Engine API</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"/>
</head>
<body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
<script>
  window.ui = SwaggerUIBundle({url: '/openapi.yaml', dom_id: '#swagger-ui'});
</script>
</body>
</html>`
