import { Icon } from "@/atom/Icon";
import { Lable } from "@/atom/Text";
import { layout } from "@/foundation/layout";
import { Gate, GateList } from "@/pages/api/gates";
import styled from "styled-components";

function GateListItem({ gateId, gateTitle, imageUrl, linkValue }: Gate) {
  const GateWrapper = styled.div`
    padding: 4px 16px 4px 4px;
    background-color: white;
    border-radius: 9999px;
    border: 1px solid var(--gray-200);
    cursor: pointer;
    ${layout.flex({})}
  `;
  const ImageWrapper = styled.div`
    width: 38px;
    height: 38px;
    border-radius: 100%;
    overflow: hidden;
    & > img {
      object-fit: cover;
    }
  `;
  return (
    <GateWrapper className={`gate-list-item-${gateId}`}>
      <ImageWrapper>
        <img src={imageUrl} alt="게이트 미리보기 이미지" />
      </ImageWrapper>
      <Lable>{gateTitle}</Lable>
      {/* <Icon iconNm="chevronRight" iconColorHex="var(--gray-300)" /> */}
    </GateWrapper>
  );
}
export default function Gates({ gateList }: { gateList: GateList }) {
  const GateListWrapper = styled.div`
    width: max-content;
    ${layout.grid({ justify: "flex-start", direction: "column" })}
    grid-template-row: repeat(2, auto);
    grid-template-columns: repeat(4, auto);
    overflow-x: auto;
  `;
  return (
    <GateListWrapper>
      {gateList?.map((gate: Gate) => (
        <GateListItem key={gate.gateId} {...gate} />
      ))}
    </GateListWrapper>
  );
}
