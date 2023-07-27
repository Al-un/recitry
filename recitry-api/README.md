# Recitry API <!-- omit in toc -->

- [Dependencies](#dependencies)
  - [Runtime](#runtime)
  - [Database](#database)
  - [REST](#rest)
  - [Testing](#testing)
  - [Others](#others)

This is the back-end of Recitry. Technical stack is:

- PostgreSQL database or Sqlite
- ExpressJS, Passport
- Mocha, Chai, Supertest for testing

## Dependencies

### Runtime

- [`ts-node`](https://github.com/TypeStrong/ts-node) well... TypeScript?
- [`tsconfig-paths`](https://github.com/dividab/tsconfig-paths) to resolve paths aliases (see [StackOverflow answer](ttps://stackoverflow.com/a/73935402/4906586))
- [`esbuild`](https://github.com/evanw/esbuild) build stuff...fast
- [`esbuild-register`](https://github.com/egoist/esbuild-register) to run TypeScript stuff without building
- [`nodemon`](https://github.com/remy/nodemon) Hot reloading FTW

### Database

- [`sequelize`](https://github.com/sequelize/sequelize): the ORM
  - [`sequelize-typescript`](https://github.com/sequelize/sequelize-typescript): TypeScript adapter recommended by the [documentation](https://sequelize.org/docs/v6/other-topics/typescript). Code will be merged in Sequelize v7
    - [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) is required by `sequelize-typescript` (see README)
  - [`pg`](https://www.npmjs.com/package/pg) is required for PostgreSQL ([documentation](https://sequelize.org/releases/#postgresql-support-table))
  - [`pg-hstore`](https://www.npmjs.com/package/pg-hstore) is required per [Sequelize documentation](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/#postgresql)
  - [`sqlite3`](https://www.npmjs.com/package/sqlite3) is required for Sqlite ([documentation](https://sequelize.org/releases/#sqlite-support-table))
- [`umzug`](https://github.com/sequelize/umzug) replace Sequelize CLI for migration

### REST

- [`express`](https://github.com/expressjs/express)
  - [`cors`](https://github.com/expressjs/cors)
- [`passport`](https://github.com/jaredhanson/passport) _Non intrusive_ authentication related middleware
  - [`passport-http-bearer`](https://github.com/jaredhanson/passport-http-bearer) to protect endpoints with Bearer token
  - [`passport-local`](https://github.com/jaredhanson/passport-local) to handle authentication against a local database
- [`bcrypt`](https://github.com/kelektiv/node.bcrypt.js) to hash password
  - > Causes some issues due to `@mapbox/node-pre-gyp` dependencies

### Testing

- [`mocha`](https://github.com/mochajs/mocha) Test runner
- [`chai`](https://github.com/chaijs/chai) Assertion framework
- [`supertest`](https://github.com/ladjs/supertest) Testing HTTP request

### Others

`@mapbox/node-pre-gyp` uses some devDependencies in their code (see [#661](https://github.com/mapbox/node-pre-gyp/issues/661)) which requires to have the following devDependencies installed:

- `aws-sdk`
- `mock-aws-s3`
- `nock`
