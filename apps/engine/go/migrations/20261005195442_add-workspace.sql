-- Create "workspaces" table
CREATE TABLE "workspaces" (
  "id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "name" character varying NOT NULL,
  "slug" character varying NOT NULL,
  "description" character varying NOT NULL DEFAULT '',
  PRIMARY KEY ("id"),
  CONSTRAINT "workspaces_slug_key" UNIQUE ("slug")
);
