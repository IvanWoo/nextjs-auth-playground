import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { fgaClient } from "@/lib/authz";
import { getDocumentFromRequest } from "@/lib/endpoint";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userClaim = (await getSession(req, res))?.user;
  if (userClaim == undefined) {
    res.status(400).end();
    return;
  }
  const user = `user:${userClaim.email}`;
  const document = getDocumentFromRequest(req);
  const relation = "can_read";
  const object = `document:${document}`;
  const result = await fgaClient.check({
    user: user,
    relation,
    object,
  });
  if (!result?.allowed) {
    res.status(404).end();
    return;
  }
  res.status(200).json({ relation, document });
});
