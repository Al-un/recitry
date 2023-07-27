<sub>[Home](../README.md)</sub>

# Database related technical choices <!-- omit in toc -->

- [ORM](#orm)
  - [ORM-001 Sequelize](#orm-001-sequelize)
  - [ORM-002 TypeScript in Sequelize](#orm-002-typescript-in-sequelize)
  - [ORM-003 Dropping Sequelize CLI, using Umzug instead](#orm-003-dropping-sequelize-cli-using-umzug-instead)
- [Databases](#databases)
  - [DB-001 PostgreSQL + Sqlite](#db-001-postgresql--sqlite)
  - [DB-002 `recitry-db/data` folder](#db-002-recitry-dbdata-folder)

## ORM

### ORM-001 Sequelize

Before jumping into the question of ORM, the first question is RDBMS vs NoSQL. Going for RDBMS as I am more comfortable with RDBMS and the data will be pretty much structured. Also, there is no need of NoSQL scalability.

When checking NPM trends ([link](https://npmtrends.com/prisma-vs-sequelize-vs-typeorm)), Sequelize stil outperforms Prisma and TypeORM

### ORM-002 TypeScript in Sequelize

The `recitry-core` package purpose is to align the type definition between the `recitry-api` and `recitry-web` packages so the type definition should be extended to models as well to properly leverage typing.

While using TypeScript seems to be painful, the `sequelize-typescript` package eases the task and will become the standard in Sequelize v7.

### ORM-003 Dropping Sequelize CLI, using Umzug instead

Sequelize CLI is powered by Umzug so it is not a significant technical change. Also, it is easier to manage migrations and seeds in TypeScript with Umzug.

<!-- ---------------------------------------------------------------------- -->

## Databases

### DB-001 PostgreSQL + Sqlite

Just going with what I know: PostgreSQL is here for a while and any knowledge acquired through this project will likely be re-usable.

> :warning: one concern will be the storage cost but that's applicable to all RDBMS

Sqlite is good for local quick start and to be the database for CI testing with in-memory storage. There are surely other in-memory databases but Sqlite seems to be a pretty solid standard.

### DB-002 `recitry-db/data` folder

The [`recitry-db/data`](../../recitry-db/data/) folder is used for

- Sqlite DB files: while it can be anywhere, I prefer to have all project related files in the same location
- Docker storage: if at some point we need to have some Docker image to act as a PostgreSQL database, the storage can live there