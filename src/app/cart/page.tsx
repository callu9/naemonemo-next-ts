import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import { Text } from "@/atom/Text";
import { Button } from "@/components/common/Button";
import RecommendList from "@/template/products/RecommendList";
import type { Metadata } from "next";
import "./cart.scss";

export const metadata: Metadata = {
  title: "내모네모 - 장바구니",
  description: "네모 속 나의 취향을 찾아보세요",
};

export default function Cart() {
  return (
    <Container surface="tertiary" justify="stretch" gap={10}>
      <Container
        className="cart-empty"
        surface="primary"
        display="flex"
        direction="column"
        gap={16}
      >
        <Text fontColor="secondary">장바구니에 담은 상품이 없어요</Text>
        <Button property="tertiary">
          <Text weight="semibold">마음에 드는 상품 찾으러 가기</Text>
          <Icon iconNm="chevronRight" />
        </Button>
      </Container>
      <Container surface="primary" justify="stretch" className="recommend-area">
        <div className="recommend-area-header">
          <Text fontStyle="large" weight="bold">
            담으신 상품과 비슷한 추천 상품
          </Text>
        </div>
        <RecommendList codeList={[0]} />
      </Container>
    </Container>
  );
}
