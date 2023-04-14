import { Umzug, SequelizeStorage, MigrateUpOptions } from "umzug";

import { getSequelizeInstance } from "@/core/db/instance";

const sequelize = getSequelizeInstance();

// ----------------------------------------------------------------------------

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

export type Migrator = typeof umzugMigrator;
export type Migration = typeof umzugMigrator._types.migration;

export const executeAllMigrations = async (
  migrator?: Migrator,
  options?: MigrateUpOptions
) => {
  const migratorInstance = migrator || umzugMigrator;

  await migratorInstance.up(options);
  const migrations = await migratorInstance.executed();
  const migNames = migrations.map((m) => m.name);

  console.log("Executed migrations:", migNames);
};

// ----------------------------------------------------------------------------

export const umzugSeeder = new Umzug({
  migrations: {
    glob: ["core/db/seeders/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    // modelName: "seeder_meta",
  }),
  logger: process.env.DEBUG ? console : undefined,
});

export type Seeder = typeof umzugSeeder;
export type Seed = typeof umzugSeeder._types.migration;

export const executeAllSeeds = async (
  seeder?: Seeder,
  options?: MigrateUpOptions
): Promise<void> => {
  const seederInstance = seeder || umzugSeeder;

  await seederInstance.up(options);
  const seeds = await seederInstance.executed();
  const seedNames = seeds.map((s) => s.name);

  console.log("Executed seeds:", seedNames);
};
