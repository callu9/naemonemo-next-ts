"use client";

import { addCartItem, deleteCartItems } from "@/app/api/cart/route";
import { Product } from "@/app/api/products/route";
import IconBagEmpty from "@/assets/icon/toggledIconButton_false.svg";
import IconBag from "@/assets/icon/toggledIconButton_true.svg";
import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import { useEffect, useState } from "react";

export default function ProductItem({
  product,
  onUpdate,
}: {
  product: Product;
  onUpdate: () => void;
}) {
  const [addable, setAddable] = useState<boolean>(false);

  async function addItemToCart() {
    const res = await addCartItem(product, 1);
    console.log(res.message);
    setAddable(false);
    onUpdate();
  }
  async function deleteItemfromCart() {
    const res = await deleteCartItems([product.productNo]);
    console.log(res.message);
    setAddable(true);
    onUpdate();
  }
  useEffect(() => {
    if (product.addable !== undefined) setAddable(product.addable);
  }, [product.addable]);

  return (
    <Container
      className="recommend-product-list-item"
      align="upper"
      gap={24}
      id={`product-${product.productNo}`}
    >
      <div className="img-wrapper">
        {product.imageUrl && <img src={product.imageUrl} alt="상품 이미지" />}
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
              {new Intl.NumberFormat("ko-KR").format(
                (product.availableCoupon ? 0.9 : 1) * product.price
              )}
              원
            </Text>
          </Container>
        </Container>
        <button className="icon-wrapper">
          {!addable ? (
            <IconBag width="24" height="24" onClick={deleteItemfromCart} />
          ) : (
            <IconBagEmpty width="24" height="24" onClick={addItemToCart} />
          )}
        </button>
      </Container>
    </Container>
  );
}
