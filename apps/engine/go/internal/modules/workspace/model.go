package workspace

import (
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/database"
	"github.com/uptrace/bun"
)

type Workspace struct {
	bun.BaseModel `bun:"table:workspaces,alias:w"`

	database.BaseEntity

	Name        string `bun:"name,notnull" json:"name"`
	Slug        string `bun:"slug,notnull,unique" json:"slug"`
	Description string `bun:"description,notnull,nullzero,default:''" json:"description"`
}
