import { Banner } from "@/app/api/banner/route";
import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";

export default function SlideItem({ bannerNo, bannerTitle, bannerContent, imageUrl }: Banner) {
  const renderParagraph = (keyNm: string, paragraph: string) => {
    const splited = paragraph.split(/(\n)/);
    console.log(splited);

    return splited.map((line: string, idx: number) => {
      return line === "\n" ? <br key={`${bannerNo}-${keyNm}-break-${idx}`} /> : line;
    });
  };
  return (
    <Container
      className="slide-list-item"
      justify="left"
      align="lower"
      surface="tertiary"
      id={`banner-${bannerNo}`}
    >
      <img src={imageUrl} alt="슬라이드 배너 이미지" />
      <Container gap={12} color="invert">
        <Text usage="headline">{renderParagraph("title", bannerTitle)}</Text>
        <Text>{renderParagraph("content", bannerContent)}</Text>
      </Container>
    </Container>
  );
}
