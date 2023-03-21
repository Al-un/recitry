import { ErrorRequestHandler } from "express";

const InternalErrorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error) {
    console.warn("Internal server error:", error);
    res.status(500).send({
      message: "An unknown error happened, sorry about that",
      error: error,
    });
  } else {
    next();
  }
};

export default InternalErrorMiddleware;
