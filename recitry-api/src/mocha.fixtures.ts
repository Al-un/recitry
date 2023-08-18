import { Model } from "sequelize";

import { connectSequelize, getSequelizeInstance } from "@/core/db/instance";
import { InventoryModel } from "@/inventory/Inventory.model";
import { UserModel } from "@/um/User.model";
import { executeAllMigrations, executeAllSeeds } from "@/umzug";
import {
  userOneInventoryOne,
  userOneInventoryTwo,
} from "@al-un/recitry-core/inventory/inventory.mocks";
import { userOne, userTwo } from "@al-un/recitry-core/um/users.mocks";
import { MaterialModel } from "./recipe/Material.model";
import {
  dumMatApple,
  dumMatCarrot,
  dumMatOnion,
  dumMatWakame,
} from "@al-un/recitry-core/recipe/material.mocks";

/** @see userOne */
export let testUser1: UserModel;
/** @see userTwo */
export let testUser2: UserModel;
/** @see userOneInventoryOne */
export let testInventory1_1: InventoryModel;
/** @see userOneInventoryTwo */
export let testInventory1_2: InventoryModel;
/** @see dumMatCarrot */
export let testMatCarrot: MaterialModel;
/** @see dumMatApple */
export let testMatApple: MaterialModel;
/** @see dumMatOnion */
export let testMatOnion: MaterialModel;
/** @see dumMatWakame */
export let testMatWakame: MaterialModel;

/**
 * Technical setup before any test is running. As it is only required once,
 * a fixture is more appropriate
 *
 * @see https://mochajs.org/#global-setup-fixtures
 */
export async function mochaGlobalSetup() {
  // Execute and check migrations
  await executeAllMigrations();
  await executeAllSeeds();

  try {
    await connectSequelize(getSequelizeInstance());
  } catch (err) {
    console.error("Database check: connection error", err);
    return;
  }

  // Load core data: users
  let userCandidate: UserModel | null;
  userCandidate = await UserModel.findOne({
    where: { username: userOne.username },
  });
  if (userCandidate === null) throw new Error("User One not found");
  testUser1 = userCandidate;

  userCandidate = await UserModel.findOne({
    where: { username: userTwo.username },
  });
  if (userCandidate === null) throw new Error("User One not found");
  testUser1 = userCandidate;

  // Load core data: inventories
  let inventoryCandidate: InventoryModel | null;
  inventoryCandidate = await InventoryModel.findOne({
    where: { name: userOneInventoryOne.name, authorId: testUser1.id },
  });
  if (inventoryCandidate === null)
    throw new Error("testInventory1_1 not found");
  testInventory1_1 = inventoryCandidate;

  inventoryCandidate = await InventoryModel.findOne({
    where: { name: userOneInventoryTwo.name, authorId: testUser1.id },
  });
  if (inventoryCandidate === null)
    throw new Error("testInventory1_2 not found");
  testInventory1_2 = inventoryCandidate;

  // Load core data: material
  let materialCandidate: MaterialModel | null;
  materialCandidate = await MaterialModel.findOne({
    where: { name: dumMatCarrot.name, authorId: testUser1.id },
  });
  if (materialCandidate === null) throw new Error("testMatCarrot not found");
  testMatCarrot = materialCandidate;

  materialCandidate = await MaterialModel.findOne({
    where: { name: dumMatApple.name, authorId: testUser1.id },
  });
  if (materialCandidate === null) throw new Error("testMatApple not found");
  testMatApple = materialCandidate;

  materialCandidate = await MaterialModel.findOne({
    where: { name: dumMatOnion.name, authorId: testUser1.id },
  });
  if (materialCandidate === null) throw new Error("testMatOnion not found");
  testMatOnion = materialCandidate;

  materialCandidate = await MaterialModel.findOne({
    where: { name: dumMatWakame.name, authorId: testUser1.id },
  });
  if (materialCandidate === null) throw new Error("testMatWakame not found");
  testMatWakame = materialCandidate;
}
