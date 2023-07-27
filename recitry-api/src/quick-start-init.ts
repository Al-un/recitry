import fs from "fs";
import path from "path";

/**
 * Create local dotenv file or override it by deleting the existing
 * file if it already exists
 */
const writeDotEnv = (folderName: string, vars: string[]): string => {
  const folderRoot = path.resolve(__dirname, `./../../${folderName}`);
  const quickStartEnv = path.join(folderRoot, ".env.quick-start.local");
  if (fs.existsSync(quickStartEnv)) {
    fs.unlinkSync(quickStartEnv);
    console.log(`Deleted file ${quickStartEnv}`);
  }

  const data = new Uint8Array(Buffer.from(vars.join("\n")));

  fs.writeFileSync(quickStartEnv, data, { encoding: "utf-8" });
  console.log(`Wrote in file ${quickStartEnv}`, vars);

  return quickStartEnv;
};

const apiDotEnvFile = writeDotEnv("recitry-api", [
  'DB_DIALECT: "sqlite"',
  'DB_STORAGE: "../recitry-db/data/quick.db"',
  "PORT:8000",
  'CORS_WHITELISTED_ORIGIN: "http://localhost:3000"',
]);
writeDotEnv("recitry-web", ['VITE_API_BASE_URL: "http://localhost:8000"']);

// ----------------------------------------------------------------------------

// https://github.com/motdotla/dotenv#%EF%B8%8F-usage
import * as DotEnv from "dotenv";
const config = DotEnv.config({
  path: apiDotEnvFile,
});
console.log("Loaded dotenv config:", config);

// ----------------------------------------------------------------------------
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
