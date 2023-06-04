import express from "express";
import cors from "cors";

import InternalErrorMiddleware from "@/core/middlewares/InternalErrorMiddleware";
import MiscRouter from "@/core/routers/MiscRouter";
import AuthRouter from "@/um/routers/AuthRouter";
import InventoryRouter from "@/inventory/Inventory.router";
import MaterialRouter from "@/recipe/Material.router";
import UnknownRouteMiddleware from "./core/middlewares/UnknownRouteMiddleware";

const app = express();

// import CookieParser from "cookie-parser";
// import BodyParser from "body-parser";
// app.use(CookieParser());
// app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());

const CORS_WHITELISTED_ORIGIN = process.env.CORS_WHITELISTED_ORIGIN;
if (CORS_WHITELISTED_ORIGIN) {
  /** @see https://github.com/expressjs/cors#configuration-options */
  const corsOriginsAsArray = CORS_WHITELISTED_ORIGIN.split(",").map(
    (pattern) => {
      if (pattern.startsWith("/") && pattern.endsWith("/")) {
        return new RegExp(pattern.substring(1, pattern.length - 1));
      }

      return pattern;
    }
  );
  app.use(cors({ origin: corsOriginsAsArray }));
  console.log("CORS enabled for domains:", corsOriginsAsArray);
} else {
  console.log("CORS not enabled");
}

// Load all routes
app.use(MiscRouter);
app.use(AuthRouter);
app.use(InventoryRouter);
app.use(MaterialRouter);

// Load all middlewares
app.use(InternalErrorMiddleware);
app.all("*", UnknownRouteMiddleware);

export default app;
