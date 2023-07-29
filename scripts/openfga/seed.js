const fs = require("fs");
const path = require("path");
const { OpenFgaClient } = require("@openfga/sdk");

const REPO_DIR = path.join(__dirname, "../../");
const MODEL_JSON_FILE = path.join(REPO_DIR, "scripts/openfga/model.json");

function readJSON(path) {
  return JSON.parse(fs.readFileSync(path));
}

function deleteStore(storeId) {
  const openFga = new OpenFgaClient({
    apiScheme: process.env.FGA_API_SCHEME,
    apiHost: process.env.FGA_API_HOST,
    storeId: storeId,
  });

  openFga.deleteStore();
}

async function writeAuthzModel(storeId) {
  const fgaClient = new OpenFgaClient({
    apiScheme: process.env.FGA_API_SCHEME,
    apiHost: process.env.FGA_API_HOST,
    storeId: storeId,
  });
  const model = readJSON(MODEL_JSON_FILE);
  const { authorization_model_id: authzId } =
    await fgaClient.writeAuthorizationModel(model);
  return authzId;
}

async function main() {
  const openFga = new OpenFgaClient({
    apiScheme: process.env.FGA_API_SCHEME,
    apiHost: process.env.FGA_API_HOST,
  });
  const storeName = "nextjs_auth_playground";

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
  const { authzId } = await writeAuthzModel(storeId);
  console.log(`authzId: ${authzId}`);
}

main();
