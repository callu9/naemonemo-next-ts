"use client";

import { Container } from "@/atom/Container";
import CartList from "@/template/cart/CartList";
import RecommendArea from "@/template/cart/RecommendArea";
import { useEffect, useState } from "react";
import { CartItem, getCartItemList } from "../api/cart/route";
import "./cart.scss";

export default function Cart() {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [codeList, setCodeList] = useState<number[]>([]);

  useEffect(() => {
    getList();
    document.querySelectorAll(".icon-wrapper").forEach((btn) => {
      btn.addEventListener("click", getList);
    });
  }, []);

  async function getList() {
    const list = await getCartItemList();
    setCartList(list);
    setCodeList(list.length > 0 ? list.map((item: CartItem) => item.recommendCode) : [0]);
  }
  return (
    <Container className="cart" surface="tertiary" justify="stretch" gap={10}>
      <CartList cartList={cartList} onChange={getList} />
      {/* <RecommendArea codeList={codeList} /> */}
    </Container>
  );
}
