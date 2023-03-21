import express from "express";

import { catchAllErrorMiddleware } from "@/core/middlewares/ErrorMiddleware";
import AuthRouter from "@/um/routers/AuthRouter";
import AuthMiddleware from "@/um/middlewares/AuthMiddleware";

const app = express();

// import CookieParser from "cookie-parser";
// import BodyParser from "body-parser";
// app.use(CookieParser());
// app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/helloworld", (req, res) => {
  res.send("helloworld\n");
});

app.use(AuthRouter);

app.get("/pouet", AuthMiddleware, function (req, res) {
  res.send("YAYY\n");
});

app.use(catchAllErrorMiddleware);

export default app;
