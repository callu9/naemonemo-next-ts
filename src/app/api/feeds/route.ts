import { getFeeds } from "@/lib/catalog";

export async function GET() {
  return Response.json(getFeeds());
}
