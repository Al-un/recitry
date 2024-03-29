# Recitry <!-- omit in toc -->

- [Getting started](#getting-started)
  - [Quick start (`recitry-api` + `recitry-web`)](#quick-start-recitry-api--recitry-web)
  - [Start with Sqlite (`recitry-api`)](#start-with-sqlite-recitry-api)
  - [Start with PostgreSQL (`recitry-api`)](#start-with-postgresql-recitry-api)
  - [Start (`recitry-web`)](#start-recitry-web)
- [Environment variables](#environment-variables)
  - [Recitry API](#recitry-api)
  - [Recitry Web](#recitry-web)

## Getting started

**Pre-requisites**:

- Node 18+
- NPM v7+, to support workspaces
- PostgreSQL 11+ (to get ready for Sequelize v7) if PostgreSQL is used for the database.

**Preparation**

- Clone this repository
  ```sh
  git clone https://github.com/Al-un/recitry.git && cd recitry
  ```
- Install the dependencies, monorepo-style (dont' forget the monorepo root!!)
  ```sh
  npm install --workspaces --include-workspace-root
  ```

### Quick start (`recitry-api` + `recitry-web`)

To avoid the long step of install PostgreSQL and setting this up, it is possible to run `recitry-api` against a Sqlite instance. By default, the quick start will create a file in [`recitry-db/data`](../recitry-db/data/)

```sh
# Prepare various stuff in each package
npm run setup:quick-start

# Go!
npm run dev:all:quick-start
```

The front-end will be available in [`http://localhost:3000/`](http://localhost:3000/) and back-end runs at [`http://localhost:8000/`](http://localhost:8000/). A downside of this quick start is that no log will be available in the terminal. To visualise the logs, the back-end and the front-end must run separately.

### Start with Sqlite (`recitry-api`)

Setup the Sqlite database:

```sh
# Replace the database name and path with what you want

# Create an empty file to host the data
touch recitry-db/data/mydatabase.db

# Migrate the database tables and seed the first data
# Remove DEBUG=true to hide the logs
DB_DIALECT=sqlite DB_STORAGE=../recitry-db/data/mydatabase.db DEBUG=true npm run db:migrate --workspace @al-un/recitry-api
DB_DIALECT=sqlite DB_STORAGE=../recitry-db/data/mydatabase.db DEBUG=true npm run db:seed --workspace @al-un/recitry-api
```

<sub>There is a `../` in the path because the `--workspace` will make the command running in the context of the declared package.</sub>

The Sqlite database is ready to be used:

```sh
DB_DIALECT=sqlite DB_STORAGE=../recitry-db/data/mydatabase.db \
CORS_WHITELISTED_ORIGIN="http://localhost:3000" PORT=8000 \
npm run dev:api
```

### Start with PostgreSQL (`recitry-api`)

Prepare the PostgreSQL database:

- Install the PostgreSQL database
- Create a PostgreSQL user, and ensure that users can log in programmatically
  - Documentation TODO

Execute the migrations and seeds:

- PostgreSQL can be accessed in two ways:
  - With a single `DB_URL`. `DB_DIALECT` is not required with `DB_URL`
  - With `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST` and `DB_PORT`. `DB_DIALECT` must be `postgres` with these parameters.

```sh
# ----- Prepare variables for less verbosity. Or use them in-line -----

# With DB_URL
export DB_URL=<...>
# Or with each parameter
export DB_DIALECT=postgres
export DB_USERNAME=<...>
export DB_PASSWORD=<...>
export DB_NAME=<...>
export DB_HOST=<...>
export DB_PORT=<...>

# If debugging is required
EXPORT DEBUG=true

# ----- Migrate and seed -----
npm run db:migrate --workspace @al-un/recitry-api
npm run db:seed --workspace @al-un/recitry-api

# ----- Start -----
# If the terminal context is the root of the monorepo
CORS_WHITELISTED_ORIGIN="http://localhost:3000" PORT=8000 npm run dev:api
# Workspace argument can be skipped in already in the right location
cd recitry-api
CORS_WHITELISTED_ORIGIN="http://localhost:3000" PORT=8000 npm run dev
```

### Start (`recitry-web`)

Ensure that the front-end is reaching the back-end at the right port with `VITE_API_BASE_URL`. Apart from that, there is no specific preparation step required to launch the front-end:

```sh
# ----- Start -----
# If the terminal context is the root of the monorepo
VITE_API_BASE_URL="http://localhost:8000" npm run dev:web
# Workspace argument can be skipped in already in the right location
cd recitry-web
VITE_API_BASE_URL="http://localhost:8000" npm run dev
```

## Environment variables

### Recitry API

- `DEBUG`: moar logs. Prints logs for Sequelize and Umzug
  - No default values
  - Sources:
    - [`core/db/instance.ts`](../recitry-api/src/core/db/instance.ts)
    - [`umzug.ts`](../recitry-api/src/umzug.ts)

**Database**

- `DB_URL`: Provide the database access to Sequelize. When provided, other database related environment variables are ignored, including `DB_DIALECT`
  - No default value
  - Source: [`core/db/instance.ts`](../recitry-api/src/core/db/instance.ts)
- `DB_DIALECT`: The database dialect required to initialise Sequelize ([Sequelize Getting Started](https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database))
  - No default value
  - Source: [`core/db/instance.ts`](../recitry-api/src/core/db/instance.ts)
- `DB_USERNAME`: Database user name
  - No default value, required if `DB_DIALECT` is defined and not `sqlite`
  - Source: [`core/db/instance.ts`](../recitry-api/src/core/db/instance.ts)
- `DB_PASSWORD`: Database user password
  - No default value, required if `DB_DIALECT` is defined and not `sqlite`
  - Source: [`core/db/instance.ts`](../recitry-api/src/core/db/instance.ts)
- `DB_NAME`: Database name
  - No default value, required if `DB_DIALECT` is defined and not `sqlite`
  - Source: [`core/db/instance.ts`](../recitry-api/src/core/db/instance.ts)
- `DB_HOST`: Database host address
  - No default value, required if `DB_DIALECT` is defined and not `sqlite`
  - Source: [`core/db/instance.ts`](../recitry-api/src/core/db/instance.ts)
- `DB_PORT`:
  - Default value is `5432` if `DB_DIALECT` is `postgres`
  - Source: [`core/db/instance.ts`](../recitry-api/src/core/db/instance.ts)

**REST**

- `PORT`
  - Default value is `8000`
  - Source: [`index.ts`](../recitry-api/src/index.ts)
- `CORS_WHITELISTED_ORIGIN`
  - No default value. However, if this is not defined, CORS is not enabled
  - Source: [`app.ts](../recitry-api/src/app.ts)

### Recitry Web

- `VITE_API_BASE_URL`: the base URL of the corresponding API
  - No default value, required env var
  - Source: [`api/index.ts`](../recitry-web/src/api/index.ts)
