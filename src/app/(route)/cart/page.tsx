"use client";

import { Container } from "@/atom/Container";
import { CartHeader } from "@/components/common/Header";
import useCartStore, { cartStoreType } from "@/store/cart";
import CartList from "@/template/cart/CartList";
import PixidBottom from "@/template/cart/PixidBottom";
import RecommendArea from "@/template/cart/RecommendArea";
import "./cart.scss";

export default function Cart() {
  const { itemCount, cartList } = useCartStore() as cartStoreType;
  const codeList = itemCount > 0 ? [...new Set(cartList.map((item) => item.recommendCode))] : [0];

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
        <CartList cartList={cartList} />
        <RecommendArea codeList={codeList} />
        <PixidBottom cartList={cartList} />
      </Container>
    </>
  );
}
