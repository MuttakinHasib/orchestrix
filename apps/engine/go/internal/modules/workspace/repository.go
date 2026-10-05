package workspace

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"uuid"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/database"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/pagination"
	"github.com/uptrace/bun"
)

// Repository reads and writes workspaces with Bun.
type Repository struct {
	db *bun.DB
}

// NewRepository returns a Repository backed by db.
func NewRepository(db *bun.DB) *Repository {
	return &Repository{db: db}
}

var (
	ErrWorkspaceSlugExists = errors.New("workspace slug already exists")
	ErrWorkspaceNotFound   = errors.New("workspace not found")
)

// Create inserts ws. The BaseEntity hook assigns the UUIDv7 id and the DB
// default fills created_at; bun's RETURNING hydrates both onto ws.
func (r *Repository) Create(ctx context.Context, ws *Workspace) error {
	var existing Workspace

	err := r.db.NewSelect().Model(&existing).Where("slug = ?", ws.Slug).Limit(1).Scan(ctx)

	if err == nil {
		return ErrWorkspaceSlugExists
	}

	if !errors.Is(err, sql.ErrNoRows) {
		return fmt.Errorf("check workspace slug: %w", err)
	}

	if _, err := r.db.NewInsert().Model(ws).Returning("*").Exec(ctx); err != nil {

		if database.IsUniqueViolation(err) {
			return ErrWorkspaceSlugExists
		}

		return fmt.Errorf("create workspace %w", err)
	}

	return nil
}

// Get returns the workspace with id, or ErrNotFound.
func (r *Repository) Get(ctx context.Context, id uuid.UUID) (*Workspace, error) {
	ws := new(Workspace)

	if err := r.db.NewSelect().Model(ws).WherePK().Scan(ctx); err != nil {
		return nil, ErrWorkspaceNotFound
	}

	return ws, nil
}

// QueryParams carries the workspace-specific list controls. Embedding
// pagination.Params gives limit + cursor; Search matches name and slug.
type QueryParams struct {
	pagination.Params

	Search string
}

// List returns workspaces newest first, filtered by Search when set,
// continuing from the opaque cursor when provided.
func (r *Repository) List(ctx context.Context, qp QueryParams) (*pagination.Page[Workspace], error) {
	p := qp.Clamp()

	items := make([]Workspace, 0, p.Limit+1)

	q := r.db.NewSelect().Model(&items)

	if qp.Search != "" {
		q = q.Where("name ILIKE ? OR slug ILIKE ?", pagination.Like(qp.Search), pagination.Like(qp.Search))
	}

	page, err := pagination.Fetch(ctx, q, items, p.Limit, p.Cursor)

	if err != nil {
		return nil, ErrWorkspaceNotFound
	}

	return page, nil
}

// Update writes all mapped fields of ws, matched by primary key. Zero rows
// affected means the workspace is gone: ErrNotFound.
func (r *Repository) Update(ctx context.Context, ws *Workspace) error {
	res, err := r.db.NewUpdate().Model(ws).WherePK().Exec(ctx)

	if err != nil {
		return ErrWorkspaceNotFound
	}

	if n, _ := res.RowsAffected(); n == 0 {
		return ErrWorkspaceNotFound
	}

	return nil
}

// Delete removes the workspace with id; a missing row is ErrNotFound.
func (r *Repository) Delete(ctx context.Context, id uuid.UUID) error {
	res, err := r.db.NewDelete().Model((*Workspace)(nil)).Where("id = ?", id).Exec(ctx)

	if err != nil {
		return ErrWorkspaceNotFound
	}

	if n, _ := res.RowsAffected(); n == 0 {
		return ErrWorkspaceNotFound
	}

	return nil
}
