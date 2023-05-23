import type { EndpointType, WithPagination } from "../core/base-api.endpoints";
import type { PathWithNoParam } from "../core/base-api.routes";
import type { Material } from "./material.models";

export type MaterialEndpointTypes = {
  materialSearch: EndpointType<
    "GET",
    PathWithNoParam,
    MaterialSearch,
    Material[]
  >;
};

// ----------------------------------------------------------------------------

interface MaterialSearch extends WithPagination {
  name: string;
}
