import {
  ValidationErrors,
  Validator,
  returnValidation,
} from "../core/models/validator";
import {
  InventoryContainerFormData,
  InventoryFormData,
  InventoryItemFormData,
} from "./inventory.models";

export const enum InventoryError {
  NameCannotEmpty = "Inventory name cannot be empty",
}

export const isInventoryValid: Validator<InventoryFormData, InventoryError> = (
  formData: InventoryFormData
) => {
  const errors: ValidationErrors<InventoryFormData, InventoryError> = {};
  let isValid = true;

  if (formData.name.length === 0) {
    errors["name"] = InventoryError.NameCannotEmpty;
  }

  return returnValidation(isValid, errors);
};

export const enum InventoryContainerError {
  NameCannotEmpty = "Inventory container name cannot be empty",
}

export const isInventoryContainerValid: Validator<
  InventoryContainerFormData,
  InventoryContainerError
> = (formData: InventoryContainerFormData) => {
  const errors: ValidationErrors<InventoryFormData, InventoryContainerError> =
    {};
  let isValid = true;

  if (formData.name.length === 0) {
    errors["name"] = InventoryContainerError.NameCannotEmpty;
  }

  return returnValidation(isValid, errors);
};

export const enum InventoryItemError {
  NameCannotEmpty = "Inventory item name cannot be empty",
  QuantityCannotNegative = "Quantity cannot be negative",
  ContainerCannotNull = "Container cannot be null",
}

export const isInventoryItemValid: Validator<
  InventoryItemFormData,
  InventoryItemError
> = (formData: InventoryItemFormData) => {
  const errors: ValidationErrors<InventoryItemFormData, InventoryItemError> =
    {};
  let isValid = true;

  if (formData.name.length === 0) {
    errors["name"] = InventoryItemError.NameCannotEmpty;
  }

  if (formData.quantity < 0) {
    errors["quantity"] = InventoryItemError.QuantityCannotNegative;
  }

  if (formData.containerId === null) {
    errors["containerId"] = InventoryItemError.ContainerCannotNull;
  }

  return returnValidation(isValid, errors);
};
