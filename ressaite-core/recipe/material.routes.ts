import { RouteOf } from "../core/base-api.routes";
import { MaterialEndpointTypes } from "./material.endpoints";

export const MaterialRoutes: RouteOf<MaterialEndpointTypes> = {
  materialSearch: {
    path: "/v1/materials/",
    method: "GET",
  },
};

// ----------------------------------------------------------------------------

export interface PathWithMaterialId {
  materialId: number;
}
