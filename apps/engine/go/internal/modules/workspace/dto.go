package workspace

import "github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/pagination"

// WorkspacePage is the workspace list envelope: a one-line
// specialization of the shared pagination.Page so generated OpenAPI
// schema names stay clean.
type WorkspacePage = pagination.Page[Workspace]

// QueryParams carries the workspace list controls from the query string.
type QueryParams struct {
	pagination.Params

	Search string `example:"acme"`
}

// CreateWorkspaceInput is the payload for creating a workspace.
type CreateWorkspaceInput struct {
	Name        string `json:"name"        validate:"required,max=100" example:"Acme Inc"`
	Slug        string `json:"slug"        validate:"omitempty,max=63,slug" example:"acme-inc"`
	Description string `json:"description" validate:"max=500" example:"The Acme engineering org"`
}

// UpdateWorkspaceInput partially updates a workspace; nil leaves the
// field unchanged.
type UpdateWorkspaceInput struct {
	Name        *string `json:"name"        validate:"omitempty,max=100" example:"Acme Inc (renamed)"`
	Description *string `json:"description" validate:"omitempty,max=500" example:"Updated description"`
}
