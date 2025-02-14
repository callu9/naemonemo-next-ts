import { Feed } from "@/app/api/feeds/route";
import { Container } from "@/atom/Container";
import Card from "@/components/FeedItem";

export default async function Feeds({ feedList }: { feedList: Feed[] }) {
  return (
    <Container className="feed-list" gap={48}>
      {feedList?.map((feed: Feed) => (
        <Card key={feed.feedNo} {...feed} />
      ))}
    </Container>
  );
}
