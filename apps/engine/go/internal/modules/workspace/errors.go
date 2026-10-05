package workspace

import "errors"

// ErrWorkspaceNotFound reports a missing workspace. Only "row missing"
// maps here — infrastructure failures propagate as wrapped errors.
var ErrWorkspaceNotFound = errors.New("workspace not found")

// ErrWorkspaceSlugExists reports a duplicate slug; the unique index is
// the source of truth.
var ErrWorkspaceSlugExists = errors.New("workspace slug already exists")

// ValidationError reports a single semantically invalid input field.
// Shape rules (required/lengths/slug format) are enforced upstream on the
// request DTO; the service rejects only inputs that are still invalid
// after normalization (e.g. whitespace-only names).
type ValidationError struct {
	Field   string
	Message string
}

// Error returns "field: message".
func (e *ValidationError) Error() string {
	return e.Field + ": " + e.Message
}
