"use client";

import { CartItem as Item } from "@/app/api/cart/route";
import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import { Text } from "@/atom/Text";
import CartItem from "@/components/cart/CartItem";
import { Button } from "@/components/common/Button";
import useCartStore, { cartStoreType } from "@/store/cart";
import Link from "next/link";
import { useState } from "react";

export default function CartList({ cartList }: { cartList: Item[] }) {
  const { removeFromCart } = useCartStore() as cartStoreType;
  const [selected, setSelected] = useState<number[]>([]);

  function onSelectAll() {
    if (selected.length === cartList.length) setSelected([]);
    else setSelected(cartList.map((item) => item.productNo));
  }
  function onSelect(productNo: number) {
    const idx = selected.indexOf(productNo);
    if (idx < 0) setSelected([...selected, productNo]);
    else setSelected([...selected.slice(0, idx), ...selected.slice(idx + 1)]);
  }
  async function onDeleteSelected() {
    removeFromCart(selected);
  }

  return cartList.length === 0 ? (
    <Container className="cart-empty" surface="primary" display="flex" direction="column" gap={16}>
      <Text fontColor="secondary">장바구니에 담은 상품이 없어요</Text>
      <Button property="tertiary">
        <Link href="/" className="display-flex gap-2">
          <Text weight="semibold">마음에 드는 상품 찾으러 가기</Text>
          <Icon iconNm="chevronRight" />
        </Link>
      </Button>
    </Container>
  ) : (
    <Container className="cart-list" surface="primary" justify="stretch" align="upper">
      <Container className="cart-select-all" display="flex" justify="sides">
        <Container display="flex" justify="left" gap={8}>
          <button className="display-flex align-center" onClick={onSelectAll}>
            <Icon
              iconNm={selected.length === cartList.length ? "checkedSquare" : "uncheckedSquare"}
              iconSize={24}
            />
          </button>
          <Text>전체 선택 (0/{cartList.length})</Text>
        </Container>
        <button className="delete-cart-item button-small" onClick={onDeleteSelected}>
          선택 삭제
        </button>
      </Container>
      {cartList.map((item) => (
        <CartItem
          key={item.productNo}
          item={item}
          checked={selected.indexOf(item.productNo) >= 0}
          onSelect={onSelect}
        />
      ))}
    </Container>
  );
}
