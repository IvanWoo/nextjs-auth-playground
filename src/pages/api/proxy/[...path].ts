import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  query: any;
  headers: any;
  msg: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    query: req.query,
    headers: req.headers,
    msg: "catch all endpoint",
  });
}
