package database

import (
	"context"
	"fmt"
	"time"

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
		return nil, fmt.Errorf("parse pool config: %w", err)
	}

	// Zero values mean "keep the parsed default" rather than an invalid
	// zero-sized pool.
	if opts.MaxConns > 0 {
		cfg.MaxConns = opts.MaxConns
	}

	if opts.MinConns > 0 {
		cfg.MinConns = opts.MinConns
	}

	pool, err := pgxpool.NewWithConfig(ctx, cfg)

	if err != nil {
		return nil, fmt.Errorf("create pool: %w", err)
	}

	pingCtx, cancel := context.WithTimeout(ctx, 5*time.Second)

	defer cancel()

	if err := pool.Ping(pingCtx); err != nil {
		pool.Close()

		return nil, fmt.Errorf("ping database: %w", err)
	}

	return pool, nil
}
