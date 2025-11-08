
# Prescription Manager (Frontend)

A simple, production-minded React frontend scaffold for managing prescriptions. Built with Vite, React 19 and Axios. This repository contains the UI for listing, creating, editing and reporting prescriptions. It is intended to be paired with a RESTful backend that exposes endpoints under `/api/v1`.

## What this app does

- View a list of prescriptions and filter by date range
- Create, edit and delete prescriptions
- View a daily prescription report (count per day)
- Uses an Axios-based API helper with a development proxy (Vite) to avoid CORS in dev

## Tech stack

- React 19
- Vite
- Axios for HTTP requests
- React Router for client-side routing
- ESLint for linting

## Quick start (Windows PowerShell)

Open a PowerShell in the project root (F:/Java Project/prescriptionAppFrontend) and run:

```powershell
npm install
npm run dev
```

This starts the Vite dev server (default port 5173). The frontend proxies requests that start with `/api` to `http://localhost:8080` (see `vite.config.js`) so run your backend on port 8080 or update the proxy target.

To create a production build:

```powershell
npm run build
npm run preview
```

## Scripts (from package.json)

- `npm run dev` — start Vite in development mode
- `npm run build` — build for production
- `npm run preview` — locally preview build
- `npm run lint` — run ESLint

## How the frontend talks to the backend

- `src/services/api.js` configures Axios with a `baseURL` of `/api/v1` and `withCredentials: true`. During development, Vite proxies `/api` to `http://localhost:8080` (see `vite.config.js`).
- Important: `src/services/api.js` currently contains hard-coded basic auth credentials (`admin` / `admin123`). This is insecure for production — see "Security & environment" below.

Common backend endpoints expected by the frontend:

- GET `/api/v1/prescriptions` — list prescriptions. Accepts query params `from` and `to` (YYYY-MM-DD)
- POST `/api/v1/prescriptions` — create a prescription
- PUT `/api/v1/prescriptions/:id` — update a prescription
- DELETE `/api/v1/prescriptions/:id` — delete a prescription
- GET `/api/v1/prescriptions/report` — returns per-day counts (accepts `from` and `to`)

These endpoints are used in:
- `src/pages/PrescriptionList.jsx` — list, filter, create, edit, delete
- `src/pages/Report.jsx` — request report data
- `src/pages/PrescriptionForm.jsx` — form for create/edit

## Folder structure (important files)

- `src/main.jsx` — app entry
- `src/App.jsx` — router + header
- `src/pages/PrescriptionList.jsx` — prescriptions list page
- `src/pages/PrescriptionForm.jsx` — prescription form component
- `src/pages/Report.jsx` — report page
- `src/services/api.js` — axios instance + parseError helper
- `src/components/ErrorAlert.jsx` — small error UI
- `vite.config.js` — dev proxy configuration

## Code review notes & recommendations (actionable)

1) Remove hard-coded credentials

- `src/services/api.js` has `auth` with username/password set. Move credentials to environment variables and/or implement secure auth (JWT, OAuth) on the backend.

2) Environment variables / runtime configuration

- Prefer using a Vite env var for the backend URL (e.g. `VITE_API_BASE_URL`) and initialize Axios from that value with a fallback to `/api/v1` for dev proxy. This simplifies deployments.

3) Error handling and UX

- `parseError` provides good debug info, but be mindful of leaking server internals to users. Keep verbose logs for dev and show user-friendly messages in production.

4) Accessibility & semantics

- `ErrorAlert` uses `role="alert"` — good. Consider testing keyboard navigation and screen-reader behaviour for interactive controls.

5) Tests

- There are no unit or integration tests. Add a small test suite (Jest + React Testing Library or Vitest) for critical components and services.

6) Linting & types

- ESLint is present; consider adding TypeScript for stronger guarantees in the long run.

## Environment / Deployment

- Dev: start backend on `http://localhost:8080` (or update `vite.config.js` proxy target)
- Prod: configure the frontend to call the real API base URL (set `VITE_API_BASE_URL` or similar) and remove dev proxy.

Example .env (Vite):

```env
# .env
VITE_API_BASE_URL=https://api.example.com/api/v1
```

Then update `src/services/api.js` to read from `import.meta.env.VITE_API_BASE_URL`.


