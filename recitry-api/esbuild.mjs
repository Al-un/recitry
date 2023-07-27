import * as esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";

/**
 * Define __dirname in ESM mode
 *
 * @see https://stackoverflow.com/a/72462507/4906586
 * @see https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
 */
const dirname = path.dirname(fileURLToPath(import.meta.url));

const build = await esbuild.build({
  // ---------- Config --------------------------------------------------------
  // https://esbuild.github.io/api/#entry-points
  entryPoints: [{ in: path.join(dirname, "/src/index.ts"), out: "index" }],
  outdir: path.join(dirname, "/dist"),
  platform: "node",
  bundle: true,
  // Exclude dependencies that rely on @mapbox/node-pre-gyp
  external: ["bcrypt"],

  // ---------- Optimization --------------------------------------------------
  minify: true,
  treeShaking: true, // https://esbuild.github.io/api/#tree-shaking

  // ---------- Analysis ------------------------------------------------------
  logLevel: "info",
  color: true,
  metafile: true,
});

// https://esbuild.github.io/api/#metafile
fs.writeFileSync("dist/esbuild-metafile.json", JSON.stringify(build.metafile));
