"use client";

import { RelatedProduct } from "@/app/api/feeds/route";
import { Product } from "@/app/api/products/route";
import { Container } from "@/atom/Container";
import ImageBox from "@/atom/ImageBox";
import { Text } from "@/atom/Text";
import useCartStore, { cartStoreType } from "@/store/cart";
import ToggleIconEmpty from "../assets/icon/toggledIconButton_false.svg";
import ToggleIcon from "../assets/icon/toggledIconButton_true.svg";

export default function ProductListItem({ product }: { product: RelatedProduct }) {
  const { cartList, addToCart, removeFromCart } = useCartStore() as cartStoreType;
  const addable = cartList.findIndex((item) => item.productNo === product.productNo) < 0;

  function addItemToCart() {
    addToCart(product as Product);
  }
  function deleteItemfromCart() {
    removeFromCart([product.productNo]);
  }

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
          <Text>{new Intl.NumberFormat("ko-KR").format(product.price)}원</Text>
        </Container>
        <button className="toggled-icon-button">
          {addable ? (
            <ToggleIconEmpty width="24" height="24" onClick={addItemToCart} />
          ) : (
            <ToggleIcon width="24" height="24" onClick={deleteItemfromCart} />
          )}
        </button>
      </Container>
    </div>
  );
}
