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
app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(MiscRouter);
app.use(AuthRouter);

app.use(InternalErrorMiddleware);

app.all("*", UnknownRouteMiddleware);

export default app;
