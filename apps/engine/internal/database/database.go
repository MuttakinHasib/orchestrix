package database

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

// PoolOptions carries the pgx pool sizing knobs.
type PoolOptions struct {
	URL      string
	MaxConns int32
	MinConns int32
}

// NewPool builds a configured pgx pool and verifies connectivity before
// returning. Callers must Close the pool.
func NewPool(ctx context.Context, opts PoolOptions) (*pgxpool.Pool, error) {
	cfg, err := pgxpool.ParseConfig(opts.URL)
	if err != nil {
		return nil, fmt.Errorf("parse pool config: %w")
	}
}
