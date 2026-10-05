SHELL := /bin/bash
PKG   := ./...
BIN   := ./bin/api
CMD   := ./cmd/api

ifneq (,$(wildcard .env))
include .env
export
endif

COMPOSE  := docker compose -f deployments/docker/compose.yml
CONTRACT := ../../../packages/api-contract/openapi.yaml

.DEFAULT_GOAL := help

.PHONY: help
help: ## show available targets
	@grep -hE '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*## "}{printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'

## --- deps ---
.PHONY: tools
tools: ## install dev tools (air, golangci-lint, goimports, atlas)
	go install github.com/air-verse/air@latest
	go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@latest
	go install golang.org/x/tools/cmd/goimports@latest
	@if command -v atlas >/dev/null 2>&1; then \
		echo "atlas already installed: $$(atlas version)"; \
	elif command -v brew >/dev/null 2>&1; then \
		brew install ariga/tap/atlas; \
	else \
		echo "install atlas: https://atlasgo.io/getting-started#installation"; \
	fi

## --- docker deps ---
.PHONY: up down logs
up: ## start pg + redis and wait for health
	$(COMPOSE) up -d --wait
down: ## stop pg + redis
	$(COMPOSE) down
logs: ## follow pg + redis logs
	$(COMPOSE) logs -f

## --- app ---
.PHONY: dev build run
dev: ## hot-reload api
	go tool air
build: ## static binary
	CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o $(BIN) $(CMD)
run: build ## build then run the api
	$(BIN)

## --- quality ---
.PHONY: fmt lint vet test test-race cover check
fmt: ## format all Go code
	gofmt -w .
	goimports -w -local github.com/MuttakinHasib/orchestrix/apps/engine/go .
lint: ## run golangci-lint
	golangci-lint run
vet: ## go vet
	go vet $(PKG)
test: ## run all tests (integration requires a running db)
	go test -count=1 $(PKG)
test-race: ## run all tests with the race detector
	go test -race -count=1 $(PKG)
cover: ## test coverage report
	go test -race -covermode=atomic -coverprofile=coverage.out $(PKG)
	go tool cover -html=coverage.out -o coverage.html
check: ## vet + lint + test — the pre-push gate
	$(MAKE) --no-print-directory vet lint test

## --- api contract ---
.PHONY: swagger swagger-check
swagger: ## regenerate the OpenAPI spec from handler annotations and sync the contract
	go tool swag init -g cmd/api/main.go --parseDependency --parseDepth 3 -o api --outputTypes yaml
	pnpm dlx swagger2openapi api/swagger.yaml -o api/openapi.yaml
	cp api/openapi.yaml $(CONTRACT)
swagger-check: ## fail when the contract doesn't match the annotations
	$(MAKE) --no-print-directory swagger
	@diff $(CONTRACT) api/openapi.yaml || (echo "contract is stale — run make swagger"; exit 1)

## --- db ---
.PHONY: new-migration migrate migrate-status migrate-lint
new-migration: ## generate a migration from the Bun models
	@read -p "name: " name; atlas migrate diff $$name --env local
migrate: ## apply pending migrations
	atlas migrate apply --env local
migrate-status: ## show applied/pending migrations
	atlas migrate status --env local
migrate-lint: ## fail on destructive changes in the latest migration
	atlas migrate lint --env local --latest 1

## --- misc ---
.PHONY: clean
clean: ## remove build artifacts
	rm -rf bin coverage.out coverage.html
