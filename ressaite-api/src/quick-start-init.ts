import fs from "fs";

import { executeAllMigrations, executeAllSeeds } from "@/umzug";

const sqlite_db_file = process.env.DB_STORAGE;
if (!sqlite_db_file) {
  throw new Error("Please provide a path to the Sqlite database file!");
}

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

// Execute and check migrations
(async () => {
  await executeAllMigrations();
  await executeAllSeeds();
})();
