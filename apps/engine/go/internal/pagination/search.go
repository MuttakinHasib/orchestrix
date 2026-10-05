package pagination

import "strings"

// Like escapes s for use inside a LIKE/ILIKE pattern and wraps it with
// wildcards, so user input matches literally and cannot inject %, _ or
// escape characters into the pattern. Only meaningful for non-empty
// search terms — callers skip the clause when no search was given.
func Like(s string) string {
	var b strings.Builder

	b.Grow(len(s) + 2)
	b.WriteByte('%')

	for _, r := range s {
		switch r {
		case '%', '_', '\\':
			b.WriteByte('\\')
		}

		b.WriteRune(r)
	}

	b.WriteByte('%')

	return b.String()
}
