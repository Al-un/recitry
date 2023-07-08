import type { EndpointType, WithPagination } from "../core/base-api.endpoints";
import type { PaginatedResp } from "../core/base-api.models";
import type { PathWithNoParam } from "../core/base-api.routes";
import type {
  Inventory,
  InventoryContainer,
  InventoryContainerFormData,
  InventoryFormData,
  InventoryDetail,
  InventoryItem,
  InventoryItemFormData,
  InventoryListItem,
} from "./inventory.models";
import type {
  PathWithInventoryContainerId,
  PathWithInventoryId,
  PathWithInventoryItemId,
} from "./inventory.routes";

export type InventoryEndpointTypes = {
  inventoryCreate: EndpointType<
    "POST",
    PathWithNoParam,
    InventoryFormData,
    Inventory
  >;
  inventoryList: EndpointType<
    "GET",
    WithPagination,
    null,
    PaginatedResp<InventoryListItem[]>
  >;
  inventoryDisplay: EndpointType<
    "GET",
    PathWithInventoryId,
    null,
    InventoryDetail
  >;
  inventoryUpdate: EndpointType<
    "PATCH",
    PathWithInventoryId,
    Partial<InventoryFormData>,
    Inventory
  >;
  inventoryDelete: EndpointType<"DELETE", PathWithInventoryId, null, null>;
  inventoryContainerCreate: EndpointType<
    "POST",
    PathWithInventoryId,
    InventoryContainerFormData,
    InventoryContainer
  >;
  inventoryContainerUpdate: EndpointType<
    "PATCH",
    PathWithInventoryId & PathWithInventoryContainerId,
    Partial<InventoryContainerFormData>,
    InventoryContainer
  >;
  inventoryContainerDelete: EndpointType<
    "DELETE",
    PathWithInventoryId & PathWithInventoryContainerId,
    null,
    null
  >;
  inventoryItemCreate: EndpointType<
    "POST",
    PathWithInventoryId,
    InventoryItemFormData,
    InventoryItem
  >;
  inventoryItemUpdate: EndpointType<
    "PATCH",
    PathWithInventoryId & PathWithInventoryItemId,
    Partial<InventoryItemFormData>,
    InventoryItem
  >;
  inventoryItemDelete: EndpointType<
    "DELETE",
    PathWithInventoryId & PathWithInventoryItemId,
    null,
    null
  >;
};

// ----------------------------------------------------------------------------
