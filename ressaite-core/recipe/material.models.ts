import { Lang } from "../core/models/lang";
import { HasAuthor } from "../um/users.models";

interface MaterialBase {
  name: string;
  lang: Lang;
}

export interface MaterialCreation extends MaterialBase {}

export interface Material extends MaterialBase, HasAuthor {
  id: number;
}

interface RecipeMaterialBase extends MaterialBase {
  qty: number | null;
  unit: string | null;
}

export interface RecipeMaterial extends RecipeMaterialBase {}

export interface RecipeMaterialCreation extends RecipeMaterialBase {
  /**Material ID */
  id: number;
}
