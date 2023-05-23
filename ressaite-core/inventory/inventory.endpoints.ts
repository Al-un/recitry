import type { EndpointType } from "../core/base-api.endpoints";
import type { PathWithNoParam } from "../core/base-api.routes";
import type {
  Inventory,
  InventoryContainer,
  InventoryContainerCreation,
  InventoryCreation,
  InventoryItem,
  InventoryItemCreation,
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
  inventoryDisplay: EndpointType<"GET", PathWithInventoryId, null, Inventory>;
  inventoryUpdate: EndpointType<
    "PATCH",
    PathWithInventoryId,
    Partial<Inventory>,
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
    Partial<InventoryContainer>,
    InventoryContainer
  >;
  inventoryContainerDelete: EndpointType<
    "DELETE",
    PathWithInventoryId,
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
    Partial<InventoryItem>,
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
