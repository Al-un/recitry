import type { RouteOf } from "../core/base-api.routes";
import type { MaterialEndpointTypes } from "./material.endpoints";

export const MaterialRoutes: RouteOf<MaterialEndpointTypes> = {
  materialSearch: {
    path: "/v1/materials/",
    method: "GET",
  },
  materialCreate: {
    path: "/v1/materials/",
    method: "POST",
  },
  materialUpdate: {
    path: "/v1/material/:materialId",
    method: "PATCH",
  },
  materialDelete: {
    path: "/v1/material/:materialId",
    method: "DELETE",
  },
};

// ----------------------------------------------------------------------------

export interface PathWithMaterialId {
  materialId: number;
}
