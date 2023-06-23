import type { HasTimestamp } from "../core/base-api.models";
import type { MaterialShortInfo } from "../recipe/material.models";
import type { HasAuthor } from "../um/users.models";

interface InventoryBase {
  name: string;
}

export interface InventoryFormData extends InventoryBase {
  id: number | null;
}

export interface Inventory extends InventoryBase, HasAuthor, HasTimestamp {
  id: number;
}

export interface InventoryDetail extends Inventory {
  containers: InventoryContainerWithItems[];
}

export interface InventoryListItem extends Inventory {}

// ----------------------------------------------------------------------------

interface InventoryContainerBase {
  name: string;
  inventoryId: number;
}

export interface InventoryContainerFormData extends InventoryContainerBase {
  id: number | null;
}

export interface InventoryContainer
  extends InventoryContainerBase,
    HasAuthor,
    HasTimestamp {
  id: number;
}

export interface InventoryContainerWithItems extends InventoryContainer {
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
  /** The inventory container this item belongs to. Cannot be null */
  containerId: number;
}

export interface InventoryItemFormData extends InventoryItemBase {
  id: number | null;
  materialId: number | null;
}

export interface InventoryItem
  extends InventoryItemBase,
    HasAuthor,
    HasTimestamp {
  id: number;
  material: MaterialShortInfo | null;
}
