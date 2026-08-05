import type { Product } from "./catalog";

export type CartItem = Product & { count: number };

export let cartList: CartItem[] = [
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
    priorityScore: 130,
    availableCoupon: true,
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

export function updateCart(product: Product, count = 1) {
  const index = cartList.findIndex((item) => item.productNo === product.productNo);

  if (index < 0) cartList.push({ ...product, count });
  else cartList[index].count = count;
}

export function deleteCartItems(productNos: number[]) {
  cartList = cartList.filter((item) => !productNos.includes(item.productNo));
}
