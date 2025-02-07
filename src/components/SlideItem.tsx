import { Banner } from "@/app/api/banner/route";
import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";

const renderParagraph = (paragraph: string) => {
  const splited = paragraph.split("\n");
  return splited.map((line: string, idx: number) => {
    return (
      <>
        <span key={idx}>{line}</span>
        {idx !== splited.length - 1 && <br />}
      </>
    );
  });
};
export default function SlideItem({ bannerTitle, bannerContent, imageUrl }: Banner) {
  return (
    <Container className="slide-item" justify="left" align="lower" surface="tertiary">
      <img src={imageUrl} alt="슬라이드 배너 이미지" />
      <Container gap={16} color="invert">
        <Text usage="headline">{renderParagraph(bannerTitle)}</Text>
        <Text>{renderParagraph(bannerContent)}</Text>
      </Container>
    </Container>
  );
}
