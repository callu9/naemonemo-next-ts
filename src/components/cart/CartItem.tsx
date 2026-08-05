import type { CartItem as ItemProps } from "@/lib/cart";
import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import { Text } from "@/atom/Text";
import { Button } from "../common/Button";
import QuantityStepper from "./QuantityStepper";
import { formatWon } from "@/lib/format";
import useCartStore from "@/store/cart";
import Image from "next/image";

export default function CartItem({
  item,
  checked = false,
  onSelect,
}: {
  item: ItemProps;
  checked: boolean;
  onSelect: (productNo: number) => void;
}) {
  const updateCartItemCount = useCartStore((state) => state.updateCartItemCount);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const strPriceWon = (price: number) => formatWon(item.availableCoupon ? price * 0.9 : price);
  return (
    <Container className="cart-item" gap={4}>
      <Container className="item-info">
        <Container className="item-name" display="flex" justify="sides" gap={12}>
          <button className="display-flex alugn-center" onClick={() => onSelect(item.productNo)}>
            {checked ? (
              <Icon iconNm="checkedSquare" iconSize={24} />
            ) : (
              <Icon iconNm="uncheckedSquare" iconSize={24} />
            )}
          </button>
          <Text weight="semibold">{item.productName}</Text>
          <button className="icon-wrapper" onClick={() => removeFromCart([item.productNo])}>
            <Icon iconNm="close" iconSize={24} iconColor="tertiary" />
          </button>
        </Container>
        <Container className="item-detail" display="flex" justify="left" gap={12}>
          <div className="img-wrapper">
            {item.imageUrl && <Image src={item.imageUrl} alt="장바구니 상품 이미지" fill sizes="72px" />}
          </div>
          <Container justify="left" align="upper">
            <Text>{strPriceWon(item.price)}</Text>
            <Text fontColor="tertiary">할인적용: {item.availableCoupon ? "10%" : "없음"}</Text>
            <Text fontColor="tertiary">배송비: 내모배송 무료</Text>
          </Container>
        </Container>
      </Container>
      <Container className="item-price" display="flex" justify="sides">
        <Text usage="lable">{strPriceWon(item.price * item.count)}</Text>
        <Container className="item-btns" display="flex" gap={12}>
          {item.availableCoupon && (
            <Button property="outlined" size="small">
              쿠폰 적용
            </Button>
          )}
          <QuantityStepper value={item.count} onChange={(count) => updateCartItemCount(item, count)} />
        </Container>
      </Container>
    </Container>
  );
}
