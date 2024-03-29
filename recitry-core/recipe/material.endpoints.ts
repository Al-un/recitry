import type { EndpointType, WithPagination } from "../core/base-api.endpoints";
import type { PaginatedResp } from "../core/base-api.models";
import type { PathWithNoParam } from "../core/base-api.routes";
import type { Material, MaterialFormData } from "./material.models";
import type { PathWithMaterialId } from "./material.routes";

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
    MaterialFormData,
    Material
  >;
  materialDisplay: EndpointType<"GET", PathWithMaterialId, null, Material>;
  materialUpdate: EndpointType<
    "PATCH",
    PathWithMaterialId,
    Partial<MaterialFormData>,
    Material
  >;
  materialDelete: EndpointType<"DELETE", PathWithMaterialId, null, null>;
};

// ----------------------------------------------------------------------------

interface MaterialSearch extends WithPagination {
  name: string;
}
