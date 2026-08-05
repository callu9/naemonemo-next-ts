"use client";

import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import { Text } from "@/atom/Text";
import { IconButton } from "@/components/common/IconButton";
import useCartStore from "@/store/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IconBag from "../../assets/icon/ic-bag.svg";
import Logo from "../../assets/icon/logo.svg";
import styles from "./Header.module.css";

export function MainHeader() {
  return (
    <ul className={styles.headerNav}>
      <li>
        <Link href="/">
          <Container display="flex" justify="left" gap={8}>
            <Logo width="40" height="40" />
            <Text usage="title" fontStyle="small">
              내모네모
            </Text>
          </Container>
        </Link>
      </li>
      <li>
        <IconCart />
      </li>
    </ul>
  );
}
export function ProductsHeader() {
  const router = useRouter();
  return (
    <ul className={styles.headerNav}>
      <li>
        <IconButton className="icon-wrapper" label="이전 페이지" onClick={() => router.back()}>
          <Icon iconNm="chevronLeft" iconSize={32} />
        </IconButton>
      </li>
      <li>
        <Text fontStyle="large" weight="bold">
          추천 상품 둘러보기
        </Text>
      </li>
      <li>
        <IconCart />
      </li>
    </ul>
  );
}
export function CartHeader() {
  const router = useRouter();
  return (
    <ul className={styles.headerNav}>
      <li>
        <IconButton className="icon-wrapper" label="이전 페이지" onClick={() => router.back()}>
          <Icon iconNm="chevronLeft" iconSize={32} />
        </IconButton>
      </li>
      <li>
        <Text fontStyle="large" weight="bold">
          장바구니
        </Text>
      </li>
      <li>
        <Icon iconNm="chevronRight" iconColor="invert" />
      </li>
    </ul>
  );
}
export function IconCart() {
  const itemCount = useCartStore((state) => state.cartList.length);
  return (
    <Link href="/cart">
      <div className={styles.iconWrapper}>
        <IconBag width="24" height="24" />
        <div className={styles.cartItemCount}>
          {itemCount}
        </div>
      </div>
    </Link>
  );
}
