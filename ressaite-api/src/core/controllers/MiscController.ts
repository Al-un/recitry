import { RequestHandler } from "express";

export const healthCheck: RequestHandler = (_, resp) => {
  console.log("HEALTH");
  return resp.status(200).json({ status: "All good!" });
};
