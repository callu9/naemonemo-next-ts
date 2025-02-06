import { Gate } from "@/app/api/gates/route";
import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import { Text } from "@/atom/Text";

export default function GateListItem({ gateId, gateTitle, imageUrl }: Gate) {
  // const GateWrapper = styled.div`
  //   // width: 100%;
  //   min-width: max-content;
  //   border: 1px solid var(--gray-300);
  //   padding: 4px 12px 4px 4px;
  //   background-color: white;
  //   border-radius: 9999px;
  //   cursor: pointer;
  //   ${layout.flex({ justify: "flex-start", spacing: 8 })}
  //   & > * {
  //     cursor: pointer;
  //   }
  //   & .grid-container {
  //     flex-grow: 1;
  //   }
  // `;
  // const ImageWrapper = styled.div`
  //   width: 38px;
  //   height: 38px;
  //   border-radius: 100%;
  //   overflow: hidden;
  //   border: 1px solid var(--gray-200);
  //   & > img {
  //     object-fit: cover;
  //   }
  // `;
  return (
    <Container className={`gate-list-item-${gateId} display-flex justify-left spacing-8`}>
      <div>
        <img src={imageUrl} alt="게이트 미리보기 이미지" />
      </div>
      <Container display="flex" justify="sides">
        <Text usage="lable">{gateTitle}</Text>
        <Icon iconNm="chevronRight" iconColor="secondary" />
      </Container>
    </Container>
  );
}
