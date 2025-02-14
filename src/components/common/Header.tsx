"use client";

import { cartList } from "@/app/api/cart/route";
import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import { Text } from "@/atom/Text";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IconBag from "../../assets/icon/ic-bag.svg";
import Logo from "../../assets/icon/logo.svg";

// export default function Header() {
//   const pathname = usePathname();
//   const [headerType, setHeaderType] = useState<string>("home");

//   useEffect(() => {
//     const newType = pathname.includes("cart")
//       ? "cart"
//       : pathname.includes("products")
//       ? "products"
//       : "home";
//     if (newType !== headerType) setHeaderType(newType);
//   }, [pathname]);

//   switch (headerType) {
//     case "products":
//       return <></>;
//     case "cart":
//       return <CartHeader />;
//     case "home":
//     default:
//       return <MainHeader />;
//   }
// }
export function MainHeader() {
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
        <IconCart />
      </li>
    </ul>
  );
}
export function ProductsHeader() {
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
export function IconCart() {
  return (
    <Link href="/cart">
      <div className="icon-wrapper">
        <IconBag width="24" height="24" />
        <div className="cart-item-count display-flex surface-warning radius-circle text-invert lable-small">
          {cartList.length}
        </div>
      </div>
    </Link>
  );
}
