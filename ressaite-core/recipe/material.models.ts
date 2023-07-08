import type { HasTimestamp } from "../core/base-api.models";
import type { Lang } from "../core/models/lang";
import type { HasAuthor } from "../um/users.models";

interface MaterialBase {
  name: string;
  lang: Lang;
}

export interface MaterialFormData extends MaterialBase {
  id: number | null;
}

export interface MaterialShortInfo extends MaterialBase {
  id: number;
}

export interface Material extends MaterialBase, HasAuthor, HasTimestamp {
  id: number;
}

interface RecipeMaterialBase extends MaterialBase {
  qty: number | null;
  unit: string | null;
}
export interface RecipeMaterialFormData extends RecipeMaterialBase {
  id: number | null;
}

export interface RecipeMaterial extends RecipeMaterialBase {
  id: number;
  recipeId: number;
  materialId: number;
}
