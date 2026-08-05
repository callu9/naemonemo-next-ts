"use client";

import { Container } from "@/atom/Container";
import { CartHeader } from "@/components/common/Header";
import useCartStore from "@/store/cart";
import CartList from "@/template/cart/CartList";
import PixidBottom from "@/template/cart/PixidBottom";
import RecommendArea from "@/template/cart/RecommendArea";
import styles from "./cart.module.css";

export default function Cart() {
  const cartList = useCartStore((state) => state.cartList);
  const codeList = cartList.length > 0 ? [...new Set(cartList.map((item) => item.recommendCode))] : [0];

  return (
    <>
      <CartHeader />
      <Container
        className={styles.cart}
        surface="tertiary"
        display="flex"
        direction="column"
        justify="left"
        align="stretch"
        gap={10}
      >
        <CartList cartList={cartList} />
        <RecommendArea codeList={codeList} />
        <PixidBottom cartList={cartList} className={styles.pixidBottom} dimmedClassName={styles.dimmed} />
      </Container>
    </>
  );
}
