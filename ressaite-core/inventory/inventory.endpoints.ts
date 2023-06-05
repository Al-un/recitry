import type { EndpointType, WithPagination } from "../core/base-api.endpoints";
import type { PaginatedResp } from "../core/base-api.models";
import type { PathWithNoParam } from "../core/base-api.routes";
import type {
  Inventory,
  InventoryContainer,
  InventoryContainerCreation,
  InventoryCreation,
  InventoryDetail,
  InventoryItem,
  InventoryItemCreation,
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
    InventoryCreation,
    Inventory
  >;
  inventoryList: EndpointType<
    "GET",
    WithPagination,
    null,
    PaginatedResp<InventoryListItem[]>
  >;
  inventoryDisplay: EndpointType<"GET", PathWithInventoryId, null, InventoryDetail>;
  inventoryUpdate: EndpointType<
    "PATCH",
    PathWithInventoryId,
    Partial<InventoryCreation>,
    Inventory
  >;
  inventoryDelete: EndpointType<"DELETE", PathWithInventoryId, null, null>;
  inventoryContainerCreate: EndpointType<
    "POST",
    PathWithInventoryId,
    InventoryContainerCreation,
    InventoryContainer
  >;
  inventoryContainerUpdate: EndpointType<
    "PATCH",
    PathWithInventoryId & PathWithInventoryContainerId,
    Partial<InventoryContainerCreation>,
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
    PathWithInventoryId & PathWithInventoryContainerId,
    InventoryItemCreation,
    InventoryItem
  >;
  inventoryItemUpdate: EndpointType<
    "PATCH",
    PathWithInventoryId &
      PathWithInventoryContainerId &
      PathWithInventoryItemId,
    Partial<InventoryItemCreation>,
    InventoryItem
  >;
  inventoryItemDelete: EndpointType<
    "DELETE",
    PathWithInventoryId &
      PathWithInventoryContainerId &
      PathWithInventoryItemId,
    null,
    null
  >;
};

// ----------------------------------------------------------------------------
