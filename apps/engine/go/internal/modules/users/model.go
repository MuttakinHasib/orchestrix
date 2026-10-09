package users

import (
	"time"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/database"
	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

// User is a person who can authenticate. Email is the login identity and
// is globally unique, normalized to lowercase by the service.
type User struct {
	bun.BaseModel `bun:"table:users,alias:u"`

	database.BaseEntity

	Name         string `bun:"name,type:text,notnull" json:"name"`
	Email        string `bun:"email,type:text,notnull,unique" json:"email"`
	PasswordHash string `bun:"password_hash,type:text,notnull" json:"-"`
}

// Session is one live refresh token. We store only the SHA-256 hash of
// the token — a leaked database cannot mint sessions.
type Session struct {
	bun.BaseModel `bun:"table:sessions,alias:s"`

	database.BaseEntity

	UserID           uuid.UUID `bun:"user_id,type:uuid,notnull" json:"user_id"`
	RefreshTokenHash string    `bun:"refresh_token_hash,type:text,notnull,unique" json:"-"`
	ExpiresAt        time.Time `bun:"expires_at,notnull" json:"expires_at"`
}
