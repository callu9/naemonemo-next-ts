import { NextRequest } from "next/server";
import { Product } from "../products/route";

export let cartList = [
  {
    productNo: 2155131,
    productName: "WOMAN GNRL 케이블 풀오버 [IVORY] / WBC3L05502",
    price: 69000,
    imageUrl:
      "https://img.29cm.co.kr/next-product/2023/07/31/bb40f6ce78e44627bfc1c46ba5246ab3_20230731114922.jpg?width=400",
    priorityScore: 610,
    recommendCode: 354,
    count: 1,
  },
  {
    productNo: 2262076,
    productName: "sadsmile puffer down jumper(n)_CQUAW23811GYX",
    price: 259000,
    imageUrl:
      "https://img.29cm.co.kr/next-product/2023/10/06/a0b8911d05364a4fb53213409226a244_20231006123430.jpg",
    availableCoupon: true,
    priorityScore: 130,
    recommendCode: 338,
    count: 1,
  },
  {
    productNo: 2265519,
    productName: "STB001 남녀공용 컬러 립 크루 삭스 양말 (15 Colors)",
    price: 5000,
    imageUrl: "https://img.29cm.co.kr/item/202311/11ee7893a2db990f83bcb565847f14cc.png?width=400",
    priorityScore: 390,
    availableCoupon: true,
    recommendCode: 338,
    count: 3,
  },
];

export type CartItem = (typeof cartList)[0];

// region HTTP Method
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const type = query.get("type");
  if (type === "count")
    return new Response(JSON.stringify(cartList.length), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  else
    return new Response(JSON.stringify(cartList), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
}
export async function PUT(req: NextRequest) {
  const { product, count } = await req.json();
  updateCart(product as Product, Number(count));
  return new Response(JSON.stringify(cartList), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const productNoList = [];
  for (const [keyNm, value] of searchParams.entries()) {
    if (keyNm === "productNo") productNoList.push(Number(value));
  }
  deleteProduct(productNoList);
  return new Response(JSON.stringify(cartList), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
// endregion HTTP Method
// region API call function
export async function getCartItemList() {
  const res = await fetch("http://localhost:3000/api/cart");
  const data = await res.json();
  return data;
}
export async function getCartItemCount() {
  const res = await fetch("http://localhost:3000/api/cart?type=count");
  const data = await res.json();
  return data;
}
// export async function getCartItemAddable(productNo: number) {
//   const res = await fetch(`http://localhost:3000/api/cart?type=addable&productNo=${productNo}`);
//   const data = await res.json();
//   return data;
// }
export async function addCartItem(product: Product, count: number) {
  const res = await fetch("http://localhost:3000/api/cart", {
    method: "PUT",
    body: JSON.stringify({ product, count }),
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data;
}
export async function deleteCartItems(productNoList: number[]) {
  const URL = "http://localhost:3000/api/cart";
  const params = new URLSearchParams();
  productNoList.map((productNo) => params.append("productNo", String(productNo)));
  const res = await fetch(`${URL}?${params}`, { method: "DELETE" });
  if (!res.ok) return [];
  const data = await res.json();
  return data;
}
// endregion API call function

function updateCart(product: Product, count = 1) {
  const idx = cartList.findIndex((cartItem) => cartItem.productNo === product.productNo);
  if (idx < 0) cartList.push({ ...product, count } as CartItem);
  else cartList[idx].count = count;
}
function deleteProduct(productNoList: number[]) {
  cartList = cartList.filter((item) => !productNoList.includes(item.productNo));
}
