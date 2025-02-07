import { banner } from "@/mocks";

export type BannerList = typeof banner;
export type Banner = BannerList[0];

export async function GET() {
  return new Response(JSON.stringify(banner), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
export async function getBannerList() {
  const res = await fetch("http://localhost:3000/api/banner");
  const bannerList = await res.json();
  return bannerList;
}
