export type Lang = "en" | "fr" | "jp";

export const allLangs: Lang[] = ["en", "fr", "jp"];

export const allLangsObj: { [key in Lang]: string } = {
  en: "en",
  fr: "fr",
  jp: "jp",
};

export const isValidLang = (lang: string | Lang): lang is Lang => {
  return allLangs.map((l) => l as string).includes(lang);
};
