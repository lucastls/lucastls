export const categories = [
  "Street",
  "Landscapes",
  "Architecture",
  "Everyday",
] as const;
export type Category = (typeof categories)[number];

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  category?: Category;
  blurDataURL?: string;
};
