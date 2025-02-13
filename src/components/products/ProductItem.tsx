"use client";

import { addCartItem, deleteCartItems, getCartItemAddable } from "@/app/api/cart/route";
import { Product } from "@/app/api/products/route";
import IconBag from "@/assets/icon/toggledIconButton_true.svg";
import IconBagEmpty from "@/assets/icon/toggledIconButton_false.svg";
import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import { useEffect, useState } from "react";

export default function ProductItem({
  productNo,
  imageUrl,
  availableCoupon,
  productName,
  price,
  ...props
}: Product) {
  const [addable, setAddable] = useState<boolean>(false);

  async function addItemToCart() {
    const product = {
      productNo,
      imageUrl,
      availableCoupon,
      productName,
      price,
      ...props,
    } as Product;
    const res = await addCartItem(product, 1);
    console.log(res.message);
    setAddable(false);
  }
  async function deleteItemfromCart() {
    const res = await deleteCartItems([productNo]);
    console.log(res.message);
    setAddable(true);
  }
  async function getAddableFlag() {
    const flag = await getCartItemAddable(productNo);
    setAddable(flag);
  }
  useEffect(() => {
    getAddableFlag();
  }, [productNo]);

  return (
    <Container
      className="recommend-product-list-item"
      align="upper"
      gap={24}
      id={`product-${productNo}`}
    >
      <div className="img-wrapper">
        {imageUrl && <img src={imageUrl} alt="상품 이미지" />}
        {availableCoupon && (
          <div className="coupon-available display-flex body-extra-small button-invert">쿠폰</div>
        )}
      </div>
      <Container className="product-info-area" display="flex" justify="sides" align="upper" gap={8}>
        <Container className="product-info" align="sides" gap={8}>
          <Text className="product-name">{productName}</Text>
          <Container className="product-price" display="flex" justify="left" gap={4}>
            {/* {availableCoupon && <Text usage='lable' fontColor='negative'>{discountRate}%</Text>} */}
            {availableCoupon && (
              <Text usage="lable" fontColor="negative">
                10%
              </Text>
            )}
            <Text usage="lable">
              {new Intl.NumberFormat("ko-KR").format(availableCoupon ? price * 0.9 : price)}원
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
