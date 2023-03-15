# Ressaite API

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