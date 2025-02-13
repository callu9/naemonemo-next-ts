"use client";

import { CartItem } from "@/app/api/cart/route";
import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import { Text } from "@/atom/Text";
import { Button } from "@/components/common/Button";
import { useEffect, useState } from "react";

export default function PixidBottom({ cartList }: { cartList: CartItem[] }) {
  const initialValue = { count: 0, totalPrice: 0, totalDiscount: 0, deliveryFee: 0 };
  const [priceDetail, setPriceDetail] = useState<{
    count: number;
    totalPrice: number;
    totalDiscount: number;
    deliveryFee: number;
  }>(initialValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const result = { ...initialValue };
    cartList.forEach((item) => {
      result.count += item.count;
      result.totalPrice += item.price * item.count;
      result.totalDiscount += item.availableCoupon ? 0.1 * item.price * item.count : 0;
    });
    setPriceDetail(result);
  }, [cartList]);

  const formatNumberStr = (price: number) => new Intl.NumberFormat("ko-KR").format(price);

  return (
    <div className={`pixid-bottom ${isOpen ? "dimmed" : ""}`}>
      <Container className="cart-pixid-bottom" justify="stretch" align="lower">
        {isOpen && (
          <Container className="price-detail" justify="stretch" gap={10} surface="primary">
            <Container display="flex" justify="sides">
              <Text weight="semibold">결제금액</Text>
              <button className="icon-wrapper display-flex" onClick={() => setIsOpen(false)}>
                <Icon iconNm="close" iconColor="tertiary" iconSize={24} />
              </button>
            </Container>
            <Container display="flex" justify="sides">
              <Text>주문상품 수량</Text>
              <Text weight="semibold">{formatNumberStr(priceDetail.count)}개</Text>
            </Container>
            <Container display="flex" justify="sides">
              <Text>총 주문 금액</Text>
              <Text weight="semibold">{formatNumberStr(priceDetail.totalPrice)}</Text>
            </Container>
            <Container display="flex" justify="sides">
              <Text>총 할인 금액</Text>
              <Text weight="semibold">{formatNumberStr(priceDetail.totalDiscount)}</Text>
            </Container>
            <Container display="flex" justify="sides">
              <Text>배송비</Text>
              <Text weight="semibold">0원</Text>
            </Container>
          </Container>
        )}
        <Container className="price-btn" display="flex" justify="sides" surface="primary">
          <button className="icon-wrapper display-flex gap-2" onClick={() => setIsOpen(!isOpen)}>
            <Text usage="title">
              총 {formatNumberStr(priceDetail.totalPrice - priceDetail.totalDiscount)}원
            </Text>
            <Icon iconNm={isOpen ? "chevronLess" : "chevronMore"} iconSize={32} />
          </button>
          <Button property="invert" size="large">
            결제하기
          </Button>
        </Container>
      </Container>
    </div>
  );
}
