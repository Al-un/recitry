import type { Lang } from "../core/models/lang";
import type { HasAuthor } from "../um/users.models";
import type { RecipeMaterial, RecipeMaterialFormData } from "./material.models";

interface RecipeBase {
  title: string;
  description: string;
  steps: RecipeStep[];
  lang: Lang;
}

export interface RecipeStep {
  body: string;
}

export interface RecipeFormData extends RecipeBase {
  materials: (RecipeMaterial | RecipeMaterialFormData)[];
}

export interface Recipe extends RecipeBase, HasAuthor {
  id: number;
  materials: RecipeMaterial[];
}
