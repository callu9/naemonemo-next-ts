import { getProducts } from "@/lib/catalog";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const codeList = searchParams
    .getAll("recommendCode")
    .map(Number);
  const offset = Number(searchParams.get("offset") || 0);
  const limit = Number(searchParams.get("limit") || 10);

  return Response.json(getProducts(codeList, offset, limit));
}
