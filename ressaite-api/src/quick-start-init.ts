import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import sqlite from "sqlite";

// const dirname = path.dirname(fileURLToPath(import.meta.url));
const dirname = __dirname

const sqlite_db_file = process.env.DB_STORAGE || path.join(dirname, "../ressaite-db/data/ploup.db");

// process.env.DB_DIALECT = "sqlite";
// process.env.DB_STORAGE = sqlite_db_file;

if (fs.existsSync(sqlite_db_file)) {
  try {
    fs.unlinkSync(sqlite_db_file);
    console.log("Deleted DB file:", sqlite_db_file);
  } catch (error) {
    console.error(error);
  }
} else {
  console.log("DB file does not exist:", sqlite_db_file);
}

// /**
//  * Create a local Sqlite DB for fast development. Not bundling with esbuild
//  * as sqlite depends on @mapbox/node-pre-gyp which causes a lot of troubles
//  * as reported on https://github.com/mapbox/node-pre-gyp/issues/308.
//  *
//  * @see https://github.com/kriasoft/node-sqlite#without-caching
//  */
// const createSqliteDb = () => {
//   sqlite.open({
//     filename: sqlite_db_file,
//     driver: sqlite3.Database,
//   });
// };
// createSqliteDb();

import { initSequelize, sequelize } from "@/core/db/instance";
import { umzugMigrator, umzugSeeder } from "@/umzug";

// Execute and check migrations
(async () => {
  process.env.DB_DIALECT = "sqlite";
  process.env.DB_STORAGE = sqlite_db_file;

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
})();
