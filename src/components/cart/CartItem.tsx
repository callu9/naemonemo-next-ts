import { CartItem as ItemProps } from "@/app/api/cart/route";
import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import { Text } from "@/atom/Text";
import { Button } from "../common/Button";
import useCartStore, { cartStoreType } from "@/store/cart";

export default function CartItem({
  item,
  checked = false,
  onSelect,
}: {
  item: ItemProps;
  checked: boolean;
  onSelect: (productNo: number) => void;
}) {
  const { updateCartItemCount, removeFromCart } = useCartStore() as cartStoreType;
  const strPriceWon = (price: number) =>
    `${new Intl.NumberFormat("ko-KR").format(item.availableCoupon ? price * 0.9 : price)}원`;
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
            {item.imageUrl && <img src={item.imageUrl} alt="장바구니 상품 이미지" />}
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
          <Container display="flex" align="center" gap={6} className="adjust-count button-outlined">
            <button
              className="icon-wrapper"
              onClick={() => item.count > 1 && updateCartItemCount(item, item.count - 1)}
              disabled={item.count <= 1}
            >
              <Icon iconNm="remove" iconSize={18} />
            </button>
            <Text fontStyle="small">{item.count}</Text>
            <button
              className="icon-wrapper"
              onClick={() => item.count < 999 && updateCartItemCount(item, item.count + 1)}
              disabled={item.count >= 999}
            >
              <Icon iconNm="add" iconSize={18} />
            </button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
