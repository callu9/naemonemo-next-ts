import { Gate } from "@/app/api/gates/route";
import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import ImageBox from "@/atom/ImageBox";
import { Text } from "@/atom/Text";

export default function GateListItem({ gateTitle, imageUrl }: Gate) {
  return (
    <Container className="gate-wrapper" display="flex" justify="left" gap={8} radius={8}>
      {imageUrl && (
        <ImageBox
          imageUrl={imageUrl}
          alt="게이트 미리보기 이미지"
          width="38px"
          height="38px"
          radius={8}
          className="border-default"
        />
      )}
      <Container className="gate-info" display="flex" justify="sides">
        <Text usage="lable">{gateTitle}</Text>
        <Icon iconNm="chevronRight" iconColor="secondary" />
      </Container>
    </Container>
  );
}
