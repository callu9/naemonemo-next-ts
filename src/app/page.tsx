import { Container } from "@/atom/Container";
import { MainHeader } from "@/components/common/Header";
import Feeds from "@/template/Feeds";
import Gates from "@/template/Gates";
import Slides from "@/template/Slides";
import { getBanners, getFeeds, getGates } from "@/lib/catalog";
import styles from "./home.module.css";

export default function Home() {
  const slideList = getBanners();
  const gateList = getGates();
  const feedList = getFeeds();
  return (
    <>
      <MainHeader />
      <Container className={styles.home} gap={48}>
        <Slides bannerList={slideList} />
        <Gates gateList={gateList} />
        <Feeds feedList={feedList} />
      </Container>
    </>
  );
}
