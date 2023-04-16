interface RecipeBase {
  title: string;
  description: string;
  steps: RecipeStep[];
}

export interface RecipeStep {
  body: string;
}

export interface RecipeCreation extends RecipeBase {}

export interface Recipe extends RecipeBase {
  id: number;
}
