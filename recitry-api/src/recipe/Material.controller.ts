import { Op, Sequelize } from "sequelize";

import { MaterialEndpointTypes } from "@al-un/recitry-core/recipe/material.endpoints";

import { ExpressController } from "@/core/express";
import { UserModel, includeUserMinimalProfile } from "@/um/User.model";
import { MaterialModel } from "./Material.model";

// ----------------------------------------------------------------------------

type MaterialControllerTypes = ExpressController<MaterialEndpointTypes>;

// ----------------------------------------------------------------------------

export const searchMaterial: MaterialControllerTypes["materialSearch"] = async (
  req,
  res
) => {
  const { page, limit, name } = req.query;
  if (limit > 100) {
    res.status(400).json({ message: `Keep pagination limit under 100` });
    return;
  }

  // iLike is Postgres specific
  // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
  // Solved by https://stackoverflow.com/a/41732931/4906586
  const where = !!name
    ? // Postgres only
      // { name: { [Op.iLike]: `%${name}%` } }

      Sequelize.where(Sequelize.fn("lower", Sequelize.col("name")), {
        [Op.like]: `%${name}%`,
      })
    : {};

  const { count, rows } = await MaterialModel.findAndCountAll({
    where,
    offset: (page - 1) * limit,
    limit,
    order: [["updatedAt", "DESC"]],
    include: [includeUserMinimalProfile],
  });

  const data = rows.map((m) => m.toMaterial);

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
    const message = `Material with name ${creationRequest.name} already exists`;
    res.status(400).json({ message });
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

  res.status(201).json(createdMaterial.toMaterial);
};

export const displayMaterial: MaterialControllerTypes["materialDisplay"] =
  async (req, res) => {
    const materialId = req.params.materialId;
    if (!materialId) throw new Error("req.params.materialId is not defined");

    let material = await MaterialModel.findByPk(materialId, {
      include: [includeUserMinimalProfile],
    });
    if (material === null) {
      res.status(404).json({ message: `Material #${materialId} not found` });
      return;
    }

    res.status(200).json(material.toMaterial);
  };

export const updateMaterial: MaterialControllerTypes["materialUpdate"] = async (
  req,
  res
) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("req.user.id is not defined");

  const materialId = req.params.materialId;
  if (!materialId) throw new Error("req.params.materialId is not defined");

  let material = await MaterialModel.findByPk(materialId, {
    include: [includeUserMinimalProfile],
  });
  if (material === null) {
    res.status(404).json({ message: `Material #${materialId} not found` });
    return;
  }

  if (material.authorId !== userId) {
    res.status(403).json({ message: `Cannot update material #${materialId}` });
  }

  const updateRequest = req.body;
  material.set(updateRequest);

  await material.save();
  res.status(200).json(material.toMaterial);
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
