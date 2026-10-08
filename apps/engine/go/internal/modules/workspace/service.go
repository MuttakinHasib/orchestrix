package workspace

import (
	"context"
	"strings"

	"github.com/google/uuid"
	"github.com/gosimple/slug"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/pagination"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/validate"
)

// Service holds the workspace business rules. It sits between handlers
// and storage so domain rules exist once: the workflow engine's actions
// call these same methods, and future auth membership checks land here.
// If that never happens, this layer has earned nothing — collapse it.
type Service struct {
	repo *Repository
}

// NewService returns a Service backed by repo.
func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

// Create normalizes the input, derives the slug when absent, and persists
// the workspace.
func (s *Service) Create(ctx context.Context, in CreateWorkspaceInput) (*Workspace, error) {
	name, err := validate.NormalizeName(in.Name)

	if err != nil {
		return nil, err
	}

	ws := &Workspace{
		Name:        name,
		Slug:        deriveSlug(name, in.Slug),
		Description: strings.TrimSpace(in.Description),
	}

	if err := s.repo.Create(ctx, ws); err != nil {
		return nil, err
	}

	return ws, nil
}

// Get returns the workspace with id.
func (s *Service) Get(ctx context.Context, id uuid.UUID) (*Workspace, error) {
	return s.repo.Get(ctx, id)
}

// List returns a filtered, paginated page of workspaces.
func (s *Service) List(ctx context.Context, qp QueryParams) (*pagination.Page[Workspace], error) {
	return s.repo.List(ctx, qp)
}

// Update applies non-nil fields of in to the workspace with id.
func (s *Service) Update(ctx context.Context, id uuid.UUID, in UpdateWorkspaceInput) (*Workspace, error) {
	ws, err := s.repo.Get(ctx, id)

	if err != nil {
		return nil, err
	}

	if in.Name != nil {
		name, err := validate.NormalizeName(*in.Name)

		if err != nil {
			return nil, err
		}

		ws.Name = name
	}

	if in.Description != nil {
		ws.Description = strings.TrimSpace(*in.Description)
	}

	if err := s.repo.Update(ctx, ws); err != nil {
		return nil, err
	}

	return ws, nil
}

// Delete removes the workspace with id.
func (s *Service) Delete(ctx context.Context, id uuid.UUID) error {
	return s.repo.Delete(ctx, id)
}

// deriveSlug returns the explicit slug when provided, otherwise derives
// one from the name: "Acme Inc!" becomes "acme-inc".
func deriveSlug(name, explicit string) string {
	if explicit != "" {
		return strings.TrimSpace(explicit)
	}

	return slug.Make(name)
}
