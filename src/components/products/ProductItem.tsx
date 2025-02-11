import { Product } from "@/app/api/products/route";
// import IconBag from "@/assets/icon/toggledIconButton_true.svg";
import IconBagEmpty from "@/assets/icon/toggledIconButton_false.svg";
import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";

export default function ProductItem({ imageUrl, availableCoupon, productName, price }: Product) {
  return (
    <Container className="recommend-product-list-item" align="upper" gap={24}>
      <div className="img-wrapper">
        {imageUrl ? <img src={imageUrl} alt="상품 이미지" /> : <div className="thumbnail" />}
        {availableCoupon && (
          <div className="coupon-available display-flex body-extra-small button-invert">쿠폰</div>
        )}
      </div>
      <Container className="product-info-area" display="flex" justify="sides" align="upper" gap={8}>
        <Container className="product-info" align="sides" gap={8}>
          <Text className="product-name">{productName}</Text>
          <Text usage="lable">{new Intl.NumberFormat("ko-KR").format(price)}원</Text>
        </Container>
        <button className="icon-wrapper">
          <IconBagEmpty width="24" height="24" />
        </button>
      </Container>
    </Container>
  );
}
