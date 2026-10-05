package workspace

import (
	"context"
	"strings"

	"github.com/google/uuid"
	"github.com/gosimple/slug"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/pagination"
)

// Store is the persistence contract the service depends on — satisfied by
// *Repository.
type Store interface {
	Create(ctx context.Context, ws *Workspace) error
	Get(ctx context.Context, id uuid.UUID) (*Workspace, error)
	List(ctx context.Context, qp QueryParams) (*pagination.Page[Workspace], error)
	Update(ctx context.Context, ws *Workspace) error
	Delete(ctx context.Context, id uuid.UUID) error
}

// Service holds the workspace business rules.
type Service struct {
	store Store
}

// NewService returns a Service backed by store.
func NewService(store Store) *Service {
	return &Service{store: store}
}

// CreateInput is what a caller may set on creation.
type CreateInput struct {
	Name        string
	Slug        string
	Description string
}

// UpdateInput partially updates a workspace; nil leaves the field
// unchanged.
type UpdateInput struct {
	Name        *string
	Description *string
}

// Create normalizes the input, derives the slug when absent, and persists
// the workspace.
func (s *Service) Create(ctx context.Context, in CreateInput) (*Workspace, error) {
	name, err := normalizeName(in.Name)

	if err != nil {
		return nil, err
	}

	ws := &Workspace{
		Name:        name,
		Slug:        deriveSlug(name, in.Slug),
		Description: strings.TrimSpace(in.Description),
	}

	if err := s.store.Create(ctx, ws); err != nil {
		return nil, err
	}

	return ws, nil
}

// Get returns the workspace with id.
func (s *Service) Get(ctx context.Context, id uuid.UUID) (*Workspace, error) {
	return s.store.Get(ctx, id)
}

// List returns a filtered, paginated page of workspaces.
func (s *Service) List(ctx context.Context, qp QueryParams) (*pagination.Page[Workspace], error) {
	return s.store.List(ctx, qp)
}

// Update applies non-nil fields of in to the workspace with id.
func (s *Service) Update(ctx context.Context, id uuid.UUID, in UpdateInput) (*Workspace, error) {
	ws, err := s.store.Get(ctx, id)

	if err != nil {
		return nil, err
	}

	if in.Name != nil {
		name, err := normalizeName(*in.Name)

		if err != nil {
			return nil, err
		}

		ws.Name = name
	}

	if in.Description != nil {
		ws.Description = strings.TrimSpace(*in.Description)
	}

	if err := s.store.Update(ctx, ws); err != nil {
		return nil, err
	}

	return ws, nil
}

// Delete removes the workspace with id.
func (s *Service) Delete(ctx context.Context, id uuid.UUID) error {
	return s.store.Delete(ctx, id)
}

// normalizeName trims surrounding whitespace and requires a non-empty
// result — a name of only whitespace passes shape validation but carries
// no value.
func normalizeName(raw string) (string, error) {
	name := strings.TrimSpace(raw)

	if name == "" {
		return "", &ValidationError{Field: "name", Message: "is required"}
	}

	return name, nil
}

// deriveSlug returns the explicit slug when provided, otherwise derives
// one from the name: "Acme Inc!" becomes "acme-inc".
func deriveSlug(name, explicit string) string {
	if explicit != "" {
		return strings.TrimSpace(explicit)
	}

	return slug.Make(name)
}
