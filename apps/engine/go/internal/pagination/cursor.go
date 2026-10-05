package pagination

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"time"

	"github.com/google/uuid"
)

// cursor is the decoded pagination position: the sort key of the last item
// on the previous page. The encoded form is opaque — clients must treat it
// as a token, and its shape can change without notice.
type cursor struct {
	CreatedAt time.Time `json:"created_at"`
	ID        uuid.UUID `json:"id"`
}

// encodeCursor serializes c as a URL-safe opaque token.
func encodeCursor(c cursor) (string, error) {
	b, err := json.Marshal(c)

	if err != nil {
		return "", fmt.Errorf("failed to marshal cursor: %w", err)
	}

	return base64.RawURLEncoding.EncodeToString(b), nil
}

// decodeCursor parses a token produced by [encodeCursor].
func decodeCursor(s string) (cursor, error) {
	b, err := base64.RawURLEncoding.DecodeString(s)

	if err != nil {
		return cursor{}, fmt.Errorf("failed to decode cursor: %w", err)
	}

	var c cursor

	if err := json.Unmarshal(b, &c); err != nil {
		return cursor{}, fmt.Errorf("failed to unmarshal cursor: %w", err)
	}

	return c, nil

}
