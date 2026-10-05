package main

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/config"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/database"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/server"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/telemetry"
)

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "fatal: %v\n", err)

		os.Exit(1)
	}
}

// @title Orchestrix Engine API
// @version 0.1.0
// @description Engineering work management and workflow automation API.
// @description .
// @description The engine is one implementation of the shared API contract
// @description (docs/project_overview.md §41); this document is generated
// @description from the Go handlers (make swagger) and synced to
// @description packages/api-contract/openapi.yaml.
// @BasePath /
func run() error {
	cfg, err := config.Load()

	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	logger := telemetry.NewLogger(telemetry.LoggerOptions{
		Level:  cfg.Log.Level,
		Format: cfg.Log.Format,
	})

	slog.SetDefault(logger)

	logger.Info("starting", "env", cfg.App.Env, "port", cfg.HTTP.Port)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)

	defer stop()

	pool, err := database.NewPool(ctx, database.PoolOptions{
		URL:      cfg.Database.URL.Reveal(),
		MaxConns: cfg.Database.MaxConns,
		MinConns: cfg.Database.MinConns,
	})

	if err != nil {
		return fmt.Errorf("connect database: %w", err)
	}

	defer pool.Close()

	db := database.NewBun(pool, cfg.Log.Level == "debug")

	defer func() { _ = db.Close() }()

	httpServer := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.HTTP.Port),
		Handler:      server.New(server.Options{DB: db, Logger: logger, Docs: !cfg.IsProduction()}),
		ReadTimeout:  cfg.HTTP.ReadTimeout,
		WriteTimeout: cfg.HTTP.WriteTimeout,
	}

	errCh := make(chan error, 1)

	go func() {
		logger.Info("http listening", "addr", httpServer.Addr)

		if err := httpServer.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			errCh <- err

			return
		}

		errCh <- nil
	}()

	select {
	case err := <-errCh:
		return err
	case <-ctx.Done():
		logger.Info("shutdown signal received")
	}

	shutdownCtx, cancel := context.WithTimeout(context.Background(), cfg.HTTP.ShutdownTimeout)

	defer cancel()

	if err := httpServer.Shutdown(shutdownCtx); err != nil {
		return fmt.Errorf("http shutdown: %w", err)
	}

	logger.Info("shutdown complete")

	return nil
}
