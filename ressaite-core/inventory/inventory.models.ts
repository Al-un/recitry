import { HasAuthor } from "../um/users.models";

interface InventoryBase {
  name: string;
}

export interface InventoryCreation extends InventoryBase {
  containers: InventoryContainerCreation[];
}

export interface Inventory extends InventoryBase, HasAuthor {
  id: number;
  containers: InventoryContainer[];
}

// ----------------------------------------------------------------------------

interface InventoryContainerBase {
  name: string;
}

export interface InventoryContainerCreation extends InventoryContainerBase {
  inventoryId: number | null;
  items: InventoryItemCreation[];
}

export interface InventoryContainer extends InventoryContainerBase, HasAuthor {
  id: number;
  items: InventoryItem[];
}

// ----------------------------------------------------------------------------
interface InventoryItemBase {
  name: string;
  qty: number;
}

export interface InventoryItemCreation extends InventoryItemBase {
  materialId: number;
  inventoryContainerId: number;
}

export interface InventoryItem extends InventoryItemBase, HasAuthor {
  id: number;
  material: {
    id: number;
    name: string;
  };
}
