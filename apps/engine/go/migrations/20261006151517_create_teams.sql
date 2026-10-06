-- Create "teams" table
CREATE TABLE "teams" (
  "id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "workspace_id" uuid NOT NULL,
  "name" character varying NOT NULL,
  "description" character varying NOT NULL DEFAULT '',
  PRIMARY KEY ("id")
);
