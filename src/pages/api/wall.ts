import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

type Data = {
  name: string;
  accessToken: string;
  timestamp: string;
};

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { accessToken } = await getAccessToken(req, res);

  res.status(200).json({
    name: "John Doe",
    accessToken: accessToken || "",
    timestamp: new Date().toISOString(),
  });
});
