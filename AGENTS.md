# AGENTS.md — FarmPath / AgriNova

Instructions for AI coding assistants and developers working in this repository.

## 1. Project Overview

FarmPath is a Bangladesh-focused smart agriculture and farm-to-market platform. The repository contains three primary application components:

1. **Frontend:** Next.js application in the repository root (`src/` and `public/`).
2. **Main platform backend:** Node.js/Express application in `AgriNova-Server/`.
3. **AI microservice:** Python/FastAPI application in `AgriNova-AI/ai-service/`.

There is also a separate Node.js service in `AgriNova-AI/backend/`. It is an additional AI API and is not the main platform backend. Do not confuse the two backends.

The main request path for AI-powered functionality is:

```text
Next.js frontend
      |
      v
AgriNova-Server (Node.js / Express)
      |
      v
AgriNova-AI/ai-service (Python / FastAPI)
      |
      v
Crop, fertilizer, seasonal and weather recommendations
```

## 2. Repository Map

```text
FarmPath/
├── AgriNova-AI/
│   ├── ai-service/             # Python FastAPI AI microservice
│   │   ├── api/                # FastAPI application and route handlers
│   │   ├── data/               # Raw and processed agricultural datasets
│   │   ├── models/             # Trained model artifacts and metadata
│   │   ├── src/                # Prediction and recommendation engines,
│   │   │                       # data processing, training and evaluation
│   │   ├── tests/              # Python tests
│   │   ├── requirements.txt
│   │   └── README.md
│   ├── backend/                # Separate optional Node.js AI API
│   ├── docs/                   # AI API, methodology, BARC, fertilizer,
│   │                           # weather and model documentation
│   ├── reports/                # Model metrics and evaluation reports
│   └── README.md
│
├── AgriNova-Server/
│   ├── api/                    # Serverless deployment entry point
│   ├── scripts/                # Utility scripts (including local DB startup)
│   ├── src/
│   │   ├── config/             # Database, environment and service config
│   │   ├── database/
│   │   │   ├── models/         # Mongoose models
│   │   │   └── seed/           # Demo/reference data and seed utilities
│   │   ├── docs/               # Swagger/OpenAPI setup
│   │   ├── middleware/         # Auth, role, error and upload middleware
│   │   ├── modules/            # Feature modules and route handlers
│   │   ├── utils/              # Shared backend utilities
│   │   ├── app.js              # Express app configuration
│   │   └── server.js           # Local HTTP server entry point
│   ├── .env.example
│   ├── package.json
│   ├── server.js               # Root wrapper for local development
│   └── vercel.json
│
├── public/                     # Frontend static assets
├── src/
│   ├── app/                    # Next.js App Router routes and layouts
│   ├── components/             # Shared UI components
│   ├── contexts/               # Authentication, language and theme contexts
│   ├── features/               # Role- and domain-oriented UI features
│   ├── hooks/                  # Shared React hooks
│   ├── lib/                    # API clients, Firebase, localization and helpers
│   ├── services/               # Frontend service modules
│   └── types/                  # TypeScript types
├── .env.example                # Add/update only if a root template exists
├── package.json
├── render.yaml
├── vercel.json
└── AGENTS.md
```

When making changes, inspect the relevant directory and its existing conventions first. This map is a guide, not a substitute for checking the current source.

## 3. Technology Stack

### Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Firebase client SDK
- Stripe packages are present in the frontend dependencies

Use the existing Next.js App Router structure. Keep client-only behavior in components that need it; do not add `"use client"` to a file unless the component requires client-side state, effects, event handlers, or browser APIs.

### Main backend

- Node.js 20.x
- Express 4
- MongoDB with Mongoose 8
- JWT authentication
- `express-validator`
- Multer and Cloudinary for file uploads
- Swagger UI / OpenAPI documentation

### AI service

- Python (the AI service README specifies Python 3.10 or a compatible version)
- FastAPI / Uvicorn
- scikit-learn and XGBoost-related model dependencies as defined in `requirements.txt`
- Joblib model artifacts
- Open-Meteo weather data integration

Always treat each service's own `package.json`, `requirements.txt`, README and environment example as the source of truth for dependency versions and commands.

## 4. Frontend Development Rules

- Put application routes and layouts in `src/app/`.
- Put reusable visual components in `src/components/`.
- Put domain-specific and role-specific screens in `src/features/`.
- Reuse existing API clients in `src/lib/` rather than scattering raw `fetch` calls across UI components.
- Check the relevant API helper (`adminApi`, `farmerApi`, `marketplaceApi`, etc.) before adding a new endpoint call.
- Reuse the existing authentication, language and theme contexts where appropriate.
- Preserve the current English/Bengali localization patterns. Check `src/lib/localize.ts`, `src/lib/uiDict.ts` and `src/contexts/LanguageContext.tsx` before adding user-facing strings.
- Preserve existing responsive layout and accessibility behavior.
- Avoid duplicating components or business logic that already exists in `src/components/`, `src/features/` or `src/lib/`.
- Keep TypeScript types explicit. Update shared types in `src/types/` when a shared API or domain contract changes.
- Do not expose private keys, server secrets or credentials through `NEXT_PUBLIC_` variables. Only values intentionally safe for browser exposure belong in public environment variables.

### Frontend commands

Run from the repository root:

```bash
npm ci
npm run dev
npm run build
npm run start
npm run lint
```

The root package scripts are defined in the root `package.json`. If a script fails because of the installed framework/tool version, inspect the script and tool output rather than silently changing project configuration.

## 5. Main Backend Development Rules

Work inside `AgriNova-Server/` for platform API changes.

- Follow the existing module structure under `src/modules/`.
- Keep route registration, request validation, controller/service logic and persistence responsibilities consistent with nearby modules.
- Use the existing Mongoose models in `src/database/models/`. Do not introduce a second data-access pattern without a clear reason.
- Check `src/config/db.js`, `src/config/services.js` and `src/config/cloudinary.js` before changing infrastructure integrations.
- Use the existing authentication and authorization middleware. Do not rely only on frontend route hiding for access control.
- Apply role checks on protected server routes and validate request input.
- Keep error responses consistent with the existing error middleware.
- Preserve the distinction between `src/app.js` (Express application setup) and `src/server.js` (local server startup). The serverless entry point under `api/` uses the app; do not add `listen()` to `src/app.js`.
- For upload changes, account for Cloudinary deployment behavior and local disk fallback. Serverless filesystems may not be persistent or writable.
- For escrow/order changes, inspect the existing escrow service and cron route/configuration before modifying release behavior.
- Update Swagger/OpenAPI documentation when changing public API behavior.

### Main backend commands

Run from `AgriNova-Server/`:

```bash
npm ci
npm run dev
npm start
npm run lint
```

Database and seed scripts (use only against a disposable/local/demo database unless explicitly intended):

```bash
npm run db:start
npm run seed
npm run seed:marketplace
npm run seed:quality
npm run seed:inputs
npm run migrate:ratings
```

**Seed safety:** inspect the target seed script before running it. Some seed operations clear or replace records in collections. Never run seed or migration commands against production data without explicit authorization, a verified backup and a clear understanding of the script's effects.

## 6. AI Microservice Development Rules

Work inside `AgriNova-AI/ai-service/` for Python AI API, model, crop catalog, fertilizer, season or weather changes.

- Keep FastAPI route definitions in `api/routes/` and the application entry point in `api/main.py`.
- Keep request/response schemas aligned with `api/schemas.py`.
- Keep domain logic in the relevant modules under `src/` rather than embedding model or agricultural calculations in route handlers.
- Check existing crop prediction, recommendation, season, fertilizer, BARC and weather engines before implementing parallel logic.
- Preserve the distinction between model-based crop prediction and deterministic/domain-data-based guidance.
- Treat the checked-in files in `models/` as runtime model artifacts. Do not delete or regenerate them unless the task explicitly requires retraining or artifact replacement.
- Check the dataset and data dictionary documentation before changing feature names, preprocessing, class labels or model inputs.
- Do not present model evaluation metrics as guarantees of real-world yield or field performance.
- Preserve weather caching and fallback behavior when changing the Open-Meteo integration.
- Keep API behavior and documentation in sync when adding or changing endpoints.

### AI service commands

Run from `AgriNova-AI/ai-service/`:

```bash
python -m venv .venv
```

Activate the virtual environment, then:

```bash
python -m pip install -r requirements.txt
python -m uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
python -m pytest tests -v
```

Model training and evaluation are separate operations and are not required just to run the API when valid checked-in model artifacts are present:

```bash
python src/train.py
python src/evaluate.py
```

Training can take additional time and may replace generated model artifacts. Do not run it as part of routine API debugging.

## 7. Separate AI Node.js Backend

`AgriNova-AI/backend/` is an independent Node.js service. It is not the main application backend in `AgriNova-Server/`.

Before changing it:

1. Read `AgriNova-AI/README.md`.
2. Read `AgriNova-AI/backend/package.json`.
3. Read `AgriNova-AI/backend/.env.example`.
4. Inspect its own route, middleware, model and test structure.

Do not assume its routes, authentication, environment variables, deployment, or scripts are shared with `AgriNova-Server/`.

Use its own package scripts and README for commands. Do not invent a test script if none is defined.

## 8. Service Configuration and Local Integration

The main backend calls the Python AI microservice using:

```env
AI_SERVICE_URL=http://127.0.0.1:8000
```

The main backend's default local port is `5000`; the frontend development server normally runs on `3000`; the AI service uses `8000`.

For local end-to-end development:

1. Start MongoDB or configure a reachable MongoDB Atlas database.
2. Start the AI service on port `8000`.
3. Start the main backend on port `5000` with `AI_SERVICE_URL` pointing to the AI service.
4. Start the frontend on port `3000` with its API base URL pointing to the main backend.

For hosted integration, use the deployment provider's environment settings. Do not hard-code production service URLs into application logic when the project already uses environment variables.

Current known hosted service URLs:

- Frontend: `https://farmpath.vercel.app/`
- Main backend: `https://agrinova-backend1.onrender.com`
- Main backend docs: `https://agrinova-backend1.onrender.com/docs/#/`
- AI service: `https://agrinova-ai-service.onrender.com`
- AI service health: `https://agrinova-ai-service.onrender.com/health`
- AI service docs: `https://agrinova-ai-service.onrender.com/docs`

Render-hosted services may need time to wake after inactivity. For an AI-backed demonstration, open the AI health endpoint first and wait for a healthy response before opening the frontend.

## 9. Environment Variables and Secrets

- Use each service's `.env.example` as the source of truth.
- Keep local secrets in untracked `.env` or `.env.local` files.
- Never commit real MongoDB credentials, JWT secrets, Firebase private credentials, Cloudinary secrets, payment credentials, or access tokens.
- Never copy real production values into documentation, source code, tests, screenshots or example files.
- Keep example values clearly marked as placeholders.
- When adding an environment variable, update the relevant `.env.example` and the service documentation.
- The main backend's production CORS behavior depends on `NODE_ENV` and `FRONTEND_URL`; preserve the allowlist behavior.
- The main backend's `AI_SERVICE_URL` is optional and the code is intended to fail gracefully when it is not configured.
- The Python AI service's environment example documents host/port and Open-Meteo configuration.

## 10. Testing and Quality Checks

Run the narrowest relevant checks first, then broader checks when practical.

| Area changed | Suggested checks |
|---|---|
| Frontend | `npm run build`, `npm run lint` from repository root |
| Main backend | `npm run lint` from `AgriNova-Server/`; exercise the affected API route |
| AI microservice | `python -m pytest tests -v` from `AgriNova-AI/ai-service/` |
| Cross-service integration | Start AI service, main backend and frontend; test the affected user flow end to end |

Do not claim tests passed unless they were actually run and their output was checked. If a test cannot run because dependencies, credentials, services or data are unavailable, report that limitation.

Add or update tests when changing business rules, validation, API behavior, model preprocessing, prediction behavior or other logic with meaningful regression risk.

## 11. API and Data Contract Changes

When changing an API:

1. Inspect the existing frontend API helper and backend route/controller/service.
2. Inspect the Mongoose model and validation rules involved.
3. Update request and response handling consistently across frontend and backend.
4. Update Swagger/OpenAPI documentation where applicable.
5. Add or update tests.
6. Preserve compatibility where possible; call out breaking changes explicitly.

Do not guess field names or role values. Read the actual model, validation and authorization code before relying on them.

## 12. Security and Data Integrity

- Enforce authorization on the backend for every protected operation.
- Validate and sanitize user-controlled input.
- Do not log passwords, tokens, secrets or sensitive personal data.
- Use password hashing and existing authentication utilities; never store plaintext passwords.
- Avoid weakening CORS, JWT validation, role checks, file validation or upload restrictions to make a local test pass.
- Treat uploaded files and external API responses as untrusted input.
- Avoid destructive database operations. Ask before deleting, bulk-updating or migrating production data.
- Do not add real customer information to seed data or fixtures.

## 13. UI and Product Consistency

- Preserve FarmPath's existing visual language and component patterns.
- Prefer existing shared UI components over one-off implementations.
- Preserve responsive behavior and keyboard accessibility.
- Keep user-facing terminology consistent across roles and languages.
- Where a feature is role-specific, inspect the corresponding feature area and route/permission logic before changing it.
- Do not claim a feature is complete merely because a UI control is present; verify its API integration and authorization path.

## 14. Working Agreement for AI Coding Agents

Before editing:

1. Identify which service owns the requested behavior.
2. Read the nearest related implementation and its tests.
3. Check the service's package scripts, dependency versions and environment examples.
4. Trace the relevant data/API flow across service boundaries if necessary.

While editing:

- Make the smallest coherent change that solves the task.
- Follow the existing naming, file organization and module conventions.
- Avoid unrelated refactors, broad formatting changes and dependency upgrades.
- Do not create duplicate API clients, models, contexts or recommendation engines.
- Do not silently change environment variable names or API response shapes.
- Keep documentation synchronized with behavior.

After editing:

1. Run relevant tests, linting or build checks when possible.
2. Review the final diff for unrelated changes and accidental secrets.
3. Summarize files changed and checks actually performed.
4. Clearly list remaining assumptions, manual steps or checks that could not be completed.

If a requirement is ambiguous or a destructive action is involved, ask for clarification instead of guessing.
