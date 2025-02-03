import { Container } from "@/atom/Container";
import { Body, Title } from "@/atom/Text";
import styled from "styled-components";
import { Button } from "./common/Button";
import ToggleIcon from "../assets/icon/toggledIconButton_false.svg";
import Image from "next/image";

interface CardProps {
  feedNo: number;
  feedTitle: string;
  feedContents: string;
  feedLink?: string;
  imageUrl?: string;
  relatedProducts?: ProductProps[];
  recommendCode: number;
}
interface ProductProps {
  productNo: number;
  productName: string;
  price: number;
  imageUrl: string;
  availableCoupon: boolean;
  priorityScore: number;
}
function ProductListItem({ imageUrl, productName, price }: ProductProps) {
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
    margin: 0;
    width: 24px;
    height: 24px;
    background-color: transparent;
  `;
  const StyledIcon = styled((props) => (
    <Image {...props} src={ToggleIcon} alt="toggled-icon-button image" />
  ))`
    width: 24px;
    height: 24px;
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
          <StyledIcon />
        </ToggledIconButton>
      </Container>
    </ProductWrapper>
  );
}
export default function Card({ feedTitle, feedContents, imageUrl, relatedProducts }: CardProps) {
  const CardWrapper = styled.div`
    width: 100vw;
    max-width: 335px;
    border-radius: 12px;
    overflow: hidden;
    padding: 0 0 18px;
  `;
  const ImageWrapper = styled.div`
    width: 100%;
    aspect-ratio: 1;
    & > img {
      object-fit: cover;
    }
  `;
  return (
    <Container className="feed-card" spacing={12}>
      <CardWrapper className="card surface-secondary">
        <Container spacing={16}>
          {imageUrl ? (
            <ImageWrapper>
              <img src={imageUrl} alt="카드 이미지" />
            </ImageWrapper>
          ) : (
            <Container padding="2px 0 0" />
          )}
          <Container spacing={6} padding="0 20px">
            <Title>{feedTitle}</Title>
            <Body>{feedContents}</Body>
          </Container>
        </Container>
        {relatedProducts && (
          <Container className="product-list" padding="18px 20px">
            {relatedProducts.map((product) => (
              <ProductListItem key={product.productNo} {...product} />
            ))}
          </Container>
        )}
      </CardWrapper>
      <Button property="invert" text={`${relatedProducts ? "" : "모든 "}추천상품 보러가기`} />
    </Container>
  );
}
