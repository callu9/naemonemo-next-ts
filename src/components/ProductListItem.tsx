import { Container } from "@/atom/Container";
import { Body } from "@/atom/Text";
import { Product } from "@/pages/api/feeds";
import styled from "styled-components";
import ToggleIcon from "../assets/icon/toggledIconButton_false.svg";

export default function ProductListItem({ imageUrl, productName, price }: Product) {
  const ProductWrapper = styled.div`
    padding: 12px 0;
    border-top: 1px solid var(--gray-200);
    & .product-info {
      width: 100%;
    }
    & .product-name {
      height: 34px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;
  const ThumbnailWrapper = styled.div`
    width: 60px;
    min-width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 2px;
    & > img {
      object-fit: cover;
    }
  `;
  const ToggledIconButton = styled.button`
    border: 0;
    padding: 0;
    margin: 0;O
    width: 24px;
    height: 24px;
    background-color: transparent;
    cursor: pointer;
  `;
  const StyledIcon = styled(ToggleIcon)`
    width: 24px;
  `;
  return (
    <ProductWrapper>
      <Container className="product-list-item" display="flex" justify="space-between" spacing={16}>
        <ThumbnailWrapper>
          <img src={imageUrl} alt="상품 이미지" />
        </ThumbnailWrapper>
        <Container className="product-info" display="grid" spacing={8}>
          <Body className="product-name" weight={600}>
            {productName}
          </Body>
          <Body>{new Intl.NumberFormat("ko-KR").format(price)}원</Body>
        </Container>
        <ToggledIconButton>
          <StyledIcon width="24" height="24" />
        </ToggledIconButton>
      </Container>
    </ProductWrapper>
  );
}
