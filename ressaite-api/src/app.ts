import express from "express";
import cors from "cors";

import InternalErrorMiddleware from "@/core/middlewares/InternalErrorMiddleware";
import MiscRouter from "@/core/routers/MiscRouter";
import AuthRouter from "@/um/routers/AuthRouter";
import UnknownRouteMiddleware from "./core/middlewares/UnknownRouteMiddleware";

const app = express();

// import CookieParser from "cookie-parser";
// import BodyParser from "body-parser";
// app.use(CookieParser());
// app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());

const CORS_WHITELISTED_ORIGIN = process.env.CORS_WHITELISTED_ORIGIN;
if (CORS_WHITELISTED_ORIGIN) {
  app.use(cors({ origin: CORS_WHITELISTED_ORIGIN }));
}

// Load all routes
app.use(MiscRouter);
app.use(AuthRouter);

// Load all middlewares
app.use(InternalErrorMiddleware);
app.all("*", UnknownRouteMiddleware);

export default app;
