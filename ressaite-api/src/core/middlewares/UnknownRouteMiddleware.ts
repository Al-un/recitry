import { RstErrorResp } from "@al-un/ressaite-core/core/models/api";
import { RequestHandler } from "express";

/**
 * 404 unknown routes with JSON format only
 *
 * @see https://stackoverflow.com/a/16637468/4906586
 */
const UnknownRouteMiddleware: RequestHandler = (req, res) => {
  const path = req.path;
  const notFoundError: RstErrorResp = {
    message: `${path} not found`,
  };
  res.status(404).json(notFoundError);
};

export default UnknownRouteMiddleware;
