import type { ReactNode } from "react";

export type Size = "S" | "M" | "L" | "XL";
export type ShirtColor = "noir" | "blanc";
export type ShirtView = "avant" | "dos";

export interface ProductImageVariant {
  color: ShirtColor;
  view: ShirtView;
  url: string;
  label: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  description: string;
  hasSizes: boolean;
  stock: Record<Size, number> | number;
  imageUrl?: string;
  imageSvg?: ReactNode;
  hasColorSelection?: boolean;
  colorVariants?: ProductImageVariant[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size?: Size;
  color?: ShirtColor;
  imageUrl?: string;
  quantity: number;
}
