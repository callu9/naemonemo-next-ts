import { products } from "@/mocks";
import { NextRequest } from "next/server";

export type ProductList = typeof products;
export type Product = ProductList[0];

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const recommendCode = Number(searchParams.get("recommendCode") || 0);
  // const offset = Number(searchParams.get("offset") || 0);
  // const limit = Number(searchParams.get("limit") || 0);
  // const sort = Number(searchParams.get("recommendCode") || "priorityScore");
  const productList = products.filter(
    (prod) => !recommendCode || prod.recommendCode === Number(recommendCode)
  );
  return new Response(JSON.stringify(productList), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
export async function getProductList(recommendCode: string | number) {
  const res = await fetch(`http://localhost:3000/api/products?recommendCode=${recommendCode}`);
  const productList = await res.json();
  return productList;
}
