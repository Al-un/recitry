const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

/**
 * Create a local Sqlite DB for fast development. Not bundling with esbuild 
 * as sqlite depends on @mapbox/node-pre-gyp which causes a lot of troubles
 * as reported on https://github.com/mapbox/node-pre-gyp/issues/308.
 *
 * @see https://github.com/kriasoft/node-sqlite#without-caching
 */
const createSqliteDb = () => {
  const db_storage = process.env.DB_STORAGE;
  if (!db_storage) {
    throw new Error("Need DB_STORAGE for sqlite");
  }

  open({
    filename: db_storage,
    driver: sqlite3.Database,
  });
};

// IIFE-style
createSqliteDb();
