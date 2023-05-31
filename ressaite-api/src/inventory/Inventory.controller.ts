import { InventoryEndpointTypes } from "@al-un/ressaite-core/inventory/inventory.endpoints";
import {
  InventoryCreation,
  Inventory as InventoryResponse,
} from "@al-un/ressaite-core/inventory/inventory.models";
import { PaginatedResp } from "@al-un/ressaite-core/core/base-api.models";

import { ExpressController } from "@/core/express";
import { Inventory } from "./Inventory.model";
import { InventoryContainer } from "./InventoryContainer.model";
import { InventoryItem } from "./InventoryItem.model";

// ----------------------------------------------------------------------------

type InventoryControllerTypes = ExpressController<InventoryEndpointTypes>;

// ----------------------------------------------------------------------------

export const createInventory: InventoryControllerTypes["inventoryCreate"] =
  async (req, res) => {
    const creationRequest = req.body as InventoryCreation;
    const authorId = req.user?.id;
    if (!authorId) throw new Error("req.user.id is not defined");

    const newInventory = new Inventory({
      name: creationRequest.name,
      authorId,
      containers: creationRequest.containers.map((container) => {
        const newContainer = new InventoryContainer({
          name: container.name,
          authorId,
          items: container.items.map((item) => {
            const newItem = new InventoryItem({
              name: item.name,
              quantity: item.quantity,
              dueDate: item.dueDate,
            });

            return newItem;
          }),
        });

        return newContainer;
      }),
    });

    await newInventory.save();

    res.status(201).json(newInventory.toResponseFormat);
  };

export const updateInventory: InventoryControllerTypes["inventoryUpdate"] =
  async (req, res) => {
    const inventoryId = req.params.inventoryId;
    const updateRequest = req.body as Partial<Inventory>;
    let inventory = await Inventory.findByPk(inventoryId);
    if (!inventory) {
      res
        .status(404)
        .json({ message: `Inventory ID ${inventoryId} not found` });
      return;
    }

    await inventory.save();

    res.status(200).json(inventory.toResponseFormat);
  };

export const deleteInventory: InventoryControllerTypes["inventoryDelete"] =
  async (req, res) => {
    const inventoryId = req.params.inventoryId;
    const deletedCount = await Inventory.destroy({
      where: { id: inventoryId },
    });

    if (deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Nothing was deleted" });
    }
  };

export const displayInventory: InventoryControllerTypes["inventoryDisplay"] =
  async (req, res) => {
    const inventoryId = req.params.inventoryId;
    if (!inventoryId) throw new Error(`Invalid inventoryId: ${inventoryId}`);

    const inventory = await Inventory.findByPk(inventoryId);

    if (inventory === null) {
      res.status(404).json({ message: `Inventory ${inventoryId} not found` });
      return;
    }

    res.status(200).json(inventory.toResponseFormat);
  };

export const listInventories: InventoryControllerTypes["inventoryList"] =
  async (req, res) => {
    const userId = req.user?.id;
    if (!userId) throw new Error("req.user.id is not defined");

    const inventories = await Inventory.findAll({
      where: { authorId: userId },
    });

    const responseContent: PaginatedResp<InventoryResponse[]> = {
      data: inventories.map((i) => i.toResponseFormat),
      totalCount: inventories.length,
    };
    res.status(200).json(responseContent);
  };

export const createInventoryContainer: InventoryControllerTypes["inventoryContainerCreate"] =
  async (req, res) => {
    throw new Error("not implemented yet");
  };

export const updateInventoryContainer: InventoryControllerTypes["inventoryContainerUpdate"] =
  async (req, res) => {
    throw new Error("not implemented yet");
  };

export const deleteInventoryContainer: InventoryControllerTypes["inventoryContainerDelete"] =
  async (req, res) => {
    throw new Error("not implemented yet");
  };

export const createInventoryItem: InventoryControllerTypes["inventoryItemCreate"] =
  async (req, res) => {
    throw new Error("not implemented yet");
  };

export const updateInventoryItem: InventoryControllerTypes["inventoryItemUpdate"] =
  async (req, res) => {
    throw new Error("not implemented yet");
  };

export const deleteInventoryItem: InventoryControllerTypes["inventoryItemDelete"] =
  async (req, res) => {
    throw new Error("not implemented yet");
  };
