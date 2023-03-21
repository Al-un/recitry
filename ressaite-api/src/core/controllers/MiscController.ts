import { RequestHandler } from "express";

export const healthCheck: RequestHandler = (_, resp) => {
  return resp.status(200).json({ status: "All good!" });
};
