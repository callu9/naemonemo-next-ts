import { Container } from "@/atom/Container";
import Feeds from "@/template/Feeds";
import Gates from "@/template/Gates";
import Slides from "@/template/Slides";
import "./home.scss";
import { getBannerList } from "./api/banner/route";

export default async function Home() {
  const slideList = await getBannerList();
  return (
    <Container gap={48}>
      <Slides bannerList={slideList} />
      <Gates />
      <Feeds />
    </Container>
  );
}
