import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import { Lable } from "@/atom/Text";
import { layout } from "@/foundation/layout";
import { Gate, GateList } from "@/pages/api/gates";
import styled from "styled-components";

function GateListItem({ gateId, gateTitle, imageUrl, linkValue }: Gate) {
  const GateWrapper = styled.div`
    // width: 100%;
    min-width: max-content;
    border: 1px solid var(--gray-300);
    padding: 4px 12px 4px 4px;
    background-color: white;
    border-radius: 9999px;
    cursor: pointer;
    ${layout.flex({ justify: "flex-start", spacing: 8 })}
    & > * {
      cursor: pointer;
    }
    & .grid-container {
      flex-grow: 1;
    }
  `;
  const ImageWrapper = styled.div`
    width: 38px;
    height: 38px;
    border-radius: 100%;
    overflow: hidden;
    border: 1px solid var(--gray-200);
    & > img {
      object-fit: cover;
    }
  `;
  return (
    <GateWrapper className={`gate-list-item-${gateId}`}>
      <ImageWrapper>
        <img src={imageUrl} alt="게이트 미리보기 이미지" />
      </ImageWrapper>
      <Container display="flex" justify="space-between">
        <Lable>{gateTitle}</Lable>
        <Icon iconNm="chevronRight" iconColor="secondary" />
      </Container>
    </GateWrapper>
  );
}
export default function Gates({ gateList }: { gateList: GateList }) {
  const GateListWrapper = styled.div`
    ${layout.grid({ justify: "flex-start", spacing: 16 })}
    grid-template: repeat(2, 1fr) / repeat(5, 1fr);
    grid-auto-flow: column;
  `;
  return (
    <GateListWrapper>
      {gateList?.map((gate: Gate) => (
        <GateListItem key={gate.gateId} {...gate} />
      ))}
    </GateListWrapper>
  );
}
