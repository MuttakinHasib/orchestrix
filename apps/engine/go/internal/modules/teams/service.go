package teams

import (
	"context"
	"strings"

	"github.com/google/uuid"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/pagination"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/validate"
)

// Service holds the team business rules. It sits between handlers and
// storage so domain rules exist once: the workflow engine's actions call
// these same methods, and future auth membership checks land here. If
// that never happens, this layer has earned nothing — collapse it.
type Service struct {
	repo *Repository
}

// NewService returns a Service backed by repo.
func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

// Create normalizes the input and persists the team in the workspace.
func (s *Service) Create(ctx context.Context, workspaceID uuid.UUID, in CreateTeamInput) (*Team, error) {
	name, err := validate.NormalizeName(in.Name)

	if err != nil {
		return nil, err
	}

	t := &Team{
		WorkspaceID: workspaceID,
		Name:        name,
		Description: strings.TrimSpace(in.Description),
	}

	if err := s.repo.Create(ctx, t); err != nil {
		return nil, err
	}

	return t, nil
}

// Get returns the team with id inside the workspace.
func (s *Service) Get(ctx context.Context, workspaceID, id uuid.UUID) (*Team, error) {
	return s.repo.Get(ctx, workspaceID, id)
}

// List returns a filtered, paginated page of the workspace's teams.
func (s *Service) List(ctx context.Context, workspaceID uuid.UUID, qp QueryParams) (*pagination.Page[Team], error) {
	return s.repo.List(ctx, workspaceID, qp)
}

// Update applies non-nil fields of in to the team with id.
func (s *Service) Update(ctx context.Context, workspaceID, id uuid.UUID, in UpdateTeamInput) (*Team, error) {
	t, err := s.repo.Get(ctx, workspaceID, id)

	if err != nil {
		return nil, err
	}

	if in.Name != nil {
		name, err := validate.NormalizeName(*in.Name)

		if err != nil {
			return nil, err
		}

		t.Name = name
	}

	if in.Description != nil {
		t.Description = strings.TrimSpace(*in.Description)
	}

	if err := s.repo.Update(ctx, t); err != nil {
		return nil, err
	}

	return t, nil
}

// Delete removes the team with id from the workspace.
func (s *Service) Delete(ctx context.Context, workspaceID, id uuid.UUID) error {
	return s.repo.Delete(ctx, workspaceID, id)
}
