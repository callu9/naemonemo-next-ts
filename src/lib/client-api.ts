import type { CartItem } from "./cart";
import type { Product } from "./catalog";

export async function getProducts(codeList: number[], offset: number) {
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
