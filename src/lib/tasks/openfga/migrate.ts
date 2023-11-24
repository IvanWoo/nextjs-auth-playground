import { migrateAuthzModel } from "./utils";
import { loadDotEnv } from "@/lib/dotenv";

const main = async () => {
  console.debug(loadDotEnv());
  try {
    const model = await migrateAuthzModel();
    console.info(model);
  } catch (error) {
    console.error(error);
  }
};

main();
