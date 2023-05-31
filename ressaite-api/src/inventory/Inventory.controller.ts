import { InventoryEndpointTypes } from "@al-un/ressaite-core/inventory/inventory.endpoints";
import {
  InventoryCreation,
  Inventory as InventoryResponse,
} from "@al-un/ressaite-core/inventory/inventory.models";
import { PaginatedResp } from "@al-un/ressaite-core/core/base-api.models";

import { ExpressController } from "@/core/express";
import { InventoryModel } from "./Inventory.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { InventoryItemModel } from "./InventoryItem.model";
import { UserModel } from "@/um/models/User";

// ----------------------------------------------------------------------------

type InventoryControllerTypes = ExpressController<InventoryEndpointTypes>;

// ----------------------------------------------------------------------------

export const createInventory: InventoryControllerTypes["inventoryCreate"] =
  async (req, res) => {
    const authorId = req.user?.id;
    if (!authorId) throw new Error("req.user.id is not defined");

    const creationRequest = req.body as InventoryCreation;
    const createdInventory = await InventoryModel.create({
      name: creationRequest.name,
      authorId,
      containers: creationRequest.containers.map((container) => {
        const newContainer = new InventoryContainerModel({
          name: container.name,
          authorId,
          items: container.items.map((item) => {
            const newItem = new InventoryItemModel({
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
    console.log("Created", createdInventory.dataValues);

    const fetchedInventory = await InventoryModel.findByPk(
      createdInventory.id,
      {
        include: [
          { model: UserModel, required: true },
          // {
          //   model: InventoryContainerModel,
          //   required: true,
            // include: [
            //   { model: UserModel },
            //   {
            //     model: InventoryItemModel,
            //     required: true,
            //     include: [{ model: UserModel }],
            //   },
            // ],
          // },
        ],
      }
    );
    console.log("Fetched", fetchedInventory?.dataValues);

    const respBody = fetchedInventory?.toResponseFormat;
    console.log("SENDING back", respBody);
    res.status(201).json(respBody);
    console.log("sent");
  };

export const updateInventory: InventoryControllerTypes["inventoryUpdate"] =
  async (req, res) => {
    const inventoryId = req.params.inventoryId;
    const updateRequest = req.body as Partial<InventoryModel>;
    let inventory = await InventoryModel.findByPk(inventoryId);
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
    const deletedCount = await InventoryModel.destroy({
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
    res.status(503).json({ message: "not implemented yet" });
  };

export const updateInventoryContainer: InventoryControllerTypes["inventoryContainerUpdate"] =
  async (req, res) => {
    res.status(503).json({ message: "not implemented yet" });
  };

export const deleteInventoryContainer: InventoryControllerTypes["inventoryContainerDelete"] =
  async (req, res) => {
    res.status(503).json({ message: "not implemented yet" });
  };

export const createInventoryItem: InventoryControllerTypes["inventoryItemCreate"] =
  async (req, res) => {
    res.status(503).json({ message: "not implemented yet" });
  };

export const updateInventoryItem: InventoryControllerTypes["inventoryItemUpdate"] =
  async (req, res) => {
    res.status(503).json({ message: "not implemented yet" });
  };

export const deleteInventoryItem: InventoryControllerTypes["inventoryItemDelete"] =
  async (req, res) => {
    res.status(503).json({ message: "not implemented yet" });
  };
