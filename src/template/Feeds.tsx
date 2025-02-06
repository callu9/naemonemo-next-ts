import { Feed, getFeedList } from "@/app/api/feeds/route";
import { Container } from "@/atom/Container";
import Card from "@/components/FeedItem";

export default async function Feeds() {
  const feedList = await getFeedList();
  return (
    <div className="feed-card-list" spacing={60}>
      {feedList?.map((feed: Feed) => (
        <Card key={feed.feedNo} {...feed} />
      ))}
    </div>
  );
}
