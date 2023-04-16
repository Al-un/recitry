import type {
  EndpointType,
  PathWithNoParam,
  RouteOf,
  WithPagination,
} from "../../core/models/api";
import { Material } from "../models/material";

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
