import type { CartItem } from "./cart";
import type { Product } from "./catalog";

export type ProductPage = {
  data: Product[];
  offset: number;
  next?: number;
};

export type RecommendedProducts = {
  productList: Product[];
  offset: number;
  next?: number;
};

export function toRecommendedProducts({ data, offset, next }: ProductPage): RecommendedProducts {
  return { productList: data, offset, next };
}

export async function getProducts(codeList: number[], offset: number): Promise<ProductPage> {
  const params = new URLSearchParams();
  codeList.forEach((recommendCode) => params.append("recommendCode", String(recommendCode)));
  params.append("offset", String(offset));

  return fetch(`/api/products?${params}`).then((response) => response.json());
}

export async function addCartItem(product: Product, count: number): Promise<CartItem[]> {
  const response = await fetch("/api/cart", {
    method: "PUT",
    body: JSON.stringify({ product, count }),
  });

  return response.ok ? response.json() : [];
}

export async function deleteCartItems(productNos: number[]): Promise<CartItem[]> {
  const params = new URLSearchParams();
  productNos.forEach((productNo) => params.append("productNo", String(productNo)));
  const response = await fetch(`/api/cart?${params}`, { method: "DELETE" });

  return response.ok ? response.json() : [];
}
