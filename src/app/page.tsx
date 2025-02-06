import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import Feeds from "@/template/Feeds";
import Gates from "@/template/Gates";

export default function Home() {
  return (
    <div className="grid gap-56">
      <Container className="slider-list" radius={8} style={{ padding: "16px 8px" }}>
        <Text usage="display">Slider Area</Text>
      </Container>
      <Gates />
      <Feeds />
    </div>
  );
}
