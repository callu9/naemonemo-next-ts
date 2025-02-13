import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import RecommendList from "../products/RecommendList";

export default function RecommendArea({ codeList }: { codeList: number[] }) {
  return (
    <Container surface="primary" justify="stretch" className="recommend-area">
      <div className="recommend-area-header">
        <Text fontStyle="large" weight="bold">
          {codeList.length > 0 ? "담으신 상품과 비슷한" : "고객님을 위한"} 추천 상품
        </Text>
      </div>
      {codeList.length > 0 && <RecommendList codeList={codeList} />}
    </Container>
  );
}
