WEB_DIR    := app/web
SERVER_DIR := app/server

.PHONY: help dev dev-web dev-server install up down

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

dev: install ## Run web (Vite, :5173) and server (Spring Boot, :8080) together; Ctrl+C stops both
	@trap 'kill 0' INT TERM; \
	$(MAKE) --no-print-directory dev-server & \
	$(MAKE) --no-print-directory dev-web & \
	wait

dev-web: ## Run only the web dev server
	cd $(WEB_DIR) && npm run dev

dev-server: ## Run only the Spring Boot server
	cd $(SERVER_DIR) && ./mvnw spring-boot:run

install: $(WEB_DIR)/node_modules ## Install web dependencies if missing

$(WEB_DIR)/node_modules: $(WEB_DIR)/package-lock.json
	cd $(WEB_DIR) && npm ci
	@touch $@

up: ## Build and run the full stack in Docker (web :3000, server :8080)
	docker compose up --build

down: ## Stop the Docker stack
	docker compose down
