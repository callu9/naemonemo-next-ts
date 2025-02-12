import { products } from "@/mocks";
import { NextRequest } from "next/server";

export type ProductList = typeof products;
export type Product = ProductList[0];

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const recommendCode = Number(searchParams.get("recommendCode") || 0);
  const offset = Number(searchParams.get("offset") || 0);
  const limit = Number(searchParams.get("limit") || 10);
  const filteredResult = getFilteredProducts(recommendCode, offset, limit);
  return new Response(JSON.stringify(filteredResult), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
export async function getProductList(recommendCode: number, offset: number) {
  const res = await fetch(
    `http://localhost:3000/api/products?recommendCode=${recommendCode}&offset=${offset}`
  );
  const result = await res.json();
  return result;
}
function getFilteredProducts(
  recommendCode: number,
  offset = 0,
  limit = 10,
  sort: "priorityScore" | "price" | "productName" = "priorityScore"
) {
  const productList = products
    .filter((prod) => !recommendCode || prod.recommendCode === Number(recommendCode))
    .sort((a, b) => (sort === "productName" ? (a[sort] > b[sort] ? 1 : -1) : b[sort] - a[sort]));
  const filtered = productList.slice(offset * limit, (offset + 1) * limit);
  const nextOffset = offset + 1;
  const next = productList.length > (offset + 1) * limit ? nextOffset + 1 : undefined;
  return { data: filtered, offset: nextOffset, next };
}
