import { Umzug, SequelizeStorage, MigrateUpOptions } from "umzug";

import { Sequelize } from "sequelize";
import { getSequelizeInstance } from "./core/db/instance";

// ----------------------------------------------------------------------------

// https://github.com/sequelize/umzug/blob/main/examples/1.sequelize-typescript/migrate.js

export const getUmzugMigrator = (sequelize?: Sequelize) => {
  let sequelizeInstance = sequelize || getSequelizeInstance();

  return new Umzug({
    migrations: {
      glob: ["core/db/migrations/*.ts", { cwd: __dirname }],
    },
    context: sequelizeInstance,
    storage: new SequelizeStorage({
      sequelize: sequelizeInstance,
    }),
    logger: process.env.DEBUG ? console : undefined,
  });
};

export type Migrator = ReturnType<typeof getUmzugMigrator>;
export type Migration = Migrator["_types"]["migration"];

export const executeAllMigrations = async (
  migrator?: Migrator,
  options?: MigrateUpOptions
) => {
  const migratorInstance = migrator || getUmzugMigrator();

  await migratorInstance.up(options);
  const migrations = await migratorInstance.executed();
  const migNames = migrations.map((m) => m.name);

  console.log("Executed migrations:", migNames);
};

// ----------------------------------------------------------------------------

export const getUmzugSeeder = (sequelize?: Sequelize) => {
  let sequelizeInstance = sequelize || getSequelizeInstance();

  return new Umzug({
    migrations: {
      glob: ["core/db/seeders/*.ts", { cwd: __dirname }],
    },
    context: sequelizeInstance,
    storage: new SequelizeStorage({
      sequelize: sequelizeInstance,
      // modelName: "seeder_meta",
    }),
    logger: process.env.DEBUG ? console : undefined,
  });
};

export type Seeder = ReturnType<typeof getUmzugSeeder>;
export type Seed = Seeder["_types"]["migration"];

export const executeAllSeeds = async (
  seeder?: Seeder,
  options?: MigrateUpOptions
): Promise<void> => {
  const seederInstance = seeder || getUmzugSeeder();

  await seederInstance.up(options);
  const seeds = await seederInstance.executed();
  const seedNames = seeds.map((s) => s.name);

  console.log("Executed seeds:", seedNames);
};
