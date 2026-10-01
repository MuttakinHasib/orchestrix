package database

import (
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/extra/bundebug"
)

// NewBun layers a Bun handle over a pgx pool using the PostgreSQL dialect.
// When debug is true, every query is logged via bundebug (pair this with
// LOG_LEVEL=debug in development).
//
// Ownership: the returned handle wraps — but does not own — the pool.
// Closing the *bun.DB releases the database/sql layer only; the caller must
// still Close the pool itself.
func NewBun(pool *pgxpool.Pool, debug bool) *bun.DB {
	sqldb := stdlib.OpenDBFromPool(pool)

	db := bun.NewDB(sqldb, pgdialect.New())

	if debug {
		db.AddQueryHook(bundebug.NewQueryHook(bundebug.WithVerbose(true)))
	}

	return db
}
