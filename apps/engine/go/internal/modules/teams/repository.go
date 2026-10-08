package teams

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/uptrace/bun"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/pagination"
)

// Repository reads and writes teams with Bun. Every query is scoped to a
// workspace — tenancy is enforced here, not by convention.
type Repository struct {
	db *bun.DB
}

// NewRepository returns a Repository backed by db.
func NewRepository(db *bun.DB) *Repository {
	return &Repository{db: db}
}

// Create inserts t and hydrates it. The workspace_id column carries no FK
// constraint yet; the server's requireWorkspace middleware guards
// workspace existence.
func (r *Repository) Create(ctx context.Context, t *Team) error {
	if _, err := r.db.NewInsert().Model(t).Returning("*").Exec(ctx); err != nil {
		return fmt.Errorf("create team: %w", err)
	}

	return nil
}

// Get returns the team with id inside the workspace, or ErrTeamNotFound.
func (r *Repository) Get(ctx context.Context, workspaceID, id uuid.UUID) (*Team, error) {
	t := new(Team)

	if err := r.db.NewSelect().Model(t).Where("id = ? AND workspace_id = ?", id, workspaceID).Scan(ctx); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrTeamNotFound
		}

		return nil, fmt.Errorf("get team %s: %w", id, err)
	}

	return t, nil
}

// List returns the workspace's teams newest first, filtered by Search
// when set, continuing from the opaque cursor when provided.
func (r *Repository) List(ctx context.Context, workspaceID uuid.UUID, qp QueryParams) (*pagination.Page[Team], error) {
	p := qp.Clamp()

	q := r.db.NewSelect().Where("workspace_id = ?", workspaceID)

	if qp.Search != "" {
		q = q.Where("name ILIKE ?", pagination.Like(qp.Search))
	}

	page, err := pagination.Fetch[Team](ctx, q, p.Limit, p.Cursor)

	if err != nil {
		return nil, fmt.Errorf("list teams: %w", err)
	}

	return page, nil
}

// Update writes all mapped fields of t, matched by id AND workspace —
// zero rows affected means no such team in this workspace.
func (r *Repository) Update(ctx context.Context, t *Team) error {
	res, err := r.db.NewUpdate().Model(t).Where("id = ? AND workspace_id = ?", t.ID, t.WorkspaceID).Exec(ctx)

	if err != nil {
		return fmt.Errorf("update team %s: %w", t.ID, err)
	}

	if n, _ := res.RowsAffected(); n == 0 {
		return ErrTeamNotFound
	}

	return nil
}

// Delete removes the team with id inside the workspace; a missing row is
// ErrTeamNotFound.
func (r *Repository) Delete(ctx context.Context, workspaceID, id uuid.UUID) error {
	res, err := r.db.NewDelete().Model((*Team)(nil)).Where("id = ? AND workspace_id = ?", id, workspaceID).Exec(ctx)

	if err != nil {
		return fmt.Errorf("delete team %s: %w", id, err)
	}

	if n, _ := res.RowsAffected(); n == 0 {
		return ErrTeamNotFound
	}

	return nil
}
