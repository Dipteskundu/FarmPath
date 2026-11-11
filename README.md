# FarmPath --- Smart Agriculture & Farm-to-Market Platform

Farmpath AI is the intelligent agriculture component of the **Farmpath
Smart Agriculture & Farm-to-Market Platform**. It provides crop
recommendations, fertilizer guidance, weather information, and
agricultural decision support, with a focus on Bangladesh's agricultural
conditions.

The platform combines a Next.js frontend, a Node.js/Express application
backend, and a Python FastAPI AI microservice.

------------------------------------------------------------------------

## Live Application

> **Important --- Wake up the AI service before opening the
> application.**
>
> The AI service is hosted on Render and may be idle when it has not
> received requests recently. **First, open the AI health-check link
> below and wait for a successful response.** This request wakes the
> service if it is sleeping. Once the health endpoint responds, open the
> Farmpath application.

### Step 1 --- Activate the AI service

**[Open Farmpath AI Health
Check](https://agrinova-ai-service.onrender.com/health)**

Wait for the health-check response before continuing. The first request
may take a little while if the service needs to start.

### Step 2 --- Open the live application

**[Launch Farmpath --- Live Platform](https://farmpath.vercel.app/)**

### Deployed Services

  -------------------------------------------------------------------------------------
  Component                           Live URL
  ----------------------------------- -------------------------------------------------
  Frontend --- Next.js                https://farmpath.vercel.app/

  Main Backend --- Node.js/Express    https://agrinova-backend1.onrender.com

  Main Backend API Documentation      https://agrinova-backend1.onrender.com/docs/#/

  AI Microservice --- FastAPI         https://agrinova-ai-service.onrender.com

  AI Microservice API Documentation   https://agrinova-ai-service.onrender.com/docs

  AI Health Check                     https://agrinova-ai-service.onrender.com/health
  -------------------------------------------------------------------------------------


## Architecture

The FarmPath platform is organized into three main components: a Next.js frontend, a Node.js/Express backend, and a Python FastAPI AI microservice.

### Repository Structure

```text
FarmPath/
│
├── AgriNova-AI/
│   ├── ai-service/          # Python FastAPI AI microservice
│   ├── backend/             # Separate Node.js AI backend
│   ├── docs/                # AI documentation and API references
│   ├── reports/             # Model evaluation reports and figures
│   ├── .gitignore
│   └── README.md
│
├── AgriNova-Server/
│   ├── api/                 # Serverless API entry point
│   ├── scripts/             # Backend utility scripts
│   ├── src/                 # Main Express backend source
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── vercel.json
│
├── public/                  # Frontend static assets
├── src/                     # Next.js frontend source code
├── .gitignore
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── render.yaml
├── tsconfig.json
└── vercel.json
```

### Component Overview

- **`src/`** — Next.js frontend application, including pages, components, and user interface functionality.
- **`public/`** — Static assets used by the frontend.
- **`AgriNova-Server/`** — Main Node.js/Express backend responsible for authentication, database operations, platform APIs, and business logic.
- **`AgriNova-AI/ai-service/`** — Python FastAPI microservice responsible for crop prediction, agricultural recommendations, fertilizer guidance, and weather integration.
- **`AgriNova-AI/backend/`** — Separate Node.js AI API with its own authentication, routes, and recommendation-history functionality.
- **`AgriNova-AI/docs/`** — AI API references, model methodology, and technical documentation.
- **`AgriNova-AI/reports/`** — Model evaluation results, performance metrics, and generated figures.

### System Architecture

```text
                 Next.js Frontend
                    (src/)
                      |
                      v
              AgriNova-Server
             Node.js / Express
                      |
                      v
               AgriNova-AI
                      |
                      v
             ai-service (FastAPI)
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
       Crop       Bangladesh     BARC Crop
    Prediction      Crop         Zoning &
      Model        Catalog       Fertilizer
                   & Seasons     Guidance
                      |
                      v
              Open-Meteo Weather
                   Service
                      |
                      v
          Agricultural Recommendations
                      |
                      v
               Main Backend
                      |
                      v
               Next.js Frontend
```

The main application backend communicates with the Python AI microservice through the `AI_SERVICE_URL` environment variable.
 Its local default is:

``` env
AI_SERVICE_URL=http://127.0.0.1:8000
```

In the deployed environment, configure it to use the hosted AI service
URL.

------------------------------------------------------------------------

## Project Components

The Farmpath ecosystem contains the following main components:

### 1. `ai-service/` --- Python AI Microservice

The FastAPI service is responsible for AI-powered agricultural
recommendations and related data processing.

It includes:

-   Crop prediction model.
-   Bangladesh crop catalog and season engine.
-   BARC-based crop zoning and fertilizer guidance.
-   Open-Meteo weather integration.
-   Recommendation logic and supporting agricultural data.
-   API endpoints, tests, and model-loading utilities.

### 2. `AgriNova-Server/` --- Main Platform Backend

The main Node.js/Express backend provides the platform's application
APIs and connects the frontend to the platform's data and services.

Its responsibilities include:

-   Authentication and user management.
-   Role-based access control.
-   Farm, field, crop, and crop-cycle management.
-   Harvest and quality-verification workflows.
-   Marketplace, demands, and farmer-buyer matching.
-   Orders, payments, and deliveries.
-   Expenses, notifications, and administrative operations.
-   Weather and AI-service integrations.

### 3. `backend/` --- Optional AI Node.js Backend

This is a separate Node.js/Express AI API service included in the
AgriNova AI repository. It has its own routes, authentication
middleware, and recommendation-history models.

It is **not** the main platform backend. Run it independently only when
its specific endpoints or recommendation-history functionality are
required.

### 4. `docs/` --- Documentation

Contains technical documentation, including:

-   AI API reference.
-   Model methodology.
-   BARC integration.
-   Fertilizer guidance.
-   Weather engine documentation.
-   Model documentation.

### 5. `reports/` --- Evaluation Reports

Contains model evaluation results, metrics, and generated figures.

------------------------------------------------------------------------

## Technology Stack

  -----------------------------------------------------------------------
  Layer                               Technologies
  ----------------------------------- -----------------------------------
  Frontend                            Next.js, React

  Main Backend                        Node.js, Express.js

  AI Microservice                     Python, FastAPI, Uvicorn

  Database                            MongoDB, Mongoose

  Authentication                      JWT

  AI / Machine Learning               XGBoost and supporting Python ML
                                      libraries

  Agricultural Data                   Bangladesh crop catalog, BARC crop
                                      zoning and fertilizer guidance

  Weather                             Open-Meteo

  Frontend Hosting                    Vercel

  Backend and AI Hosting              Render
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Running the Project Locally

### Prerequisites

Install the following before running the services:

-   Python 3.10 or a compatible version supported by
    `ai-service/requirements.txt`.
-   Node.js 18 or later for the Node.js services.
-   npm.
-   MongoDB, locally or through MongoDB Atlas, for services that persist
    application data.
-   Network access for live weather requests to Open-Meteo.

### 1. Start the Python AI Microservice

From the repository root, run:

``` powershell
cd AgriNova-AI/ai-service

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment (Windows PowerShell)
.venv\Scripts\Activate.ps1

# Install Python dependencies
python -m pip install -r requirements.txt

# Start the FastAPI service
python -m uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

The AI service should now be available at:

  Resource                        Local URL
  ------------------------------- ----------------------------------
  Health Check                    http://127.0.0.1:8000/health
  Model Information               http://127.0.0.1:8000/model/info
  Interactive API Documentation   http://127.0.0.1:8000/docs

Keep this service running while the main backend needs AI
recommendations.

### 2. Configure and Start the Main Backend

Open the main backend project (`AgriNova-Server`) and configure its
environment variables.

At minimum, set the AI service URL to the local FastAPI address:

``` env
AI_SERVICE_URL=http://127.0.0.1:8000
```

Use the main backend's own README and environment template for the
complete database, authentication, storage, and deployment
configuration.

Install dependencies and start the backend using the scripts defined in
that project. For the backend structure described in this repository,
the usual commands are:

``` bash
npm install
npm run dev
```

The backend's local port and health-check route depend on its own
configuration.

### 3. Start the Frontend

Open the frontend project and follow its README for installation and
environment configuration.

Make sure the frontend API URL points to the locally running main
backend. Then install dependencies and start the development server
using the scripts defined by the frontend project.

------------------------------------------------------------------------

## Optional: Run the Separate AI Node.js Backend

The `backend/` directory is an additional AI API service. It is not
required when the main platform backend already handles the AI-service
integration.

To run it:

``` bash
cd AgriNova-AI/backend
npm ci
```

Create a local `.env` file based on `.env.example`. Configure the
required values, including:

-   A strong `JWT_SECRET`.
-   A valid MongoDB connection string.
-   The correct `AI_SERVICE_URL`.

Then start the service:

``` bash
npm start
```

**Security:** Never use an example JWT secret in a deployed environment.
Do not commit real `.env` files, credentials, API keys, or database
connection strings.

------------------------------------------------------------------------

## Environment Configuration

### Main Backend

The main backend uses its own environment file. The following variables
are described in its configuration:

``` env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/agrinova

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d

# Python FastAPI AI service
AI_SERVICE_URL=http://127.0.0.1:8000

# Frontend
FRONTEND_URL=http://localhost:3000

# Public API origin for uploaded-photo URLs
PUBLIC_API_URL=

# Cloudinary photo uploads
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Hourly escrow auto-release
CRON_SECRET=

# Optional external services
WEATHER_API_KEY=
PAYMENT_GATEWAY_KEY=
AI_API_KEY=
CLOUD_STORAGE_BUCKET=
```

Use the actual environment-variable names and requirements in each
service's `.env.example` or README. Values above are configuration
examples, not production credentials.

### Production Deployment Values

Configure the following service URLs in the appropriate hosting
environment:

``` env
# Main backend environment
AI_SERVICE_URL=https://agrinova-ai-service.onrender.com
FRONTEND_URL=https://farmpath.vercel.app

# Frontend environment
NEXT_PUBLIC_API_URL=https://agrinova-backend1.onrender.com/api
```

Only add variables that the relevant service actually reads. After
changing frontend environment variables on Vercel, redeploy the frontend
for the changes to take effect.

------------------------------------------------------------------------

## API Documentation

Interactive API documentation is available for both deployed backend
services.

### Main Platform Backend

-   **Base URL:** https://agrinova-backend1.onrender.com
-   **API Documentation:** [Open Main Backend API
    Docs](https://agrinova-backend1.onrender.com/docs/#/)

### AI Microservice

-   **Base URL:** https://agrinova-ai-service.onrender.com
-   **API Documentation:** [Open AI Service API
    Docs](https://agrinova-ai-service.onrender.com/docs)
-   **Health Check:** [Check AI Service
    Status](https://agrinova-ai-service.onrender.com/health)

------------------------------------------------------------------------

## Testing

### Python AI Service

``` bash
cd AgriNova-AI/ai-service
python -m pytest tests -v
```

### Separate AI Node.js Backend

``` bash
cd AgriNova-AI/backend
npm test
```

Run the main platform backend's checks from `AgriNova-Server`, following
that project's README.

------------------------------------------------------------------------

## Deployment Overview

The live platform is deployed as three separately hosted services:

  ------------------------------------------------------------------------------------------
  Service                 Hosting Provider        Deployment
  ----------------------- ----------------------- ------------------------------------------
  Next.js Frontend        Vercel                  https://farmpath.vercel.app/

  Main Node.js/Express    Render                  https://agrinova-backend1.onrender.com
  Backend                                         

  Python FastAPI AI       Render                  https://agrinova-ai-service.onrender.com
  Microservice                                    
  ------------------------------------------------------------------------------------------

### Deployment Integration Checklist

-   [ ] Frontend environment points to the deployed main backend API.
-   [ ] Main backend `AI_SERVICE_URL` points to the deployed FastAPI
    service.
-   [ ] Main backend CORS configuration allows the deployed frontend
    origin.
-   [ ] MongoDB connection string and database access are configured.
-   [ ] Required authentication and storage environment variables are
    configured.
-   [ ] AI health endpoint responds successfully.
-   [ ] Frontend can retrieve data from the main backend.
-   [ ] Main backend can communicate with the AI microservice.

------------------------------------------------------------------------

## Important Notes

-   The checked-in model files allow the AI service to load an existing
    trained model. Retraining is not required just to start the API.
-   Training and evaluation scripts may take additional time and can
    regenerate model artifacts.
-   The hosted AI service may need time to wake up after a period of
    inactivity. Open the health-check link before using the live
    application.
-   Weather responses depend on Open-Meteo availability and the
    service's cache/fallback behavior.
-   Model accuracy figures in the documentation are reported evaluation
    results; they do not guarantee field performance or crop yield.
-   Keep secrets and private environment files out of source control.

------------------------------------------------------------------------

## Troubleshooting

### AI features are unavailable

1.  Open the [AI Service Health
    Check](https://agrinova-ai-service.onrender.com/health).
2.  Wait for the service to respond successfully; a sleeping Render
    service may take time to start.
3.  Confirm the main backend's `AI_SERVICE_URL` is set to
    `https://agrinova-ai-service.onrender.com`.
4.  Open the [AI API
    Documentation](https://agrinova-ai-service.onrender.com/docs) to
    inspect the available endpoints.

### Frontend cannot connect to the backend

-   Verify the frontend API base URL is correct.
-   Confirm the backend is running and reachable.
-   Check that the backend CORS configuration permits the frontend's
    deployed origin.
-   Check browser developer tools and backend logs for the failing
    request.

### Backend cannot connect to MongoDB

-   Verify `MONGODB_URI`.
-   Confirm the database credentials are correct.
-   Check MongoDB Atlas network access settings if using Atlas.

### Local AI service does not start

-   Confirm the Python version is compatible with `requirements.txt`.
-   Activate the correct virtual environment.
-   Reinstall dependencies if necessary.
-   Check that port `8000` is not already in use.
-   Review the terminal output for missing model files or configuration
    errors.

------------------------------------------------------------------------

## License

Add the applicable project license here if the repository has one.
