package database_test

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/database"
)

// TestNewPoolAndBun_Ping verifies the full wiring: a pgx pool that connects
// and a Bun handle layered on top of it that can ping and execute SQL.
// Requires a running Postgres; skips when DATABASE_URL is unset.
func TestNewPoolAndBun_Ping(t *testing.T) {
	url := os.Getenv("DATABASE_URL")

	if url == "" {
		t.Skip("DATABASE_URL not set")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	pool, err := database.NewPool(ctx, database.PoolOptions{
		URL:      url,
		MaxConns: 2,
		MinConns: 1,
	})

	if err != nil {
		t.Fatalf("NewPool: %v", err)
	}

	defer pool.Close()

	db := database.NewBun(pool, false)

	defer db.Close()

	if err := db.PingContext(ctx); err != nil {
		t.Fatalf("PingContext: %v", err)
	}

	if _, err := db.ExecContext(ctx, "SELECT 1"); err != nil {
		t.Fatalf("ExecContext: %v", err)
	}
}
