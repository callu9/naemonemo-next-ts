import { feeds } from "@/mocks";

export type FeedList = typeof feeds;
export type Feed = FeedList[0];
export type Product = Feed["relatedProducts"][0];

export async function GET() {
  return new Response(JSON.stringify(feeds), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
export async function getFeedList() {
  const res = await fetch("http://localhost:3000/api/feeds");
  const feedList = await res.json();
  return feedList;
}
