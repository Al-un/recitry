# Ressaite API <!-- omit in toc -->

- [Getting started](#getting-started)
- [Dependencies](#dependencies)
  - [Runtime](#runtime)
  - [Database](#database)
  - [REST](#rest)
  - [Testing](#testing)
  - [Others](#others)

This is the back-end of Ressaite

Technical stack is:

- PostgreSQL database or Sqlite for testing
- ExpressJS
- Mocha, Chai, Supertest for testing

## Getting started

- Install [PostgreSQL](https://www.postgresql.org/)
- ```sh
  DB_DIALECT=postgres DB_HOST=127.0.0.1 DB_PORT=5432 DB_USERNAME=ressaite DB_PASSWORD=ressaite DB_NAME=ressaite node migrator.js up
  ```

## Dependencies

### Runtime

- `ts-node`
- `tsconfig-paths`
- `esbuild`
- `esbuild-register`
- `nodemon`

### Database

- [`sequelize`](https://github.com/sequelize/sequelize): the ORM
  - [`sequelize-typescript`](https://github.com/sequelize/sequelize-typescript): TypeScript adapter recommended by the [documentation](https://sequelize.org/docs/v6/other-topics/typescript). Code will be merged in Sequelize v7
    - [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) is required by `sequelize-typescript` (see README)
  - [`pg`](https://www.npmjs.com/package/pg) is required for PostgreSQL ([documentation](https://sequelize.org/releases/#postgresql-support-table))
  - `pg-hstore` --> ??
  - [`sqlite3`](https://www.npmjs.com/package/sqlite3) is required for Sqlite ([documentation](https://sequelize.org/releases/#sqlite-support-table))
- [`umzug`](https://github.com/sequelize/umzug) replace Sequelize CLI for migration

### REST

- `express`
  - `cors`
- `passport`
  - `passport-http-bearer`
  - `passport-local`
- `bcrypt`

### Testing

- `mocha`
- `chai`
- `supertest`

### Others

`@mapbox/node-pre-gyp` uses some devDependencies in their code (see [#661](https://github.com/mapbox/node-pre-gyp/issues/661)) which requires to have the following devDependencies installed:

- `aws-sdk`
- `mock-aws-s3`
- `nock`
