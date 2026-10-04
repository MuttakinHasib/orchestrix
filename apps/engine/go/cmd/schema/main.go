package main

import (
	"fmt"
	"io"
	"os"

	"ariga.io/atlas-provider-bun/bunschema"
	_ "ariga.io/atlas/sdk/recordriver"
	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/modules/workspace"
)

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "schema: %v\n", err)

		os.Exit(1)
	}
}

func run() error {
	stmts, err := bunschema.New(bunschema.DialectPostgres).Load(
		&workspace.Workspace{},
	//! Adding a model to the schema = adding one line here.
	// Many-to-many join tables need bunschema.WithJoinTable(...).
	)

	if err != nil {
		return fmt.Errorf("load bun schema: %w", err)
	}

	if _, err := io.WriteString(os.Stdout, stmts); err != nil {
		return fmt.Errorf("write schema: %w", err)
	}

	return nil
}
