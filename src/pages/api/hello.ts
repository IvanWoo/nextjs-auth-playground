import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;
  const defaultName = "John Doe";
  res.status(200).json({ name: data.name || defaultName });
}
