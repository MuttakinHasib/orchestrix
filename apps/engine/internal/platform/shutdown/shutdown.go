// Package shutdown owns the process's signal-handling lifecycle so callers
// can derive a context that cancels on SIGINT or SIGTERM.
package shutdown

import (
	"context"
	"os"
	"os/signal"
	"syscall"
)

// Context returns a context derived from parent that cancels when the process
// receives SIGINT or SIGTERM. The returned cancel func must be called to
// release the signal handler and avoid leaks.
func Context(parent context.Context) (context.Context, context.CancelFunc) {
	return signal.NotifyContext(parent, os.Interrupt, syscall.SIGTERM)
}
