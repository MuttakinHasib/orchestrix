package workspace

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/uptrace/bun"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/database"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/pagination"
)

// Repository reads and writes workspaces with Bun.
type Repository struct {
	db *bun.DB
}

// NewRepository returns a Repository backed by db.
func NewRepository(db *bun.DB) *Repository {
	return &Repository{db: db}
}

// Create inserts ws. The BaseEntity hook assigns the UUIDv7 id and the DB
// default fills created_at; bun's RETURNING hydrates both onto ws. The
// unique slug index decides conflicts — no application-level pre-check.
func (r *Repository) Create(ctx context.Context, ws *Workspace) error {
	if _, err := r.db.NewInsert().Model(ws).Exec(ctx); err != nil {
		if database.IsUniqueViolation(err) {
			return ErrWorkspaceSlugExists
		}

		return fmt.Errorf("create workspace: %w", err)
	}

	return nil
}

// Get returns the workspace with id, or ErrWorkspaceNotFound.
func (r *Repository) Get(ctx context.Context, id uuid.UUID) (*Workspace, error) {
	ws := new(Workspace)

	if err := r.db.NewSelect().Model(ws).Where("id = ?", id).Scan(ctx); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrWorkspaceNotFound
		}

		return nil, fmt.Errorf("get workspace %s: %w", id, err)
	}

	return ws, nil
}

// List returns workspaces newest first, filtered by Search when set,
// continuing from the opaque cursor when provided.
func (r *Repository) List(ctx context.Context, qp QueryParams) (*pagination.Page[Workspace], error) {
	p := qp.Clamp()

	q := r.db.NewSelect()

	if qp.Search != "" {
		q = q.Where("name ILIKE ? OR slug ILIKE ?", pagination.Like(qp.Search), pagination.Like(qp.Search))
	}

	page, err := pagination.Fetch[Workspace](ctx, q, p.Limit, p.Cursor)

	if err != nil {
		return nil, fmt.Errorf("list workspaces: %w", err)
	}

	return page, nil
}

// Update writes all mapped fields of ws, matched by primary key. Zero rows
// affected means the workspace is gone.
func (r *Repository) Update(ctx context.Context, ws *Workspace) error {
	res, err := r.db.NewUpdate().Model(ws).WherePK().Exec(ctx)

	if err != nil {
		return fmt.Errorf("update workspace %s: %w", ws.ID, err)
	}

	if n, _ := res.RowsAffected(); n == 0 {
		return ErrWorkspaceNotFound
	}

	return nil
}

// Delete removes the workspace with id; a missing row is
// ErrWorkspaceNotFound.
func (r *Repository) Delete(ctx context.Context, id uuid.UUID) error {
	res, err := r.db.NewDelete().Model((*Workspace)(nil)).Where("id = ?", id).Exec(ctx)

	if err != nil {
		return fmt.Errorf("delete workspace %s: %w", id, err)
	}

	if n, _ := res.RowsAffected(); n == 0 {
		return ErrWorkspaceNotFound
	}

	return nil
}
