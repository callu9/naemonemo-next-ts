import { cartList, deleteCartItems, updateCart } from "@/lib/cart";
import type { Product } from "@/lib/catalog";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("type") === "count") {
    return Response.json(cartList.length);
  }

  return Response.json(cartList);
}

export async function PUT(request: NextRequest) {
  const { product, count } = await request.json();
  updateCart(product as Product, Number(count));

  return Response.json(cartList);
}

export async function DELETE(request: NextRequest) {
  const productNos = request.nextUrl.searchParams.getAll("productNo").map(Number);
  deleteCartItems(productNos);

  return Response.json(cartList);
}
