import { gates } from "@/mocks";
import { HTTP_STATUS_CODE, RESPONSE_MESSAGE, RESPONSE_NOT_METHOD_ALLOWED } from "@/mocks/util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: RESPONSE_MESSAGE.SUCCESS,
      code: HTTP_STATUS_CODE.OK,
      data: gates,
      errors: null,
    });
  } else return res.status(HTTP_STATUS_CODE.NOT_METHOD_ALLOWED).json(RESPONSE_NOT_METHOD_ALLOWED);
}

export type GateList = typeof gates;
export type Gate = GateList[0];

export async function getGateList() {
  const res = await fetch("http://localhost:3000/api/gates");
  const gateList = (await res.json()).data;
  return gateList;
}
