import express, { RequestHandler } from "express";

import { RstErrorResp } from "@al-un/ressaite-core/core/models/api";
import { catchAllErrorMiddleware } from "@/core/middlewares/ErrorMiddleware";
import MiscRouter from "@/core/routers/MiscRouter";
import AuthRouter from "@/um/routers/AuthRouter";

const app = express();

// import CookieParser from "cookie-parser";
// import BodyParser from "body-parser";
// app.use(CookieParser());
// app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(MiscRouter);
app.use(AuthRouter);

app.use(catchAllErrorMiddleware);

/** To refactor into a middleware even if used once? */
const catchAll: RequestHandler = (req, res) => {
  const path = req.path;
  const notFoundError: RstErrorResp = {
    message: `${path} not found`,
  };
  res.status(404).json(notFoundError);
};
app.all("*", catchAll);

export default app;
