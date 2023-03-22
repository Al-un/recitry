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
  entryPoints: [{ in: path.join(dirname, "/src/index.ts"), out: "index" }],
  outdir: path.join(dirname, "/dist"),
  // If custom tsconfig will later be required
  tsconfig: "tsconfig.json",
  platform: "node",
  // Bundling also enables:
  //    - tree shaking: https://esbuild.github.io/api/#tree-shaking
  bundle: true,
  external: ["mock-aws-s3", "aws-sdk", "nock"],
  // ---------- Optimization --------------------------------------------------
  minify: true,
});
