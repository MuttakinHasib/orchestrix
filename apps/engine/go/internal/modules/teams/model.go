package teams

import (
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/database"
	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

type Team struct {
	bun.BaseModel `bun:"table:teams,alias:t"`

	database.BaseEntity

	WorkspaceID uuid.UUID `bun:"workspace_id,type:uuid,notnull" json:"workspace_id"`
	Name        string    `bun:"name,notnull" json:"name"`
	Description string    `bun:"description,notnull,nullzero,default:''" json:"description"`
}
