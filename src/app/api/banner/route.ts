import { getBanners } from "@/lib/catalog";

export async function GET() {
  return Response.json(getBanners());
}
