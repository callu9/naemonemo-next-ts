import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import Feeds from "@/template/Feeds";
import Gates from "@/template/Gates";
import "./home.scss";

export default async function Home() {
  return (
    <Container gap={56}>
      <Container className="slider-list">
        <Text usage="display">Slider Area</Text>
      </Container>
      <Gates />
      <Feeds />
    </Container>
  );
}
