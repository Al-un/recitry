import { MiscEndpointTypes } from "@al-un/ressaite-core/core/misc.endpoints";
import { ExpressController } from "../express";

// ----------------------------------------------------------------------------

type MiscControllerTypes = ExpressController<MiscEndpointTypes>;

// ----------------------------------------------------------------------------

export const healthCheck: MiscControllerTypes["health"] = (_, resp) => {
  return resp.status(200).json({ status: "All good!" });
};
