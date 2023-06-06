import { randomUUID } from "crypto";
import { RequestHandler } from "express";

const LoggerMiddleware: RequestHandler = (req, res, next) => {
  const reqId = randomUUID();
  res.locals.requestId = reqId;

  console.log(`${reqId}: reaching ${req.path}`);
  next();
  console.log(`${reqId}: end`);
};

export default LoggerMiddleware;
