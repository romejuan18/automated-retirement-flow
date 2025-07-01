# Makefile to run and serve automated tests with Docker Compose

ifeq (,$(wildcard .env))
$(error ❌ Falta el archivo .env en el directorio raíz)
endif

# Port validation
check-port:
	@! lsof -i :8888 >/dev/null 2>&1 || \
		(echo "❌ El puerto 8888 ya está en uso. Cierra el proceso o usa otro puerto."; exit 1)

# Run only the tests
run:
	docker compose up --build --abort-on-container-exit tests

# Serve the HTML report at http://localhost:8888
report: check-port
	docker compose up --build report

# Run tests and serve the report automatically
all: check-port
	docker compose up --build --abort-on-container-exit test-and-report

# Clean containers and volumes
clean:
	docker compose down -v

# Delete previous results
reset:
	rm -rf dist reports