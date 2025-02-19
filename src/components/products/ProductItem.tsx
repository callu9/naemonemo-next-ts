"use client";

import { Product } from "@/app/api/products/route";
import IconBagEmpty from "@/assets/icon/toggledIconButton_false.svg";
import IconBag from "@/assets/icon/toggledIconButton_true.svg";
import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import useCartStore, { cartStoreType } from "@/store/cart";

export default function ProductItem({ product }: { product: Product; onUpdate?: () => void }) {
  const { cartList, addToCart, removeFromCart } = useCartStore() as cartStoreType;
  const addable = cartList.findIndex((item) => item.productNo === product.productNo) < 0;

  function addItemToCart() {
    addToCart(product);
  }
  function deleteItemfromCart() {
    removeFromCart([product.productNo]);
  }

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
