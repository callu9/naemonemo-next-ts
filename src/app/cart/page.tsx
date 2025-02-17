"use client";

import { Container } from "@/atom/Container";
import { CartHeader } from "@/components/common/Header";
import CartList from "@/template/cart/CartList";
import PixidBottom from "@/template/cart/PixidBottom";
import RecommendArea from "@/template/cart/RecommendArea";
import { useEffect, useState } from "react";
import { CartItem, getCartItemList } from "../api/cart/route";
import "./cart.scss";

export default function Cart() {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [codeList, setCodeList] = useState<number[]>([]);

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    const list = await getCartItemList();
    setCartList(list);
    if (codeList.length === 0) setCodeList(list.map((item: CartItem) => item.recommendCode) || [0]);
  }
  return (
    <>
      <CartHeader />
      <Container
        className="cart"
        surface="tertiary"
        display="flex"
        direction="column"
        justify="left"
        align="stretch"
        gap={10}
      >
        <CartList cartList={cartList} onChange={getList} />
        <RecommendArea codeList={codeList} onUpdate={getList} />
        <PixidBottom cartList={cartList} />
      </Container>
    </>
  );
}
