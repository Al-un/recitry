# Ressaite <!-- omit in toc -->

- [Getting started](#getting-started)
  - [Quick start (`ressaite-api` + `ressaite-web`)](#quick-start-ressaite-api--ressaite-web)
  - [Start with Sqlite (`ressaite-api`)](#start-with-sqlite-ressaite-api)
  - [Start with PostgreSQL (`ressaite-api`)](#start-with-postgresql-ressaite-api)
  - [Start (`ressaite-web`)](#start-ressaite-web)

## Getting started

**Pre-requisites**:

- Node 18+
- NPM v7+, to support workspaces
- PostgreSQL 11+ (to get ready for Sequelize v7) if PostgreSQL is used for the database.

**Preparation**

- Clone this repository
  ```sh
  git clone https://github.com/Al-un/ressaite.git && cd ressaite
  ```
- Install the dependencies, monorepo-style (dont' forget the monorepo root!!)
  ```sh
  npm install --workspaces --include-workspace-root
  ```

### Quick start (`ressaite-api` + `ressaite-web`)

To avoid the long step of install PostgreSQL and setting this up, it is possible to run `ressaite-api` against a Sqlite instance. By default, the quick start will create a file in [`ressaite-db/data`](../ressaite-db/data/)

```sh
# Prepare various stuff in each package
npm run setup:quick-start

# Go!
npm run dev:quick-start
```

The front-end will be available in [`http://localhost:3000/`](http://localhost:3000/) and back-end runs at [`http://localhost:8000/`](http://localhost:8000/). A downside of this quick start is that no log will be available in the terminal. To visualise the logs, the back-end and the front-end must run separately.

### Start with Sqlite (`ressaite-api`)

Setup the Sqlite database:

```sh
# Replace the database name and path with what you want

# Create an empty file to host the data
touch ressaite-db/data/mydatabase.db

# Migrate the database tables and seed the first data
# Remove DEBUG=true to hide the logs
DB_DIALECT=sqlite DB_STORAGE=../ressaite-db/data/mydatabase.db DEBUG=true npm run db:migrate --workspace @al-un/ressaite-api
DB_DIALECT=sqlite DB_STORAGE=../ressaite-db/data/mydatabase.db DEBUG=true npm run db:seed --workspace @al-un/ressaite-api
```

<sub>There is a `../` in the path because the `--workspace` will make the command running in the context of the declared package.</sub>

The Sqlite database is ready to be used:

```sh
DB_DIALECT=sqlite DB_STORAGE=../ressaite-db/data/mydatabase.db PORT=8000 npm run dev --workspace @al-un/ressaite-api
```

### Start with PostgreSQL (`ressaite-api`)

Prepare the PostgreSQL database:

- Install the PostgreSQL database
- Create a PostgreSQL user, and ensure that users can log in programmatically
  - Documentation TODO

Execute the migrations and seeds:

- PostgreSQL can be accessed in two ways:
  - With a single `DB_URL`
  - With `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST` and `DB_PORT`
- `DB_DIALECT` must be `postgres`

```sh
# ----- Prepare variables for less verbosity. Or use them in-line -----
export DB_DIALECT=postgres

# With DB_URL
export DB_URL=<...>
# Or with each parameter
export DB_USERNAME=<...>
export DB_PASSWORD=<...>
export DB_NAME=<...>
export DB_HOST=<...>
export DB_PORT=<...>

# If debugging is required
EXPORT DEBUG=

# ----- Migrate and seed -----
npm run db:migrate --workspace @al-un/ressaite-api
npm run db:seed --workspace @al-un/ressaite-api

# ----- Start -----
# If the terminal context is the root of the monorepo
npm run dev --workspace @al-un/ressaite-api
# Workspace argument can be skipped in already in the right location
cd ressaite-api
npm run dev
```

### Start (`ressaite-web`)

Ensure that the front-end is reaching the back-end at the right port. Apart from that, there is no specific preparation step required to launch the front-end:

```sh
# ----- Start -----
# If the terminal context is the root of the monorepo
npm run dev --workspace @al-un/ressaite-web
# Workspace argument can be skipped in already in the right location
cd ressaite-web
npm run dev
```