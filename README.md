# Ressaite

## Getting started

**Pre-requisites**:

- Node 18+
- NPM v7+
  - To support workspaces

**Preparation**

- Clone this repository
  ```sh
  git clone https://github.com/Al-un/ressaite.git
  cd ressaite
  ```
- Install the dependencies
  ```sh
  npm install --workspaces --include-workspace-root
  ```

### Database setup

- Option 1: Install PostgreSQL
- Option 2: Fast forward version with SQLite

### Sqlite

```sh
cd ressaite-api

# Create the database
DB_STORAGE="path to Sqlite DB file" npm run db:sqlite:init

# Execute the DB migrations
DB_STORAGE="path to Sqlite DB file" DB_DIALECT=sqlite npm run db:migrate
# Add "DEBUG=true" to display the logs
DB_STORAGE="path to Sqlite DB file" DB_DIALECT=sqlite DEBUG=true npm run db:migrate

# Seeds the initial data
DB_STORAGE="path to Sqlite DB file" DB_DIALECT=sqlite npm run db:seed
```

- Feel free to locate the Sqlite DB file wherever you want. [`ressaite-db`](./ressaite-db) has a `data` folder whose content is git-ignored.
