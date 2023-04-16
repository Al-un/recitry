import { Lang } from "../../core/models/lang";
import { Material, MaterialCreation } from "./material";

interface RecipeBase {
  title: string;
  description: string;
  steps: RecipeStep[];
  lang: Lang
}

export interface RecipeStep {
  body: string;
}

export interface RecipeCreation extends RecipeBase {
  materials: (Material | MaterialCreation)[];
}

export interface Recipe extends RecipeBase {
  id: number;
  materials: Material[];
}
