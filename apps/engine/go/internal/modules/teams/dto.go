package teams

import "github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/pagination"

// TeamPage is the team list envelope: a one-line specialization of the
// shared pagination.Page so generated OpenAPI schema names stay clean.
type TeamPage = pagination.Page[Team]

// QueryParams carries the team list controls from the query string.
type QueryParams struct {
	pagination.Params

	Search string `example:"frontend"`
}

// CreateTeamInput is the payload for creating a team.
type CreateTeamInput struct {
	Name        string `json:"name" validate:"required,max=100" example:"Frontend Engineers"`
	Description string `json:"description" validate:"max=500" example:"FE team"`
}

// UpdateTeamInput partially updates a team; nil leaves the field
// unchanged.
type UpdateTeamInput struct {
	Name        *string `json:"name" validate:"omitempty,max=100" example:"Frontend Engineers"`
	Description *string `json:"description" validate:"omitempty,max=500" example:"FE team"`
}
