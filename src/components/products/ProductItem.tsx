"use client";

import type { Product } from "@/lib/catalog";
import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import CartToggleButton from "@/components/cart/CartToggleButton";
import { formatWon } from "@/lib/format";
import Image from "next/image";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <Container
      className="recommend-product-list-item"
      align="upper"
      gap={24}
      id={`product-${product.productNo}`}
    >
      <div className="img-wrapper">
        {product.imageUrl && <Image src={product.imageUrl} alt="상품 이미지" fill sizes="200px" />}
        {product.availableCoupon && (
          <div className="coupon-available display-flex body-extra-small button-invert">쿠폰</div>
        )}
      </div>
      <Container className="product-info-area" display="flex" justify="sides" align="upper" gap={8}>
        <Container className="product-info" align="sides" gap={8}>
          <Text className="product-name">{product.productName}</Text>
          <Container className="product-price" display="flex" justify="left" gap={4}>
            {/* {availableCoupon && <Text usage='lable' fontColor='negative'>{discountRate}%</Text>} */}
            {product.availableCoupon && (
              <Text usage="lable" fontColor="negative">
                10%
              </Text>
            )}
            <Text usage="lable">
              {formatWon((product.availableCoupon ? 0.9 : 1) * product.price)}
            </Text>
          </Container>
        </Container>
        <CartToggleButton product={product} className="icon-wrapper" />
      </Container>
    </Container>
  );
}
