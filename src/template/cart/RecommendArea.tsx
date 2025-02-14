import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import RecommendList from "../products/RecommendList";

export default function RecommendArea({
  codeList,
  onUpdate,
}: {
  codeList: number[];
  onUpdate: () => void;
}) {
  return (
    <Container surface="primary" justify="left" align="upper" className="recommend-area">
      <div className="recommend-area-header">
        <Text fontStyle="large" weight="bold">
          {codeList.length > 0 ? "담으신 상품과 비슷한" : "고객님을 위한"} 추천 상품
        </Text>
      </div>
      <Container surface="primary" align="upper" className="recommend-product-area">
        {codeList.length > 0 && <RecommendList codeList={codeList} onUpdate={onUpdate} />}
      </Container>
    </Container>
  );
}
