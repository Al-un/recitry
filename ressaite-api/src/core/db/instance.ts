import { Sequelize } from "sequelize-typescript";

import { AccessToken } from "@/um/models/AccessToken";
import { User } from "@/um/models/User";

let sequelize: Sequelize;

// ----------------------------------------------------------------------------

const initSequelize = () => {
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

  // https://sequelize.org/docs/v6/getting-started/#logging
  const logging = process.env.DEBUG ? console.log : false;

  //
  if (db_url) {
    console.log("DB_URL provided, other DB_* variables will be ignored");
    sequelize = new Sequelize(db_url, { logging });
  }
  //
  else if (db_dialect === "sqlite") {
    if (!db_storage) {
      throw new Error("Need DB_STORAGE for sqlite");
    }

    console.log(`Sqlite DB initialised at ${db_storage}`);
    sequelize = new Sequelize({
      dialect: db_dialect,
      storage: db_storage,
      logging,
    });
  }
  //
  else {
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
    console.log(`Sqlite DB initialised at ${db_host}:${db_port}`);
    sequelize = new Sequelize({
      dialect: db_dialect,
      username: db_username,
      password: db_password,
      host: db_host,
      port: db_port,
      storage: db_storage,
      logging,
    });
  }

  sequelize.addModels([User, AccessToken]);
};

export const getSequelizeInstance = (): Sequelize => {
  if (sequelize) {
    return sequelize;
  }

  initSequelize();
  return sequelize;
};

// ----------------------------------------------------------------------------

export const connectSequelize = async (sequelizeInstance?: Sequelize) => {
  if (!sequelizeInstance) {
    throw new Error("Cannot connect an undefined Sequelize instance");
  }

  await sequelizeInstance.authenticate();
  console.log("Database check: connection OK");

  // ----
  // Cannot use "sequelize.sync" as when building with esbuild, the models
  // auto-initialisation will be lost. The auto-init was found at
  // https://github.com/sequelize/sequelize-typescript/blob/master/examples/simple/lib/database/sequelize.ts
  // ---
  // await sequelize.sync({ force: false, alter: false });

  console.log("Database check: models sync OK. Loaded:", sequelize.models);
};
