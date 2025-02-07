import { Container } from "@/atom/Container";
import Feeds from "@/template/Feeds";
import Gates from "@/template/Gates";
import "./home.scss";
import Slides from "@/template/Slides";
export default async function Home() {
  return (
    <Container gap={48}>
      <Slides />
      <Gates />
      <Feeds />
    </Container>
  );
}
