import type { EndpointType, WithPagination } from "../core/base-api.endpoints";
import { PaginatedResp } from "../core/base-api.models";
import type { PathWithNoParam } from "../core/base-api.routes";
import type { Material, MaterialCreation } from "./material.models";
import { PathWithMaterialId } from "./material.routes";

export type MaterialEndpointTypes = {
  materialSearch: EndpointType<
    "GET",
    PathWithNoParam,
    MaterialSearch,
    PaginatedResp<Material[]>
  >;
  materialCreate: EndpointType<
    "POST",
    PathWithNoParam,
    MaterialCreation,
    Material
  >;
  materialUpdate: EndpointType<
    "PATCH",
    PathWithMaterialId,
    Partial<Material>,
    Material
  >;
  materialDelete: EndpointType<"DELETE", PathWithMaterialId, null, null>;
};

// ----------------------------------------------------------------------------

interface MaterialSearch extends WithPagination {
  name: string;
}
