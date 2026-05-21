# Adticks

Adticks is a production-shaped SEO intelligence platform foundation with:

- Next.js frontend
- FastAPI backend
- Google OAuth login endpoints
- Postgres persistence
- Redis broker
- Celery audit worker
- Docker Compose orchestration

## Local Stack

1. Copy `.env.example` to `.env`.
2. Add Google OAuth credentials:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
3. In Google Cloud Console, add this redirect URI:
   - `http://127.0.0.1:8000/api/v1/auth/google/callback`
4. Run:

```bash
docker compose up --build
```

Frontend: `http://127.0.0.1:3000`

Backend health: `http://127.0.0.1:8000/api/v1/health`

## Current Product Surface

- `/` is the landing page.
- `/login` starts Google OAuth.
- `/app` is the authenticated audit command center.
- Backend audit APIs live under `/api/v1/audits`.

## Current Backend Behavior

Audit creation requires a valid session cookie from Google OAuth. Created audits are persisted in Postgres and dispatched to Celery through Redis. The current worker task is a scaffold that updates audit state; the next implementation step is replacing it with the real robots, sitemap, fetch, render, extract, scoring, and recommendation pipeline.
