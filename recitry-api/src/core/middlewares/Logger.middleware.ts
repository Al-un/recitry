import { randomUUID } from "crypto";
import { RequestHandler } from "express";

const LoggerMiddleware: RequestHandler = (req, res, next) => {
  const reqId = randomUUID();
  res.locals.requestId = reqId;

  let startLog = `${reqId}: start ${req.method} ${req.path}`;
  if (req.query) {
    startLog += ` with query ${JSON.stringify(req.query)}`;
  }
  console.log(startLog);

  next();

  console.log(`${reqId}: end`);
};

export default LoggerMiddleware;
