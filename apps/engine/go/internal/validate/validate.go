// Package validate wraps the shared struct validator. Handlers enforce
// request-shape rules declared as validate:"..." tags; custom rules (like
// the slug format) are registered here so every module shares one
// configured instance. Domain semantics (uniqueness, derivation) stay in
// module services.
package validate

import (
	"net/http"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/gosimple/slug"

	"github.com/MuttakinHasib/orchestrix/apps/engine/go/internal/httpx"
)

var validate = validator.New()

func init() {
	// Report errors under the JSON field name ("name"), not the Go name
	// ("Name") — matches what clients send and see.
	validate.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]

		if name != "" {
			return name
		}

		return ""
	})

	// slug checks the workspace/team/project slug format.
	validate.RegisterValidation("slug", func(fl validator.FieldLevel) bool {
		return slug.IsSlug(fl.Field().String())
	})
}

// Check validates a request struct against its validate:"..." tags.
// Failures come back as a ready-to-return 400 validation_failed error
// carrying per-field details; handlers return it as-is and the global
// error handler renders it.
func Check(s any) error {
	err := validate.Struct(s)

	if err == nil {
		return nil
	}

	errs, ok := err.(validator.ValidationErrors)

	if !ok {
		// A misconfigured rule is a programming error, not a client
		// error — surface it as an unclassified failure.
		return err
	}

	fields := make([]httpx.FieldError, 0, len(errs))

	for _, fe := range errs {
		fields = append(fields, httpx.FieldError{
			Field:   fe.Field(),
			Message: messageFor(fe),
		})
	}

	return &httpx.Error{
		Status:  http.StatusBadRequest,
		Code:    "validation_failed",
		Message: "request validation failed",
		Fields:  fields,
	}
}

// messageFor renders a human message per rule tag.
func messageFor(fe validator.FieldError) string {
	switch fe.Tag() {
	case "required":
		return "is required"
	case "max":
		return "must be at most " + fe.Param() + " characters"
	case "slug":
		return "must be a valid slug (lowercase letters, digits, single dashes)"
	default:
		return "is invalid"
	}
}
