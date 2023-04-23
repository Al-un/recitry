import {
  EndpointType,
  WithPagination,
} from "../core/base-api.endpoints";
import { PathWithNoParam, RouteOf } from "../core/base-api.routes";
import { Material } from "./material.models";

export type MaterialEndpointTypes = {
  materialSearch: EndpointType<
    "GET",
    PathWithNoParam,
    MaterialSearch,
    Material[]
  >;
};

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

// ----------------------------------------------------------------------------

interface MaterialSearch extends WithPagination {
  search: string;
}
