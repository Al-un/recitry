import type { RouteOf } from "../core/base-api.routes";
import type { InventoryEndpointTypes } from "./inventory.endpoints";

export const InventoryRoutes: RouteOf<InventoryEndpointTypes> = {
  inventoryCreate: {
    path: "/v1/inventories/",
    method: "POST",
  },
  inventoryDisplay: {
    path: "/v1/inventory/:inventoryId",
    method: "GET",
  },
  inventoryUpdate: {
    path: "/v1/inventory/:inventoryId",
    method: "PATCH",
  },
  inventoryDelete: {
    path: "/v1/inventory/:inventoryId",
    method: "DELETE",
  },
  inventoryContainerCreate: {
    path: "/v1/inventory/:inventoryId/containers/",
    method: "POST",
  },
  inventoryContainerUpdate: {
    path: "/v1/inventory/:inventoryId/container/:inventoryContainerId",
    method: "PATCH",
  },
  inventoryContainerDelete: {
    path: "/v1/inventory/:inventoryId/container/:inventoryContainerId",
    method: "DELETE",
  },
  inventoryItemCreate: {
    path: "/v1/inventory/:inventoryId/container/:inventoryContainerId/items",
    method: "POST",
  },
  inventoryItemUpdate: {
    path: "/v1/inventory/:inventoryId/container/:inventoryContainerId/item/:inventoryItemId",
    method: "PATCH",
  },
  inventoryItemDelete: {
    path: "/v1/inventory/:inventoryId/container/:inventoryContainerId/item/:inventoryItemId",
    method: "DELETE",
  },
};

// ----------------------------------------------------------------------------

export interface PathWithInventoryId {
  inventoryId: number;
}

export interface PathWithInventoryContainerId {
  inventoryContainerId: number;
}
export interface PathWithInventoryItemId {
  inventoryItemId: number;
}
