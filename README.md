# Learning-Portfolio

# Running the DB

`docker compose up`

# Code changes

`docker compose up --build`

## Tech Stack

- postgres
- Kysely
- Express.js
- TypeScript

## Ports

- Express: 3030
- DB: 5432 (within Docker)

#### Migrations

`npx kysely migrate:make <migration_name>`

### Testing Server Connection

`curl http://localhost:3030`
