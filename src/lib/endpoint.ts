import { NextApiRequest } from "next";

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
