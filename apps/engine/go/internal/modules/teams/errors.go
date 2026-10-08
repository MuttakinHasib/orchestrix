package teams

import "errors"

// ErrTeamNotFound reports a missing team within the requested workspace.
var ErrTeamNotFound = errors.New("team not found")
