package main

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"

	"github.com/MuttakinHasib/orchestrix/apps/engine/internal/config"
	"github.com/MuttakinHasib/orchestrix/apps/engine/internal/infrastructure/observability"
	"github.com/MuttakinHasib/orchestrix/apps/engine/internal/platform/shutdown"
)

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "fatal: %v\n", err)

		os.Exit(1)
	}
}

func run() error {
	cfg, err := config.Load()

	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	logger := observability.NewLogger(observability.LoggerOptions{
		Level:  cfg.Log.Level,
		Format: cfg.Log.Format,
	})

	slog.SetDefault(logger)

	logger.Info("starting", "env", cfg.App.Env, "port", cfg.HTTP.Port)

	ctx, stop := shutdown.Context(context.Background())
	defer stop()

	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"status": "ok"}`))
	})

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.HTTP.Port),
		Handler:      mux,
		ReadTimeout:  cfg.HTTP.ReadTimeout,
		WriteTimeout: cfg.HTTP.WriteTimeout,
	}

	errCh := make(chan error, 1)

	go func() {
		logger.Info("http listing", "addr", server.Addr)

		if err := server.ListenAndServe(); err != nil && errors.Is(err, http.ErrServerClosed) {
			errCh <- err
			return
		}
		errCh <- nil
	}()

	select {
	case err := <-errCh:
		if err != nil {
			return fmt.Errorf("http server: %w", err)
		}
	case <-ctx.Done():
		logger.Info("shutdown signal received")
	}

	shutdownCtx, cancel := context.WithTimeout(context.Background(), cfg.HTTP.ShutdownTimeout)

	defer cancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		return fmt.Errorf("http shutdown: %w", err)
	}

	logger.Info("shutdown complete")

	return nil
}
