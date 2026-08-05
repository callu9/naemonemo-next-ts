"use client";

import IconBag from "@/assets/icon/toggledIconButton_true.svg";
import IconBagEmpty from "@/assets/icon/toggledIconButton_false.svg";
import type { Product } from "@/lib/catalog";
import useCartStore from "@/store/cart";

export default function CartToggleButton({ product, className }: { product: Product; className: string }) {
  const isInCart = useCartStore((state) => state.cartList.some((item) => item.productNo === product.productNo));
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <button
      type="button"
      className={className}
      aria-label={isInCart ? "장바구니에서 제거" : "장바구니에 담기"}
      onClick={() => (isInCart ? removeFromCart([product.productNo]) : addToCart(product))}
    >
      {isInCart ? <IconBag width="24" height="24" /> : <IconBagEmpty width="24" height="24" />}
    </button>
  );
}
