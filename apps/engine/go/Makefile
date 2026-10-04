SHELL := /bin/bash
APP   := orchestrix-api
PKG   := ./...
BIN   := ./bin/api
CMD   := ./cmd/api

ifneq (,$(wildcard .env))
include .env
export
endif

COMPOSE := docker compose -f deployments/docker/compose.yml

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*?## "}{printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'

## --- deps ---
.PHONY: tools
tools: ## install dev tools
	go install github.com/air-verse/air@latest
	go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@latest
	@echo "atlas: brew install ariga/tap/atlas"

## --- docker deps ---
.PHONY: up down logs
up: ## start pg + redis
	$(COMPOSE) up -d
down: ## stop pg + redis
	$(COMPOSE) down
logs:
	$(COMPOSE) logs -f

## --- app ---
.PHONY: dev build run
dev: ## hot-reload api
	go tool air
build: ## static binary
	CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o $(BIN) $(CMD)
run: build
	$(BIN)

## --- quality ---
.PHONY: fmt lint test test-race cover
fmt:
	gofmt -w .
	goimports -w .
lint:
	golangci-lint run
test:
	go test -count=1 $(PKG)
test-race:
	go test -race -count=1 $(PKG)
cover:
	go test -race -covermode=atomic -coverprofile=coverage.out $(PKG)
	go tool cover -html=coverage.out -o coverage.html

## --- db ---
.PHONY: new-migration migrate migrate-status migrate-lint
new-migration: ## generate a migration from the Bun models
	@read -p "name: " name; atlas migrate diff $$name --env local
migrate: ## apply pending migrations
	atlas migrate apply --env local
migrate-status: ## show migration status
	atlas migrate status --env local
migrate-lint: ## fail on destructive changes in the latest migration
	atlas migrate lint --env local --latest 1
