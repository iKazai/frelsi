import type { ReactNode } from "react";

export type Size = "S" | "M" | "L" | "XL";

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  description: string;
  hasSizes: boolean;
  stock: Record<Size, number> | number;
  imageSvg: ReactNode;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size?: Size;
  quantity: number;
}
