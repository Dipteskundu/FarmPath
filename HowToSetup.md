# FarmPath / AgriNova — Setup & Deployment Guide

This guide explains how to configure and run the FarmPath platform locally, understand its three deployed services, and prepare the application for a self-managed VPS deployment.

> **Repository layout:** The Next.js frontend is in the repository root (`src/` and `public/`), the main Express backend is in `AgriNova-Server/`, and the Python FastAPI AI microservice is in `AgriNova-AI/ai-service/`. `AgriNova-AI/backend/` is a separate optional Node.js service; it is not the main platform backend.

---

## 1. Application and Service URLs

The live platform is split across three deployed services.

| Component | URL |
|---|---|
| Frontend | https://farmpath.vercel.app/ |
| Main backend | https://agrinova-backend1.onrender.com |
| Main backend API documentation | https://agrinova-backend1.onrender.com/docs/#/ |
| AI microservice | https://agrinova-ai-service.onrender.com |
| AI API documentation | https://agrinova-ai-service.onrender.com/docs |
| AI health check | https://agrinova-ai-service.onrender.com/health |

### Important: wake up the AI service before the live demo

The AI microservice is hosted on Render and may take time to start after a period of inactivity.

1. Open the [AgriNova AI health check](https://agrinova-ai-service.onrender.com/health).
2. Wait until the endpoint returns a healthy response.
3. Then open the [FarmPath live platform](https://farmpath.vercel.app/).

This is especially important before demonstrating crop recommendations, fertilizer guidance, or other AI-backed features.

---

## 2. Prerequisites

Install the following tools for local development:

- **Node.js 20.x** and npm for the frontend and Node.js backend.
- **Python 3.10 or a version supported by** `AgriNova-AI/ai-service/requirements.txt`.
- **MongoDB**, either a local instance or MongoDB Atlas.
- Git.
- Internet access for package installation and live weather requests to Open-Meteo.

Optional:
- A Cloudinary account if image uploads should use Cloudinary.
- A VPS and a domain name for self-managed hosting.
- Docker and Docker Compose for container-based deployment. Docker configuration files are not currently included in this repository; see [Docker deployment status](#9-docker-deployment-status).

---

## 3. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd FarmPath
```

Replace the placeholder with the repository's actual clone URL.

The repository root contains the Next.js application. Do not change into `AgriNova-Server/` when installing the frontend.

---

## 4. Configure Environment Variables

Create separate environment files for each service. Do not commit real `.env` files or secrets.

### 4.1 Frontend — repository root

Create `.env.local` in the repository root:

```env
# Main backend API base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Firebase web application configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Use the actual Firebase web-app values from the Firebase Console. The frontend package includes Firebase, and these public configuration values are exposed to the browser by design. Never put private server credentials in `NEXT_PUBLIC_` variables.

For the deployed frontend, configure the same variables in the Vercel project's Environment Variables. Set:

```env
NEXT_PUBLIC_API_URL=https://agrinova-backend1.onrender.com/api
```

Redeploy the frontend after changing its environment variables.

### 4.2 Main backend — `AgriNova-Server/`

Create `AgriNova-Server/.env` using `AgriNova-Server/.env.example` as the reference.

```env
PORT=5000
NODE_ENV=development

# MongoDB connection
MONGODB_URI=mongodb://127.0.0.1:27017/agrinova

# Authentication
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRE=30d

# Frontend origin allowed by CORS
FRONTEND_URL=http://localhost:3000

# Public API base URL used when constructing uploaded-file URLs
PUBLIC_API_URL=http://localhost:5000

# Optional Cloudinary image storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Optional Python AI microservice
AI_SERVICE_URL=http://127.0.0.1:8000

# Escrow scheduler configuration
DISABLE_ESCROW_SWEEP=
CRON_SECRET=

# Legacy/optional configuration keys retained by the project
WEATHER_API_KEY=
PAYMENT_GATEWAY_KEY=
AI_API_KEY=
CLOUD_STORAGE_BUCKET=
```

For production, use a strong, unique `JWT_SECRET`, a production MongoDB connection string, and the correct deployed origins. Do not use the example values in production.

For the current hosted setup, the main backend should use:

```env
NODE_ENV=production
FRONTEND_URL=https://farmpath.vercel.app
AI_SERVICE_URL=https://agrinova-ai-service.onrender.com
PUBLIC_API_URL=https://agrinova-backend1.onrender.com
```

Configure these in the Render service's Environment settings, not in a committed file.

### 4.3 Python AI service — `AgriNova-AI/ai-service/`

The repository includes `AgriNova-AI/ai-service/.env.example`. Copy it to `.env` if local environment overrides are needed.

```env
AI_SERVICE_HOST=0.0.0.0
AI_SERVICE_PORT=8000
ENVIRONMENT=development

OPEN_METEO_BASE_URL=https://api.open-meteo.com/v1/forecast
WEATHER_CACHE_TTL_SECONDS=3600
```

The weather integration uses Open-Meteo. The checked-in example notes that an API key is not required for its non-commercial free tier.

---

## 5. Run the Python AI Microservice

Open a terminal at the repository root:

```bash
cd AgriNova-AI/ai-service

# Create a virtual environment
python -m venv .venv
```

Activate it.

**Windows PowerShell:**

```powershell
.venv\Scripts\Activate.ps1
```

**macOS / Linux:**

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Start the API:

```bash
python -m uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

The AI service is now available at:

- Health check: http://127.0.0.1:8000/health
- Model information: http://127.0.0.1:8000/model/info
- Swagger API documentation: http://127.0.0.1:8000/docs
- ReDoc documentation: http://127.0.0.1:8000/redoc

Keep this terminal running while using AI-backed functionality locally.

### Optional: train and evaluate the model

The repository includes model training and evaluation scripts. Training is not required just to start the API when the checked-in model artifacts are available.

```bash
python src/train.py
python src/evaluate.py
```

These operations can take additional time and may regenerate model artifacts.

---

## 6. Run the Main Node.js Backend

Open a second terminal from the repository root:

```bash
cd AgriNova-Server
npm ci
```

Create and configure `AgriNova-Server/.env` as described above.

Start the development server:

```bash
npm run dev
```

For production mode:

```bash
npm start
```

The backend uses port `5000` by default. Its API documentation is served by the backend's Swagger configuration. When running locally, check:

- API base: http://localhost:5000
- API documentation: http://localhost:5000/docs/#/

The backend must be able to connect to MongoDB. For AI-backed endpoints, `AI_SERVICE_URL` must point to the running FastAPI service.

---

## 7. Run the Next.js Frontend

Open a third terminal from the repository root:

```bash
npm ci
```

Make sure the root `.env.local` points to the local backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open:

http://localhost:3000

For a production build:

```bash
npm run build
npm run start
```

The frontend requires the main backend to be available for application data and API operations.

---

## 8. Database Setup and Demo Accounts

The main backend uses MongoDB with Mongoose. Configure `MONGODB_URI` before running database operations.

### Seed the demonstration data

From `AgriNova-Server/`:

```bash
npm run seed
```

The repository's seed script prints these demonstration login credentials:

| Role | Email | Password |
|---|---|---|
| Platform Admin | `admin@demo.com` | `demo123` |
| Farmer | `farmer@demo.com` | `demo123` |
| Multi-role user | `multi@demo.com` | `demo123` |
| Buyer | `buyer@demo.com` | `demo123` |

The seed script also creates a demo supplier account. The script output and seed implementation are the source of truth for the available seeded accounts.

> **Important database safety warning:** The main seed script is designed to populate demo/reference data. It calls `deleteMany()` before replacing several collections. Do not run `npm run seed` against a live customer database or a production database containing data you need to preserve. Use a separate demo database and review the seed scripts before running them.
>
> The demo passwords are public development credentials. Never use them for real users or leave seeded demo accounts enabled in a production environment. Change or remove them before a client-facing production handover.

---

## 9. Docker Deployment Status

The supplied repository does not currently contain a root `Dockerfile`, service-specific Dockerfiles, or a `docker-compose.yml` / `compose.yaml`.

Therefore, Docker deployment is **not yet a ready-to-run deployment option** for this codebase. Do not assume that `docker compose up` will work until container definitions have been added and tested.

A Docker implementation should define and configure the following services:

1. Next.js frontend.
2. Main Node.js/Express backend.
3. Python FastAPI AI microservice.
4. MongoDB, only if the deployment is intended to host MongoDB locally rather than use MongoDB Atlas.

The containers will also need service-to-service URLs, persistent storage where applicable, health checks, secrets, and production-safe networking. The frontend must use a browser-accessible backend URL; the backend must use the internal or reachable AI service URL.

Before preparing a production Docker Compose configuration, decide whether MongoDB will be hosted on MongoDB Atlas or on the VPS, and provide the intended VPS operating system/provider.

---

## 10. VPS Deployment Preparation

The repository currently documents a Vercel frontend and Render backend deployment. A self-managed VPS deployment requires additional server configuration.

A typical VPS deployment will need:

- A supported Linux distribution (Ubuntu LTS is a common option).
- Node.js 20.x and npm.
- A compatible Python runtime and the AI service dependencies.
- MongoDB Atlas or a secured MongoDB installation.
- A reverse proxy such as Nginx.
- HTTPS certificates and domain/DNS configuration.
- Process supervision for the frontend, backend, and AI service.
- Firewall rules, backups, log rotation, and monitoring.

### Suggested service mapping

| Application | Example internal port |
|---|---:|
| Next.js frontend | 3000 |
| Main Express backend | 5000 |
| FastAPI AI microservice | 8000 |

These are application ports, not public ports that should all be exposed directly. A reverse proxy should route public HTTPS traffic to the appropriate service.

> A VPS-specific, copy-and-paste deployment procedure cannot be finalized until the VPS provider, operating system, domain/subdomain plan, and MongoDB hosting choice are known.

---

## 11. Existing Hosted Deployment

The current deployment uses:

- **Vercel** for the Next.js frontend.
- **Render** for the main Node.js/Express backend.
- **Render** for the Python FastAPI AI microservice.
- **MongoDB** for persistent application data.

The repository root includes `render.yaml` for the main backend service. The frontend has its own Vercel configuration, and the backend has a separate `AgriNova-Server/vercel.json` configuration for its serverless deployment setup.

For the currently shared live environment, use these values:

```env
# Frontend (Vercel)
NEXT_PUBLIC_API_URL=https://agrinova-backend1.onrender.com/api

# Main backend (Render)
FRONTEND_URL=https://farmpath.vercel.app
AI_SERVICE_URL=https://agrinova-ai-service.onrender.com
```

Set secrets and database credentials through the relevant hosting provider's environment-variable settings.

---

## 12. Troubleshooting

### AI recommendations are unavailable

1. Open https://agrinova-ai-service.onrender.com/health.
2. Wait for the AI service to become healthy.
3. Confirm the main backend's `AI_SERVICE_URL` points to the AI service.
4. Check the AI API documentation at https://agrinova-ai-service.onrender.com/docs.
5. Review the Render logs for startup or request errors.

### Frontend cannot reach the backend

- Confirm `NEXT_PUBLIC_API_URL` includes the `/api` suffix.
- Confirm the backend is running and reachable.
- Confirm `FRONTEND_URL` matches the frontend origin in production.
- Check browser developer tools and backend logs.

### Backend cannot connect to MongoDB

- Verify `MONGODB_URI`.
- Check database username/password and network access rules.
- Confirm the target database is reachable from the backend host.

### AI service fails to start locally

- Check Python compatibility with `requirements.txt`.
- Activate the correct virtual environment.
- Install all requirements.
- Confirm port `8000` is available.
- Review the terminal output for missing model files or dependencies.

---

## 13. Pre-Demo Checklist

- [ ] Frontend opens successfully.
- [ ] AI health check returns a healthy response before the demo.
- [ ] Login works with the intended demo account.
- [ ] Admin, farmer, and buyer views are ready to demonstrate.
- [ ] Backend API documentation opens.
- [ ] AI API documentation opens.
- [ ] Crop recommendation and fertilizer guidance can reach the AI service.
- [ ] Demo database contains sample data.
- [ ] No production secrets or private credentials are exposed.
- [ ] Demo accounts use non-sensitive demonstration data only.

---

## 14. Project Documentation

- Main project overview: [`README.md`](README.md)
- Main backend documentation: [`AgriNova-Server/README.md`](AgriNova-Server/README.md)
- AI service documentation: [`AgriNova-AI/README.md`](AgriNova-AI/README.md)
- AI microservice setup: [`AgriNova-AI/ai-service/README.md`](AgriNova-AI/ai-service/README.md)
- Backend environment template: [`AgriNova-Server/.env.example`](AgriNova-Server/.env.example)
- AI environment template: [`AgriNova-AI/ai-service/.env.example`](AgriNova-AI/ai-service/.env.example)
