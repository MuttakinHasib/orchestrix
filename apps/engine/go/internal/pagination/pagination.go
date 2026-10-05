package pagination

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

// ErrInvalidCursor is returned when a cursor token cannot be decoded.
var ErrInvalidCursor = errors.New("invalid pagination cursor")

// Key is a row's position in the standard listing order: the DB creation
// clock plus the UUIDv7 id as tiebreaker for identical timestamps.
type Key struct {
	CreatedAt time.Time
	ID        uuid.UUID
}

// Keyer is implemented by models that can report their sort position.
// BaseEntity provides it, so every standard entity qualifies for free.
type Keyer interface {
	PaginationKey() Key
}

// Page carries one page of results plus the token to fetch the next page.
// An empty NextCursor means there are no more rows.
type Page[T any] struct {
	Items      []T
	NextCursor string
}

// Fetch pins the standard ordering and keyset window onto q, scans into
// items, and builds the page. items must already be attached to q via
// Model(&items) and be preallocated with capacity limit+1. A non-empty
// cursor continues from where the previous page stopped; an undecodable
// cursor yields [ErrInvalidCursor].
func Fetch[T Keyer](ctx context.Context, query *bun.SelectQuery, items []T, limit int, cursor string) (*Page[T], error) {
	query = query.Order("created_at DESC").Order("id DESC").Limit(limit + 1)

	if cursor != "" {
		key, err := decodeCursor(cursor)

		if err != nil {
			return nil, ErrInvalidCursor
		}

		query = query.Where("(created_at, id) < (?, ?)", key.CreatedAt, key.ID)
	}

	if err := query.Scan(ctx); err != nil {
		return nil, err
	}

	return buildPage(items, limit)
}

// buildPage trims the lookahead row and emits the next cursor from the
// last returned item.
func buildPage[T Keyer](items []T, limit int) (*Page[T], error) {
	page := &Page[T]{Items: items}

	if len(items) > limit {
		page.Items = page.Items[:limit]

		next, err := encodeCursor(cursor(items[limit-1].PaginationKey()))

		if err != nil {
			return nil, err
		}

		page.NextCursor = next
	}

	return page, nil
}
