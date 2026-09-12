// Package config loads and validates runtime configuration from environment
// variables. Values are grouped by concern; secrets are wrapped in [Secret]
// so accidental logging redacts them.
package config

import (
	"fmt"
	"time"

	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
)

// AppEnv names the deployment environment the process is running in.
type AppEnv string

// Recognised values of [AppEnv].
const (
	EnvDevelopment AppEnv = "development"
	EnvStaging     AppEnv = "staging"
	EnvProduction  AppEnv = "production"
)

// Config is the fully-parsed runtime configuration for the API service.
type Config struct {
	App      AppConfig
	HTTP     HTTPConfig
	Database DatabaseConfig
	Redis    RedisConfig
	Log      LogConfig
	JWT      JWTConfig
	OTel     OTelConfig
}

// AppConfig holds process-wide identity and lifecycle settings.
type AppConfig struct {
	Env AppEnv `env:"APP_ENV" envDefault:"development"`
}

// HTTPConfig configures the public HTTP server: bind port and per-phase timeouts.
type HTTPConfig struct {
	Port            int           `env:"HTTP_PORT" envDefault:"8080"`
	ReadTimeout     time.Duration `env:"HTTP_READ_TIMEOUT" envDefault:"10s"`
	WriteTimeout    time.Duration `env:"HTTP_WRITE_TIMEOUT" envDefault:"15s"`
	ShutdownTimeout time.Duration `env:"HTTP_SHUTDOWN_TIMEOUT" envDefault:"30s"`
}

// DatabaseConfig configures the Postgres connection pool.
type DatabaseConfig struct {
	URL      Secret `env:"DATABASE_URL,required"`
	MaxConns int32  `env:"DATABASE_MAX_CONNS" envDefault:"20"`
	MinConns int32  `env:"DATABASE_MIN_CONNS" envDefault:"2"`
}

// RedisConfig configures the Redis client used for cache, rate limiting and
// idempotency storage.
type RedisConfig struct {
	URL Secret `env:"REDIS_URL,required"`
}

// LogConfig controls the structured logger's level and output format.
type LogConfig struct {
	Level  string `env:"LOG_LEVEL" envDefault:"info"`
	Format string `env:"LOG_FORMAT" envDefault:"json"`
}

// JWTConfig holds the signing secret and token TTLs for authentication.
type JWTConfig struct {
	AccessSecret Secret        `env:"JWT_ACCESS_SECRET,required"`
	AccessTTL    time.Duration `env:"JWT_ACCESS_TTL" envDefault:"15m"`
	RefreshTTL   time.Duration `env:"JWT_REFRESH_TTL" envDefault:"720h"`
}

// OTelConfig toggles OpenTelemetry export and points at the OTLP collector.
type OTelConfig struct {
	Enabled      bool   `env:"OTEL_ENABLED" envDefault:"false"`
	OTLPEndpoint string `env:"OTEL_EXPORTER_OTLP_ENDPOINT" envDefault:"http://localhost:4318"`
}

// Secret wraps a sensitive string so it is never printed by fmt or slog.
// Call [Secret.Reveal] at the boundary where the raw value is required.
type Secret string

// String implements fmt.Stringer and always returns a redaction marker.
func (s Secret) String() string { return "[REDACTED]" }

// GoString implements fmt.GoStringer so %#v output also stays redacted.
func (s Secret) GoString() string { return "[REDACTED]" }

// Reveal returns the underlying secret value. Use only at trust boundaries.
func (s Secret) Reveal() string { return string(s) }

// IsProduction reports whether the process is running in the production
// environment. Prefer it over string comparison at call sites.
func (c *Config) IsProduction() bool { return c.App.Env == EnvProduction }

// Load reads a .env file if present, parses environment variables into a
// [Config], validates it, and returns the result. Missing required variables
// or invalid values produce an error rather than a partially-initialized Config.
func Load() (*Config, error) {
	_ = godotenv.Load()
	var cfg Config
	if err := env.Parse(&cfg); err != nil {
		return nil, fmt.Errorf("parse env: %w", err)
	}
	if err := cfg.validate(); err != nil {
		return nil, err
	}
	return &cfg, nil
}

func (c *Config) validate() error {
	if len(c.JWT.AccessSecret) < 32 {
		return fmt.Errorf("JWT_ACCESS_SECRET must be >= 32 bytes")
	}
	switch c.App.Env {
	case EnvDevelopment, EnvStaging, EnvProduction:
	default:
		return fmt.Errorf("invalid APP_ENV: %s", c.App.Env)
	}
	return nil
}
