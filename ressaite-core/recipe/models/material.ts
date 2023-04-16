import { Lang } from "../../core/models/lang";

interface MaterialBase {
  name: string;
  lang: Lang
}

export interface MaterialCreation extends MaterialBase {}

export interface Material extends MaterialBase {
  id: number;
}
