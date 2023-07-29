import { NextApiRequest } from "next";
import { Claims } from "@auth0/nextjs-auth0";
import { fgaClient } from "@/lib/authz";

function queryParameterAsString(value: any): string {
  if (typeof value === "string") {
    return value;
  }
  return "";
}

export function getDocumentFromRequest(
  req: Pick<NextApiRequest, "query">
): string {
  return queryParameterAsString(req.query.document);
}

export async function isAuthorized(
  userClaim: Claims,
  document: string,
  relation: string
): Promise<boolean> {
  const user = `user:${userClaim.email}`;
  const object = `document:${document}`;
  const result = await fgaClient.check({
    user: user,
    relation,
    object,
  });
  return !!result?.allowed;
}
