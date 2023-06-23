import { isValidLang } from "../core/models/lang";
import {
  ValidationErrors,
  Validator,
  returnValidation,
} from "../core/models/validator";
import { MaterialFormData } from "./material.models";

export const enum MaterialError {
  NameCannotEmpty = "Material name cannot be empty",
  LangIsInvalid = "Language is invalid",
}

export const isMaterialValid: Validator<MaterialFormData, MaterialError> = (
  materialForm: MaterialFormData
) => {
  const errors: ValidationErrors<MaterialFormData, MaterialError> = {};
  let isValid = true;

  if (materialForm.name.length === 0) {
    errors["name"] = MaterialError.NameCannotEmpty;
  }

  if (!isValidLang(materialForm.lang)) {
    errors["lang"] = MaterialError.LangIsInvalid;
  }

  return returnValidation(isValid, errors);
};
