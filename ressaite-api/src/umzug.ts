import { Umzug, SequelizeStorage } from "umzug";

import { sequelize } from "@/core/db/instance";

// https://github.com/sequelize/umzug/blob/main/examples/1.sequelize-typescript/migrate.js

export const umzugMigrator = new Umzug({
  migrations: {
    glob: ["core/db/migrations/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: process.env.DEBUG ? console : undefined,
});

export type Migration = typeof umzugMigrator._types.migration;

export const umzugSeeder = new Umzug({
  migrations: {
    glob: ["core/db/seeders/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "seeder_meta",
  }),
  logger: process.env.DEBUG ? console : undefined,
});

export type Seeder = typeof umzugSeeder._types.migration;
