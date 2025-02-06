import { Feed } from "@/app/api/feeds/route";
import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import { Button } from "./common/Button";
import ProductListItem from "./ProductListItem";
import { HTMLAttributes } from "react";

export default function Card({ feedTitle, feedContents, imageUrl, relatedProducts }: Feed) {
  const CardWrapper = (props: HTMLAttributes<HTMLDivElement>) => (
    <div
      {...{ props }}
      style={`
    width: 100vw;
    max-width: 335px;
    border-radius: 12px;
    overflow: hidden;
    padding: 0 0 18px;
  `}
    />
  );
  const ImageWrapper = (props: HTMLAttributes<HTMLDivElement>) => (
    <div
      {...{ props }}
      style={`
    width: 100%;
    aspect-ratio: 1;
    & > img {
      object-fit: cover;
    }
  `}
    />
  );
  return (
    <Container className="feed-card" spacing={12}>
      <CardWrapper className="card surface-secondary">
        {imageUrl && (
          <ImageWrapper>
            <img src={imageUrl} alt="카드 이미지" />
          </ImageWrapper>
        )}
        <Container spacing={8} style={{ padding: "18px 20px 0" }}>
          <Text usage="title">{feedTitle}</Text>
          <Text>{feedContents}</Text>
        </Container>
        {relatedProducts && (
          <Container className="product-list" style={{ margin: "18px 20px 0" }}>
            {relatedProducts.map((product) => (
              <ProductListItem key={product.productNo} {...product} />
            ))}
          </Container>
        )}
      </CardWrapper>
      <Button property="invert">${relatedProducts ? "" : "모든 "}추천상품 보러가기</Button>
    </Container>
  );
}
