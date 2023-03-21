import { ErrorRequestHandler } from "express";

export const catchAllErrorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error) {
    res.status(500).send({
      message: "An unknown error happened, sorry about that",
      error: error,
    });
  } else {
    next();
  }
};
