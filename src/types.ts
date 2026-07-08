export type Language = "en" | "zh";

export type LocalizedString = Record<Language, string>;

export type Accent = "red" | "yellow" | "blue" | "green";
export type ImageMode = "scene" | "full-product" | "detail";

export type Capability = {
  number: string;
  title: LocalizedString;
  body: LocalizedString;
  accent: Accent;
};

export type Product = {
  id: string;
  number: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  items: LocalizedString[];
  directionNote: LocalizedString;
  accent: Accent;
  visual: "notebook" | "packaging" | "bag" | "kit";
  imageMode: ImageMode;
};

export type ProcessStep = {
  number: string;
  title: LocalizedString;
  body: LocalizedString;
  accent: Accent;
};

