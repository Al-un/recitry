import { RootHookObject } from "mocha";

import { initSequelize, sequelize } from "@/core/db/instance";
import { umzugMigrator, umzugSeeder } from "@/umzug";

export const mochaHooks: RootHookObject = {
  async beforeAll() {
    // Execute and check migrations
    await umzugMigrator.up();
    const migrations = await umzugMigrator.executed();
    const migNames = migrations.map((m) => m.name);
    console.log("Executed migrations:", migNames);

    try {
      await initSequelize(sequelize);
    } catch (err) {
      console.error("Database check: connection error", err);
    }

    // Execute and check seeds
    await umzugSeeder.up();
    const seeds = await umzugSeeder.executed();
    const seedNames = seeds.map((s) => s.name);
    console.log("Executed seeds:", seedNames);
  },
};
