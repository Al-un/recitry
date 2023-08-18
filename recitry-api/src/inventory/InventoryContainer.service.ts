import {
  InventoryContainer,
  InventoryContainerFormData,
} from "@al-un/recitry-core/inventory/inventory.models";
import { includeUserMinimalProfile } from "@/um/User.model";
import { InventoryContainerModel } from "./InventoryContainer.model";

export const createInDb = async (
  payload: InventoryContainerFormData,
  authorId: number
) => {
  const c = await InventoryContainerModel.create({
    name: payload.name,
    authorId,
    inventoryId: payload.inventoryId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return c;
};

/**
 * Only name can be modified, a container cannot be transferred to another inventory
 */
export const updateInDb = async (
  container: InventoryContainerModel,
  payload: Partial<InventoryContainerFormData>
) => {
  container.set({
    name: payload?.name,
    updatedAt: new Date(),
  });
  await container.save();

  return container;
};

export const deleteInDb = async (container: InventoryContainerModel) => {
  await container.destroy();
};

export const fetchFromDb = async (
  data: number | InventoryContainerModel
): Promise<InventoryContainer> => {
  let c: InventoryContainerModel | null = null;

  if (typeof data === "number") {
    c = await InventoryContainerModel.findByPk(data, {
      include: [includeUserMinimalProfile],
    });
    if (c === null) throw new Error("Created container not found");
  } else {
    c = data;
  }

  return c.toInventoryContainer;
};
