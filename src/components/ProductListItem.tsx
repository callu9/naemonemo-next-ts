import { Container } from "@/atom/Container";
import { Product } from "@/app/api/feeds/route";
import ToggleIcon from "../assets/icon/toggledIconButton_false.svg";
import { Text } from "@/atom/Text";
import ImageBox from "@/atom/ImageBox";

export default function ProductListItem({ imageUrl, productName, price }: Product) {
  return (
    <div className="product-list-item">
      <Container className="product-wrapper" display="flex" justify="sides" gap={16}>
        {imageUrl && (
          <ImageBox imageUrl={imageUrl} alt="상품 이미지" width="60px" height="60px" radius={8} />
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
            {productName}
          </Text>
          <Text>{new Intl.NumberFormat("ko-KR").format(price)}원</Text>
        </Container>
        <button className="toggled-icon-button">
          <ToggleIcon width="24" height="24" />
        </button>
      </Container>
    </div>
  );
}
