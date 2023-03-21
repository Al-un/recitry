import Express from "express";

const MiscRouter = Express.Router();

// ----------------------------------------------------------------------------

MiscRouter.get("/v1/health", (_, resp) => {
  console.log("HEALTH");
  return resp.status(200).json({ status: "All good!" });
});

// ----------------------------------------------------------------------------

export default MiscRouter;
