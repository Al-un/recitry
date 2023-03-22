import * as esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Define __dirname in ESM mode
 *
 * @see https://stackoverflow.com/a/72462507/4906586
 * @see https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
 */
const dirname = path.dirname(fileURLToPath(import.meta.url));

await esbuild.build({
  // ---------- Config --------------------------------------------------------
  // https://esbuild.github.io/api/#entry-points
  entryPoints: [
    { in: path.join(dirname, "/src/migrator.ts"), out: "migrator" },
    { in: path.join(dirname, "/src/seeder.ts"), out: "seeder" },
  ],
  outdir: path.join(dirname, "/dist"),
  platform: "node",
  bundle: true,
  // Exclude sqlite to ensure @mapbox/node-pre-gyp is not included in this build
  // @see <root>/sqlite.js
  external: ["sqlite"],

  // ---------- Optimization --------------------------------------------------
  minify: true,

  // ---------- Analysis ------------------------------------------------------
  logLevel: "info",
});
