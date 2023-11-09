import fs from "fs";
import path from "path";
import { OpenFgaClient } from "@openfga/sdk";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { STORE_NAME } from "./utils.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_DIR = path.join(__dirname, "../../");
const MODEL_JSON_FILE = path.join(REPO_DIR, "openfga/model.json");

function readJSON(path) {
  return JSON.parse(fs.readFileSync(path));
}

function deleteStore(storeId) {
  const openFga = new OpenFgaClient({
    apiScheme: process.env.OPENFGA_API_SCHEME,
    apiHost: process.env.OPENFGA_API_HOST,
    storeId: storeId,
  });

  openFga.deleteStore();
}

async function writeAuthzModel(storeId) {
  const fgaClient = new OpenFgaClient({
    apiScheme: process.env.OPENFGA_API_SCHEME,
    apiHost: process.env.OPENFGA_API_HOST,
    storeId: storeId,
  });
  const model = readJSON(MODEL_JSON_FILE);
  const { authorization_model_id: modelId } =
    await fgaClient.writeAuthorizationModel(model);
  return { modelId: modelId };
}

async function main() {
  const openFga = new OpenFgaClient({
    apiScheme: process.env.OPENFGA_API_SCHEME,
    apiHost: process.env.OPENFGA_API_HOST,
  });
  const storeName = STORE_NAME;

  const { stores } = await openFga.listStores({
    name: storeName,
  });
  console.log(stores);

  stores.forEach((store) => {
    deleteStore(store.id);
  });

  const { id: storeId } = await openFga.createStore({
    name: storeName,
  });
  console.log(`storeId: ${storeId}`);
  const { modelId } = await writeAuthzModel(storeId);
  console.log(`modelId: ${modelId}`);
}

main();
