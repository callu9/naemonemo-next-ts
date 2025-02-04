import { Container } from "@/atom/Container";
import { Heading } from "@/atom/Text";
import Card from "@/components/Card";
import { feeds } from "@/mocks";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type Feed = typeof feeds;

export const getServerSideProps = (async () => {
  const res = await fetch("http://localhost:3000/api/feeds");
  const feedList = (await res.json()).data;
  return { props: { feedList } };
}) satisfies GetServerSideProps<{ feedList?: Feed }>;

export default function Home({ feedList }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Heading>Slider Area</Heading>
      <Heading>Gates Area</Heading>
      <Container spacing={60}>
        {feedList?.map((feed: Feed[0]) => (
          <Card key={feed.feedNo} {...feed} />
        ))}
      </Container>
    </div>
  );
}
