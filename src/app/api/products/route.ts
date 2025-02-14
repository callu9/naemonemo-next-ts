import { products } from "@/mocks";
import { NextRequest } from "next/server";
import { cartList } from "../cart/route";

export type Product = {
  productNo: number;
  productName: string;
  price: number;
  imageUrl?: string;
  priorityScore: number;
  recommendCode: number;
  availableCoupon?: boolean;
  addable?: boolean;
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const codeList = [];
  for (const [keyNm, value] of searchParams.entries()) {
    if (keyNm === "recommendCode") codeList.push(Number(value));
  }
  const offset = Number(searchParams.get("offset") || 0);
  const limit = Number(searchParams.get("limit") || 10);
  const filteredResult = getFilteredProducts(codeList, offset, limit);
  return new Response(JSON.stringify(filteredResult), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
export async function getProductList(codeList: number[], offset: number) {
  const URL = "http://localhost:3000/api/products";
  const params = new URLSearchParams();
  codeList.map((recommendCode) => params.append("recommendCode", String(recommendCode)));
  params.append("offset", String(offset));
  const res = await fetch(`${URL}?${params}`);
  const result = await res.json();
  return result;
}
function getFilteredProducts(
  codeList: number[],
  offset = 0,
  limit = 10,
  sort: "priorityScore" | "price" | "productName" = "priorityScore"
) {
  const productList = products
    .filter((prod) => codeList.includes(0) || codeList.includes(prod.recommendCode))
    .sort((a, b) => (sort === "productName" ? (a[sort] > b[sort] ? 1 : -1) : b[sort] - a[sort]));
  const isAddable = (item: Product) =>
    cartList.findIndex((el) => el.productNo === item.productNo) < 0;
  const filtered = productList
    .slice(offset * limit, (offset + 1) * limit)
    .map((item) => ({ ...item, addable: isAddable(item) }));
  const nextOffset = offset + 1;
  const next = productList.length > (offset + 1) * limit ? nextOffset + 1 : undefined;
  return { data: filtered, offset: nextOffset, next };
}
