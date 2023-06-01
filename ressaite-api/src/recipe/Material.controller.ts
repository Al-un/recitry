import { MaterialEndpointTypes } from "@al-un/ressaite-core/recipe/material.endpoints";

import { ExpressController } from "@/core/express";
import { MaterialModel } from "./Material.model";
import { Op } from "sequelize";
import { UserModel } from "@/um/models/User";

// ----------------------------------------------------------------------------

type MaterialControllerTypes = ExpressController<MaterialEndpointTypes>;

// ----------------------------------------------------------------------------

export const searchMaterial: MaterialControllerTypes["materialSearch"] = async (
  req,
  res
) => {
  const { page, limit, name } = req.query;

  const where = !!name ? { name: { [Op.like]: `%${name}%` } } : {};

  const { count, rows } = await MaterialModel.findAndCountAll({
    where,
    offset: (page - 1) * limit,
    limit,
    include: [{ model: UserModel, attributes: ["id", "username"] }],
  });

  const data = rows.map((m) => m.toJson);

  res.status(200).json({ data, totalCount: count });
};

export const createMaterial: MaterialControllerTypes["materialCreate"] = async (
  req,
  res
) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("req.user.id is not defined");

  const creationRequest = req.body;

  const existingMaterial = await MaterialModel.findOne({
    where: { name: creationRequest.name },
  });
  if (existingMaterial !== null) {
    res.status(400).json({
      message: `Material with name ${creationRequest.name} already exists`,
    });
    return;
  }

  const material = await MaterialModel.create({
    name: creationRequest.name,
    lang: creationRequest.lang,
    authorId: userId,
  });

  const createdMaterial = await MaterialModel.findByPk(material.id, {
    include: { model: UserModel, attributes: ["id", "username"] },
  });
  if (createdMaterial === null)
    throw new Error(`Newly created material ${material.id} not found`);

  res.status(201).json(createdMaterial.toJson);
};

export const updateMaterial: MaterialControllerTypes["materialUpdate"] = async (
  req,
  res
) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("req.user.id is not defined");

  const materialId = req.params.materialId;
  if (!materialId) throw new Error("materialId is not defined");

  let material = await MaterialModel.findByPk(materialId);
  if (material === null) {
    res.status(404).json({ message: `Material ${materialId} not found` });
    return;
  }

  if (material.authorId !== userId) {
    res.status(403).json({ message: `Cannot delete material ${materialId}` });
  }

  const updateRequest = req.body;
  material.set(updateRequest);

  await material.save();
  res.status(200).json(material);
};

export const deleteMaterial: MaterialControllerTypes["materialDelete"] = async (
  req,
  res
) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("req.user.id is not defined");

  const materialId = req.params.materialId;
  if (!materialId) throw new Error("materialId is not defined");

  const material = await MaterialModel.findByPk(materialId);
  if (material === null) {
    res.status(404).json({ message: `Material ${materialId} not found` });
    return;
  }

  if (material.authorId !== userId) {
    res.status(403).json({ message: `Cannot delete material ${materialId}` });
    return;
  }

  await material.destroy();
  res.status(204).send();
};
