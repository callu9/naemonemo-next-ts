import { feeds } from "@/mocks";

export type Feed = {
  feedNo: number;
  feedTitle: string;
  feedContents: string;
  relatedProducts: RelatedProduct[];
  recommendCode: number;
  feedLink?: string;
  imageUrl?: string;
};
export type RelatedProduct = {
  productNo: number;
  productName: string;
  price: number;
  imageUrl: string;
  availableCoupon: boolean;
  priorityScore: number;
};

export async function GET() {
  const resultList = feeds.map((feed) => {
    const relatedProducts = feed.relatedProducts?.map((item) => ({
      ...item,
    }));
    return { ...feed, relatedProducts };
  });

  return new Response(JSON.stringify(resultList), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
export async function getFeedList() {
  const res = await fetch("http://localhost:3000/api/feeds");
  const feedList = await res.json();
  return feedList;
}
