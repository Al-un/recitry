import type { HasAuthor } from "../um/users.models";

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
  /** Useful name, maybe more accurate than the material */
  name: string;
  /**
   * Quantity is bound to `dueDate` so multiple items can have the same
   * material but different due date
   */
  quantity: number;
  /** Best before :) */
  dueDate: Date | null;
}

export interface InventoryItemCreation extends InventoryItemBase {
  materialId: number | null;
  inventoryContainerId: number | null;
}

export interface InventoryItem extends InventoryItemBase, HasAuthor {
  id: number;
  material: {
    id: number;
    name: string;
  } | null;
}
