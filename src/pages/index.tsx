import { Container } from "@/atom/Container";
import { Heading } from "@/atom/Text";
import Card from "@/components/Card";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Feed, getFeedList } from "./api/feeds";

export const getServerSideProps = (async () => {
  const feedList = await getFeedList();
  return { props: { feedList } };
}) satisfies GetServerSideProps<{ feedList?: Feed }>;

export default function Home({ feedList }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="grid gap-56">
      <Container className="slider-card-list" bgColor="invert" radius={8} padding="16px 8px">
        <Heading fontColor="invert">Slider Area</Heading>
      </Container>
      <Container className="slider-card-list" bgColor="invert" radius={8} padding="16px 8px">
        <Heading fontColor="invert">Gates Area</Heading>
      </Container>
      <Container className="feed-card-list" spacing={60}>
        {feedList?.map((feed: Feed[0]) => (
          <Card key={feed.feedNo} {...feed} />
        ))}
      </Container>
    </div>
  );
}
