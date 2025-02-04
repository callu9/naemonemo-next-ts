import { Container } from "@/atom/Container";
import { Body, Title } from "@/atom/Text";
import { Feed } from "@/pages/api/feeds";
import styled from "styled-components";
import { Button } from "./common/Button";
import ProductListItem from "./ProductListItem";

export default function Card({ feedTitle, feedContents, imageUrl, relatedProducts }: Feed) {
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
        {imageUrl && (
          <ImageWrapper>
            <img src={imageUrl} alt="카드 이미지" />
          </ImageWrapper>
        )}
        <Container spacing={6} padding="18px 20px 0">
          <Title>{feedTitle}</Title>
          <Body>{feedContents}</Body>
        </Container>
        {relatedProducts && (
          <Container className="product-list" margin="18px 20px 0">
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
