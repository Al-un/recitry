import path from "path";
import { Sequelize } from "sequelize-typescript";

const db_url = process.env.DB_URL;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_database = process.env.DB_NAME;
const db_host = process.env.DB_HOST;
let db_port = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT, 10)
  : undefined;
const db_dialect = process.env.DB_DIALECT;
const db_storage = process.env.DB_STORAGE;

export let sequelize: Sequelize;
// https://sequelize.org/docs/v6/getting-started/#logging
const logging = process.env.DEBUG ? console.log : false;
// https://github.com/sequelize/sequelize-typescript/blob/master/examples/simple/lib/database/sequelize.ts
const models = [path.join(__dirname, "../../um/models/**/*.*")];

if (db_url) {
  console.debug("DB_URL provided, other DB_* variables will be ignored");
  sequelize = new Sequelize(db_url, { logging, models });
} else if (db_dialect === "sqlite") {
  if (!db_storage) {
    throw new Error("Need DB_STORAGE for sqlite");
  }

  sequelize = new Sequelize({
    dialect: db_dialect,
    storage: db_storage,
    logging,
    models,
  });
} else {
  if (db_dialect !== "postgres") {
    throw new Error("Please use a PostgreSQL DB");
  }

  if (!db_username || !db_password || !db_database || !db_host) {
    throw new Error("Incorrect PostgreSQL config!");
  }

  if (!db_port) {
    db_port = 5432;
    console.log("Using 5432 as default port");
  }

  sequelize = new Sequelize({
    dialect: db_dialect,
    username: db_username,
    password: db_password,
    host: db_host,
    port: db_port,
    storage: db_storage,
    logging,
    models,
  });
}

export const initSequelize = async (sequelize: Sequelize) => {
  await sequelize.authenticate();
  console.log("Database check: connection OK");

  await sequelize.sync({ force: false, alter: false });
  console.log("Database check: models sync OK");
};
