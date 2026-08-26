Deployment (local, Docker)

1) Prerequisites
- Docker and Docker Compose installed on the host.
- Copy `.env.example` to `.env` and set secure values.

2) Quick start (from repo root)

```bash
# Copy example env and edit
cp .env.example .env
# edit .env and set DB_ROOT_PASSWORD and JWT_SECRET_KEY

docker-compose up --build
```

This will:
- Start MySQL (database `pragya_shipping`) and run `create_admin.sql` on first initialization to seed admin (`admin@pragyashipping.com` / `admin123`).
- Build and run backend on port `8080`.
- Build and serve frontend via nginx on port `5173`.

3) Notes
- The `create_admin.sql` seed runs only when the MySQL data directory is empty (first run). For production, remove or replace seeding with secure provisioning.
- Set strong `JWT_SECRET_KEY` (>=32 chars) and change admin password after first login.
- For real production deployments use TLS, secrets manager, and proper DB backups.
