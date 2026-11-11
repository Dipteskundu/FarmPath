# FarmPath Database Schema

## 1. Overview

This document records the logical data model represented in the FarmPath entity-relationship diagram.

The repository's application backend uses **MongoDB with Mongoose**. The ER diagram is a logical data-model reference; it should not be interpreted as proof that the live application uses a relational database or that the entities below map one-to-one to physical SQL tables or MongoDB collections.

For implementation-level details, refer to the models and database code in `AgriNova-Server/src/`.

## 2. Entity inventory

The ER diagram identifies the following entities:

| Domain | Entities |
|---|---|
| Identity and farm management | `USER`, `FARM`, `FIELD` |
| Crop planning and agricultural knowledge | `CROP`, `CROP_CYCLE`, `CROP_RECOMMENDATION`, `AGRICULTURAL_DATASET`, `FARMING_ACTIVITY` |
| Agricultural inputs | `INPUT_PRODUCT`, `INPUT_ORDER`, `INPUT_ORDER_ITEM`, `SEED` |
| Produce and marketplace | `DEMAND`, `PRODUCE_LISTING`, `PRODUCE_ORDER`, `ORDER_ITEM`, `HARVEST_LOT`, `FARMER_MATCH` |
| Quality assurance | `QUALITY_REQUEST`, `QUALITY_REPORT` |
| Logistics and delivery | `DELIVERY` |
| Finance and records | `EXPENSE`, `INVOICE`, `PAYMENT` |
| Communication | `NOTIFICATION` |

## 3. Domain descriptions

### Identity and farm management

- **USER** — represents a platform user.
- **FARM** — represents a farm associated with platform operations.
- **FIELD** — represents a field or plot within a farm.

### Crop planning and agricultural knowledge

- **CROP** — represents a crop tracked by the platform.
- **CROP_CYCLE** — records a crop's growing cycle.
- **CROP_RECOMMENDATION** — represents a crop recommendation.
- **AGRICULTURAL_DATASET** — represents agricultural reference or dataset information.
- **FARMING_ACTIVITY** — records activities performed during farm operations.

### Agricultural inputs

- **INPUT_PRODUCT** — represents an agricultural input product.
- **INPUT_ORDER** — represents an order for agricultural inputs.
- **INPUT_ORDER_ITEM** — represents an item within an input order.
- **SEED** — represents seed-related records.

### Produce and marketplace

- **DEMAND** — represents demand information for agricultural produce.
- **PRODUCE_LISTING** — represents produce made available through the marketplace.
- **PRODUCE_ORDER** — represents an order for produce.
- **ORDER_ITEM** — represents an item within a produce order.
- **HARVEST_LOT** — represents a harvested produce lot.
- **FARMER_MATCH** — represents a farmer-to-demand or marketplace matching record.

### Quality assurance

- **QUALITY_REQUEST** — represents a request for produce quality assessment.
- **QUALITY_REPORT** — represents the resulting quality report.

### Logistics and delivery

- **DELIVERY** — represents delivery-related records for an order.

### Finance and records

- **EXPENSE** — represents farm or business expenses.
- **INVOICE** — represents billing records.
- **PAYMENT** — represents payment records.

### Communication

- **NOTIFICATION** — represents notifications sent to platform users.

## 4. Relationships and implementation details

The ER diagram is the reference for the model's relationships, cardinalities, and attributes. This Markdown inventory intentionally does not invent column names, field types, primary keys, foreign keys, or relationship cardinalities that are not specified in the available entity list.

For the implemented MongoDB data model, verify the following directly in the backend source:

- Mongoose schema definitions and model names.
- Document references and embedded subdocuments.
- Required fields, validation rules, and defaults.
- Indexes and uniqueness constraints.
- Middleware, hooks, and model-level business rules.

## 5. Source locations

| Resource | Location |
|---|---|
| Backend database implementation | `AgriNova-Server/src/database/` |
| Application seed implementation | `AgriNova-Server/src/database/seed/` |
| Logical ER diagram | Project database design documentation |

## 6. Important note

This file documents the logical entities shown in the ER diagram. It is not a generated database migration, SQL DDL script, or a guarantee of the exact current MongoDB collection structure. Keep this document aligned with the actual Mongoose models as the application evolves.
