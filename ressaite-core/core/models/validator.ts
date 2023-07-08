export type ValidationErrors<FormData, ErrorType> = {
  [key in keyof FormData]?: ErrorType;
};

export interface ValidationResult<FormData, ErrorType> {
  isValid: boolean;
  errors?: ValidationErrors<FormData, ErrorType>;
}

export type Validator<FormData, ErrorType> = (
  formData: FormData
) => ValidationResult<FormData, ErrorType>;

export const returnValidation = <FormData, ErrorType>(
  isValid: boolean,
  errors: ValidationErrors<FormData, ErrorType>
): ValidationResult<FormData, ErrorType> => {
  if (isValid) {
    if (Object.keys(errors).length > 0) {
      throw new Error(`Validation cannot be valid with errors ${errors}`);
    }

    return { isValid };
  }

  if (Object.keys(errors).length === 0) {
    throw new Error(`Validation cannot be invalid without errors ${errors}`);
  }

  return { isValid, errors };
};
