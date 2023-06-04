import { InventoryEndpointTypes } from "@al-un/ressaite-core/inventory/inventory.endpoints";
import {
  InventoryContainerCreation,
  InventoryCreation,
  InventoryItemCreation,
  Inventory as InventoryResponse,
} from "@al-un/ressaite-core/inventory/inventory.models";
import { PaginatedResp } from "@al-un/ressaite-core/core/base-api.models";

import { ExpressController } from "@/core/express";
import { InventoryModel } from "./Inventory.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { InventoryItemModel } from "./InventoryItem.model";
import { UserModel } from "@/um/models/User";

import * as InventoryService from "./Inventory.service";

// ----------------------------------------------------------------------------

type InventoryControllerTypes = ExpressController<
  InventoryEndpointTypes,
  {
    inventoryContainerCreate: {};
    inventoryContainerUpdate: {};
    inventoryContainerDelete: {};
    inventoryCreate: {};
    inventoryUpdate: {};
    inventoryDisplay: {};
    inventoryList: {};
    inventoryDelete: {};
    inventoryItemCreate: {};
    inventoryItemUpdate: {};
    inventoryItemDelete: {};
  }
>;

// ----------------------------------------------------------------------------

export const createInventory: InventoryControllerTypes["inventoryCreate"] =
  async (req, res) => {
    const authorId = req.user?.id;
    if (!authorId) throw new Error("req.user.id is not defined");

    const creationRequest = req.body as InventoryCreation;
    const inventory = await InventoryService.createInventory(
      creationRequest,
      authorId
    );

    res.status(201).json(inventory);
  };

export const updateInventory: InventoryControllerTypes["inventoryUpdate"] =
  async (req, res) => {
    const inventory = (req.res?.locals as any).inventory as InventoryModel;

    const updateRequest = req.body as Partial<InventoryModel>;
    inventory.set(updateRequest);

    await inventory.save();

    res.status(200).json(inventory.toResponseFormat);
  };

export const deleteInventory: InventoryControllerTypes["inventoryDelete"] =
  async (req, res) => {
    const inventory = (req.res?.locals as any).inventory as InventoryModel;

    await inventory.destroy();

    res.sendStatus(204);
  };

export const displayInventory: InventoryControllerTypes["inventoryDisplay"] =
  async (req, res) => {
    const inventoryId = req.params.inventoryId;
    if (!inventoryId) throw new Error(`Invalid inventoryId: ${inventoryId}`);

    const inventory = await InventoryModel.findByPk(inventoryId);

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

    const inventories = await InventoryModel.findAll({
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
    const userId = (req.res?.locals as any).user?.id;
    if (!userId) {
      res.status(400).send({ message: "userId parameter not found" });
      return;
    }

    const { inventoryId } = req.params;
    const inventory = await InventoryModel.findByPk(inventoryId, {
      include: { model: UserModel, attributes: ["id", "username"] },
    });
    if (inventory === null) {
      res.sendStatus(404);
      return;
    }

    const creationRequest = req.body as InventoryContainerCreation;
    const c = await InventoryContainerModel.create({
      name: creationRequest.name,
      authorId: userId,
      inventoryId: inventoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(c);
  };

export const updateInventoryContainer: InventoryControllerTypes["inventoryContainerUpdate"] =
  async (req, res) => {
    const inventoryContainer = (req.res?.locals as any)
      .inventoryContainer as InventoryContainerModel;

    const updateRequest = req.body;
    inventoryContainer.set(updateRequest);

    await inventoryContainer.save();

    res.status(200).json(inventoryContainer.toResponseFormat);
  };

export const deleteInventoryContainer: InventoryControllerTypes["inventoryContainerDelete"] =
  async (req, res) => {
    const inventoryContainer = (req.res?.locals as any)
      .inventoryContainer as InventoryContainerModel;

    await inventoryContainer.destroy();

    res.sendStatus(204);
  };

export const createInventoryItem: InventoryControllerTypes["inventoryItemCreate"] =
  async (req, res) => {
    res.status(503).json({ message: "not implemented yet" });

    const userId = (req.res?.locals as any).user?.id;
    if (!userId) {
      res.status(400).send({ message: "userId parameter not found" });
      return;
    }

    const { inventoryId, inventoryContainerId } = req.params;
    const inventory = await InventoryModel.findByPk(inventoryId);
    if (inventory === null) {
      res.sendStatus(404);
      return;
    }
    const inventoryContainer = await InventoryContainerModel.findByPk(
      inventoryContainerId
    );
    if (inventoryContainer === null) {
      res.sendStatus(404);
      return;
    }

    const creationRequest = req.body as InventoryItemCreation;
    const inventoryItem = await InventoryItemModel.create({
      name: creationRequest.name,
      quantity: creationRequest.quantity,
      dueDate: creationRequest.dueDate,
      materialId: creationRequest.materialId,
      authorId: userId,
      containerId: inventoryContainerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(inventoryItem);
  };

export const updateInventoryItem: InventoryControllerTypes["inventoryItemUpdate"] =
  async (req, res) => {
    const inventoryItem = (req.res?.locals as any)
      .inventoryItem as InventoryItemModel;

    const updateRequest = req.body;
    inventoryItem.set(updateRequest);

    await inventoryItem.save();

    res.status(200).json(inventoryItem.toResponseFormat);
  };

export const deleteInventoryItem: InventoryControllerTypes["inventoryItemDelete"] =
  async (req, res) => {
    const inventoryItem = (req.res?.locals as any)
      .inventoryItem as InventoryItemModel;

    await inventoryItem.destroy();

    res.sendStatus(204);
  };
