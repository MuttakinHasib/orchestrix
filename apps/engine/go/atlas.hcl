data "external_schema" "bun" {
  program = [
    "go", "run", "-mod=mod", "./cmd/schema",
  ]
}

env "local" {
  src = data.external_schema.bun.url
  dev = "docker://postgres/17/dev?search_path=public"
  url = getenv("DATABASE_URL")

  migration {
    dir = "file://migrations"
  }

  format {
    migrate {
      diff = "{{ sql . \"  \" }}"
    }
  }
}