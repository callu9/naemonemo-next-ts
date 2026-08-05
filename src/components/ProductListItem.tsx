"use client";

import type { Product, RelatedProduct } from "@/lib/catalog";
import { Container } from "@/atom/Container";
import ImageBox from "@/atom/ImageBox";
import { Text } from "@/atom/Text";
import CartToggleButton from "./cart/CartToggleButton";
import { formatWon } from "@/lib/format";

export default function ProductListItem({ product, recommendCode }: { product: RelatedProduct; recommendCode: number }) {
  const cartProduct: Product = { ...product, recommendCode };
  return (
    <div className="product-list-item">
      <Container className="product-wrapper" display="flex" justify="sides" gap={16}>
        {product.imageUrl && (
          <ImageBox
            imageUrl={product.imageUrl}
            alt="상품 이미지"
            width="60px"
            height="60px"
            radius={8}
          />
        )}
        <Container
          className="product-info"
          display="flex"
          direction="column"
          justify="sides"
          align="upper"
          gap={4}
        >
          <Text className="product-name" weight="bold">
            {product.productName}
          </Text>
          <Text>{formatWon(product.price)}</Text>
        </Container>
        <CartToggleButton product={cartProduct} className="toggled-icon-button" />
      </Container>
    </div>
  );
}
