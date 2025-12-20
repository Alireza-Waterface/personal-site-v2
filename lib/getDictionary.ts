import "server-only";

const dictionaries = {
   en: () => import("@/dictionaries/en").then((module) => module.en),
   fa: () => import("@/dictionaries/fa").then((module) => module.fa),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
   return dictionaries[locale]?.() ?? dictionaries.en();
};
