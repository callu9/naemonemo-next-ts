import { Container } from "@/atom/Container";
import Feeds from "@/template/Feeds";
import Gates from "@/template/Gates";
import Slides from "@/template/Slides";
import { getBannerList } from "./api/banner/route";
import { getFeedList } from "./api/feeds/route";
import { getGateList } from "./api/gates/route";
import "./home.scss";

export default async function Home() {
  const slideList = await getBannerList();
  const gateList = await getGateList();
  const feedList = await getFeedList();
  return (
    <Container gap={48}>
      <Slides bannerList={slideList} />
      <Gates gateList={gateList} />
      <Feeds feedList={feedList} />
    </Container>
  );
}
