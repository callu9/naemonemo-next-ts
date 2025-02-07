import { gates } from "@/mocks";

export type GateList = typeof gates;
export type Gate = GateList[0];

export async function GET() {
  return new Response(JSON.stringify(gates), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
export async function getGateList() {
  const res = await fetch("http://localhost:3000/api/gates");
  const gateList = await res.json();
  return gateList;
}
