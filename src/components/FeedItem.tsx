import { Feed } from "@/app/api/feeds/route";
import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import { Button } from "./common/Button";
import ProductListItem from "./ProductListItem";
import ImageBox from "@/atom/ImageBox";

export default function Card({ feedTitle, feedContents, imageUrl, relatedProducts }: Feed) {
  return (
    <Container className="feed-card" gap={12}>
      <Container className="card" surface="secondary" radius={4}>
        {imageUrl && <ImageBox imageUrl={imageUrl} alt="카드 이미지" width="100%" height="100%" />}
        <Container className="card-info" gap={8}>
          <Text usage="title">{feedTitle}</Text>
          <Text>{feedContents}</Text>
        </Container>
        {relatedProducts && (
          <Container className="product-list">
            {relatedProducts.map((product) => (
              <ProductListItem key={product.productNo} {...product} />
            ))}
          </Container>
        )}
      </Container>
      <Button property="invert">{relatedProducts.length ? "" : "모든 "}추천상품 보러가기</Button>
    </Container>
  );
}
