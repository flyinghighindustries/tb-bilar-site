import { en } from "./en";
import { is } from "./is";
import type { Locale } from "@/types/entity";

export const strings = { en, is };

export function t(locale: Locale) {
  return strings[locale] ?? strings.is;
}
