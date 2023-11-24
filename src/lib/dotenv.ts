import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

export function loadDotEnv() {
  const myEnv = dotenv.config({ path: ".env.local" });
  const obj = dotenvExpand.expand(myEnv).parsed;
  return obj;
}
