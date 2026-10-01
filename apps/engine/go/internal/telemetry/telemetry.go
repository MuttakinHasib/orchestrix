// Package telemetry wires observability: structured logging now, tracing and
// metrics later.
package telemetry

import (
	"log/slog"
	"os"
	"strings"
)

// LoggerOptions configures the slog handler built by [NewLogger].
type LoggerOptions struct {
	// Level is one of "debug", "info", "warn", "error". Unknown values fall
	// back to info.
	Level string
	// Format is "json" (default) or "text".
	Format string
}

// NewLogger builds a slog.Logger writing to stdout. Source locations are
// attached only at debug level to keep production logging cheap.
func NewLogger(options LoggerOptions) *slog.Logger {
	var level slog.Level

	switch strings.ToLower(options.Level) {
	case "debug":
		level = slog.LevelDebug
	case "warn":
		level = slog.LevelWarn

	case "error":
		level = slog.LevelError
	default:
		level = slog.LevelInfo
	}

	handlerOptions := &slog.HandlerOptions{
		Level:     level,
		AddSource: level == slog.LevelDebug,
	}

	var handler slog.Handler

	if strings.EqualFold(options.Format, "text") {
		handler = slog.NewTextHandler(os.Stdout, handlerOptions)
	} else {
		handler = slog.NewJSONHandler(os.Stdout, handlerOptions)
	}

	return slog.New(handler)
}
