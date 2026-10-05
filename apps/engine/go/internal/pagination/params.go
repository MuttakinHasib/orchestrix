package pagination

// Listing policy shared by every endpoint: a default page size, a hard
// ceiling, and an opaque continuation token.
const (
	DefaultLimit = 20
	MaxLimit     = 100
)

// Params is the standard list-request input. Modules embed it in their own
// filter structs and add domain fields (status, search, ...) alongside.
type Params struct {
	Limit  int
	Cursor string
}

// Clamp applies the listing policy; the cursor passes through untouched.
func (p Params) Clamp() Params {
	p.Limit = ClampLimit(p.Limit)

	return p
}

// ClampLimit normalizes a raw limit value.
func ClampLimit(limit int) int {
	switch {
	case limit <= 0:
		return DefaultLimit
	case limit > MaxLimit:
		return MaxLimit
	default:
		return limit
	}
}
