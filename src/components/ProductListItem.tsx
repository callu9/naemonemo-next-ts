import { Container } from "@/atom/Container";
import { Product } from "@/app/api/feeds/route";
import ToggleIcon from "../assets/icon/toggledIconButton_false.svg";
import { Text } from "@/atom/Text";

export default function ProductListItem({ imageUrl, productName, price }: Product) {
  // const ProductWrapper = styled.div`
  //   padding: 12px 0;
  //   border-top: 1px solid var(--gray-200);
  //   & .product-info {
  //     width: 100%;
  //   }
  //   & .product-name {
  //     height: 34px;
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //   }
  // `;
  // const ThumbnailWrapper = styled.div`
  //   width: 60px;
  //   min-width: 60px;
  //   height: 60px;
  //   overflow: hidden;
  //   border-radius: 2px;
  //   & > img {
  //     object-fit: cover;
  //   }
  // `;
  // const ToggledIconButton = styled.button`
  //   border: 0;
  //   padding: 0;
  //   margin: 0;O
  //   width: 24px;
  //   height: 24px;
  //   background-color: transparent;
  //   cursor: pointer;
  // `;
  // const StyledIcon = styled(ToggleIcon)`
  //   width: 24px;
  // `;
  return (
    <div>
      <Container className="product-list-item" display="flex" justify="sides" spacing={16}>
        <div>
          <img src={imageUrl} alt="상품 이미지" />
        </div>
        <Container className="product-info" display="grid" spacing={8}>
          <Text className="product-name" weight="bold">
            {productName}
          </Text>
          <Text>{new Intl.NumberFormat("ko-KR").format(price)}원</Text>
        </Container>
        <button>
          <ToggleIcon width="24" height="24" />
        </button>
      </Container>
    </div>
  );
}
