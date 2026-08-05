import { getGates } from "@/lib/catalog";

export async function GET() {
  return Response.json(getGates());
}
