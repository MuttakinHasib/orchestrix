// Package httpx carries the HTTP edge primitives shared by all modules:
// the error type with HTTP semantics, JSON response writing, strict
// request decoding, and the handler signature that lets handlers return
// errors instead of writing them. The server maps every returned error in
// one place.
package httpx

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

// FieldError is one offending input field.
type FieldError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

// Error is a failed request with HTTP semantics. Handlers may return it
// directly, or return any other error and let the global error handler
// classify it. It renders as {"error":{"code","message","fields"?}}.
type Error struct {
	Status  int          `json:"-"`
	Code    string       `json:"code"`
	Message string       `json:"message"`
	Fields  []FieldError `json:"fields,omitempty"`
}

// Error implements the error interface.
func (e *Error) Error() string {
	return e.Code + ": " + e.Message
}

// New builds an Error with HTTP semantics.
func New(status int, code, message string) *Error {
	return &Error{Status: status, Code: code, Message: message}
}

// HandlerFunc is an HTTP handler that returns an error instead of writing
// one. Every route is wrapped so a single error handler formats failures.
type HandlerFunc func(http.ResponseWriter, *http.Request) error

// Handle adapts an error-returning handler to http.HandlerFunc, routing
// every failure through onError — the server-wide error handler.
func Handle(onError ErrorHandler, fn HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := fn(w, r); err != nil {
			onError(w, r, err)
		}
	}
}

// ErrorHandler writes any handler error to w. The server supplies one
// implementation and passes it to every module handler.
type ErrorHandler func(http.ResponseWriter, *http.Request, error)

// JSON writes v as a JSON body with the given status. A nil v writes the
// status with no body.
func JSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if v != nil {
		_ = json.NewEncoder(w).Encode(v)
	}
}

// WriteError writes err as the standard error envelope.
func WriteError(w http.ResponseWriter, err *Error) {
	JSON(w, err.Status, struct {
		Error *Error `json:"error"`
	}{err})
}

// Decode reads a JSON request body into dst, rejecting unknown fields.
// Malformed bodies become a 400 invalid_json error.
func Decode(r *http.Request, dst any) error {
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	if err := dec.Decode(dst); err != nil {
		return New(http.StatusBadRequest, "invalid_json", "request body is not valid JSON")
	}

	return nil
}

// PathUUID parses a path parameter as a UUID. A malformed value yields a
// 400 invalid_id error naming the parameter.
func PathUUID(r *http.Request, name string) (uuid.UUID, error) {
	id, err := uuid.Parse(chi.URLParam(r, name))

	if err != nil {
		return uuid.Nil, New(http.StatusBadRequest, "invalid_id", name+" must be a UUID")

	}

	return id, nil
}
