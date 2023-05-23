import type { Lang } from "../core/models/lang";
import type { HasAuthor } from "../um/users.models";
import type { RecipeMaterial, RecipeMaterialCreation } from "./material.models";

interface RecipeBase {
  title: string;
  description: string;
  steps: RecipeStep[];
  lang: Lang;
}

export interface RecipeStep {
  body: string;
}

export interface RecipeCreation extends RecipeBase {
  materials: (RecipeMaterial | RecipeMaterialCreation)[];
}

export interface Recipe extends RecipeBase, HasAuthor {
  id: number;
  materials: RecipeMaterial[];
}
