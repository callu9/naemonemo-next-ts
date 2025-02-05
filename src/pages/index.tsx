import { Container } from "@/atom/Container";
import { Heading } from "@/atom/Text";
import Card from "@/components/Card";
import Gates from "@/components/Gate";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Feed, FeedList, getFeedList } from "./api/feeds";
import { GateList, getGateList } from "./api/gates";

export const getServerSideProps = (async () => {
  const gateList = await getGateList();
  const feedList = await getFeedList();
  return { props: { gateList, feedList } };
}) satisfies GetServerSideProps<{ gateList?: GateList; feedList?: FeedList }>;

export default function Home({
  gateList,
  feedList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="grid gap-56">
      <Container className="slider-list" radius={8} padding="16px 8px">
        <Heading>Slider Area</Heading>
      </Container>
      <Container className="gate-list" style={{ maxWidth: "336px", overflow: "scroll" }}>
        <Gates {...{ gateList }} />
      </Container>
      <Container className="feed-card-list" spacing={60}>
        {feedList?.map((feed: Feed) => (
          <Card key={feed.feedNo} {...feed} />
        ))}
      </Container>
    </div>
  );
}
