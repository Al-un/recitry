import { RootHookObject } from "mocha";

import { connectSequelize, getSequelizeInstance } from "@/core/db/instance";
import { executeAllMigrations, executeAllSeeds } from "@/umzug";

export const mochaHooks: RootHookObject = {
  async beforeAll() {
    // Execute and check migrations
    await executeAllMigrations();
    await executeAllSeeds();

    try {
      await connectSequelize(getSequelizeInstance());
    } catch (err) {
      console.error("Database check: connection error", err);
    }
  },
};
