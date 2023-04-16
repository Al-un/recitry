import { RequestHandler } from "express";

import { MiscEndpointTypes } from "@al-un/ressaite-core/core/api/misc";
import { ExpressController } from "../express";

// ----------------------------------------------------------------------------

type MiscControllerTypes = ExpressController<MiscEndpointTypes>;

// ----------------------------------------------------------------------------

export const healthCheck: MiscControllerTypes["health"] = (_, resp) => {
  return resp.status(200).json({ status: "All good!" });
};
