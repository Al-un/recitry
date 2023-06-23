import type { EndpointType, WithPagination } from "../core/base-api.endpoints";
import { PaginatedResp } from "../core/base-api.models";
import type { PathWithNoParam } from "../core/base-api.routes";
import type { Material, MaterialFormData } from "./material.models";
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
    MaterialFormData,
    Material
  >;
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
