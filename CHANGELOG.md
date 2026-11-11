# Changelog

All notable changes to FarmPath / AgriNova are documented in this file.

This project follows a simple versioning convention:

- **Major** (`X.0.0`): significant platform or compatibility changes.
- **Minor** (`1.X.0`): new features or meaningful enhancements.
- **Patch** (`1.0.X`): bug fixes and small improvements.

Dates are intentionally omitted until release dates are confirmed. This changelog describes the repository's documented baseline and should be updated when a release is tagged or deployed.

---

## [1.0.0] — Initial Platform Release

### Added

#### Platform and user experience
- Established the FarmPath smart agriculture and farm-to-market platform.
- Added a Next.js frontend with a responsive application structure.
- Added authentication and role-oriented portal navigation.
- Added English and Bengali interface localization.
- Added role-specific experiences for platform administration, farmers, buyers, suppliers, quality inspectors, logistics, and support workflows.

#### Farmer and farm management
- Added farm and field management.
- Added crop and crop-cycle management workflows, including crop batches and crop logs.
- Added harvest management.
- Added farm expense tracking and profitability views.
- Added crop calendar and agricultural training features.
- Added farmer weather information and alert views.
- Added AI-assisted crop recommendation result and comparison interfaces.

#### Marketplace and farm-to-market workflows
- Added produce browsing, listing details, and saved listings.
- Added agricultural input marketplace browsing.
- Added buyer demand board and demand-posting workflows.
- Added cart, checkout, order tracking, and order detail experiences.
- Added supplier inventory and listing management.
- Added ratings, reviews, and dispute workflows.
- Added payment, wallet, delivery, and escrow-related backend modules.

#### Quality, inspection, and administration
- Added quality verification and inspection workflows.
- Added inspector assignments, schedules, and inspection reports.
- Added administrative user management and farm verification.
- Added administration interfaces for marketplace, orders, payments, logistics, crop catalog, training, advisory, and weather alerts.
- Added platform analytics, reports, audit logs, and dispute-management interfaces.

#### Main platform backend
- Added a Node.js and Express API.
- Added MongoDB persistence through Mongoose models.
- Added JWT-based authentication and role-based authorization middleware.
- Added request validation and centralized error handling.
- Added file-upload integration with Cloudinary and local fallback support.
- Added API documentation through Swagger/OpenAPI.
- Added backend modules for authentication, farms, fields, crops, harvests, marketplace, demands, orders, payments, deliveries, expenses, notifications, quality, training, wallet, and administration.
- Added seed and utility scripts for local development and demonstration data.

#### Agricultural intelligence service
- Added a Python FastAPI AI microservice.
- Added multi-class crop recommendation using the Bangladesh SPAS dataset; the AI service documentation describes coverage of 72 crops and 64 districts.
- Added Bangladesh crop catalog and season-related recommendation support.
- Added BARC-based crop zoning and land-suitability lookup; the AI service documentation describes coverage across 64 districts and 467 upazilas for 16 core crops.
- Added fertilizer guidance based on FRG-2024 nutrient calculations and field-area scaling.
- Added weather forecasts and agricultural alerts using Open-Meteo, with caching and fallback behavior.
- Added model information and health-check endpoints.
- Added Python tests, model training/evaluation scripts, technical documentation, and evaluation reports.

#### Deployment and developer tooling
- Added deployment configuration for the frontend and backend services.
- Added Render configuration for the backend service.
- Added Vercel configuration for the frontend and backend deployment entry point.
- Added environment-variable examples and local development instructions across services.

### Notes

- The repository contains a separate Node.js service under `AgriNova-AI/backend/`. It is an additional AI API and is distinct from the main platform backend in `AgriNova-Server/`.
- The main platform backend communicates with the Python AI microservice through `AI_SERVICE_URL`.
- The AI model's reported evaluation metrics are experimental results and do not guarantee crop suitability, yield, or field outcomes.
- Availability of weather data and other external integrations depends on the relevant third-party services and deployment configuration.
- Features listed here reflect the code and documentation in the baseline repository snapshot. They should not be interpreted as a guarantee that every integration is configured, enabled, or production-certified in every deployment.

---

## Updating this changelog

For each future release:

1. Add a new version section above the previous release.
2. Include the release date in `YYYY-MM-DD` format once confirmed.
3. Group changes under relevant headings such as `Added`, `Changed`, `Fixed`, `Security`, and `Removed`.
4. Describe user-visible and developer-relevant changes clearly.
5. Do not list planned, partially implemented, or unverified functionality as completed.
