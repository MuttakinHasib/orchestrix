-- Create "sessions" table
CREATE TABLE "sessions" (
  "id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "user_id" uuid NOT NULL,
  "refresh_token_hash" text NOT NULL,
  "expires_at" timestamptz NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "sessions_refresh_token_hash_key" UNIQUE ("refresh_token_hash")
);
-- Create "users" table
CREATE TABLE "users" (
  "id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "password_hash" text NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "users_email_key" UNIQUE ("email")
);
