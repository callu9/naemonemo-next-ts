"use client";

import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import Link from "next/link";
import IconBag from "../../assets/icon/ic-bag.svg";
import Logo from "../../assets/icon/logo.svg";
import { useRouter, usePathname } from "next/navigation";
import { Icon } from "@/atom/Icon";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [headerType, setHeaderType] = useState<string>("home");

  useEffect(() => {
    const newType = pathname.includes("cart")
      ? "cart"
      : pathname.includes("products")
      ? "products"
      : "home";
    if (newType !== headerType) setHeaderType(newType);
  }, [pathname]);

  switch (headerType) {
    case "cart":
      return <CartHeader />;
    case "products":
      return <ProductsHeader />;
    case "home":
    default:
      return <MainHeader />;
  }
}
function MainHeader() {
  return (
    <ul className="header-nav display-flex justify-sides">
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
        <Link href="/cart">
          <IconBag width="24" height="24" />
        </Link>
      </li>
    </ul>
  );
}
function ProductsHeader() {
  const router = useRouter();
  return (
    <ul className="header-nav display-flex justify-sides">
      <li>
        <button className="icon-wrapper" onClick={() => router.back()}>
          <Icon iconNm="chevronLeft" iconSize={32} />
        </button>
      </li>
      <li>
        <Text fontStyle="large" weight="bold">
          고객님을 위한 추천 상품
        </Text>
      </li>
      <li>
        <Link href="/cart">
          <IconBag width="24" height="24" />
        </Link>
      </li>
    </ul>
  );
}
function CartHeader() {
  const router = useRouter();
  return (
    <ul className="header-nav display-flex justify-sides">
      <li>
        <button className="icon-wrapper" onClick={() => router.back()}>
          <Icon iconNm="chevronLeft" iconSize={32} />
        </button>
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
