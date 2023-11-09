import { OpenFgaClient } from "@openfga/sdk";

export const STORE_NAME = "nextjs_auth_playground";

async function getStoreId(storeName = STORE_NAME) {
  const fgaClient = new OpenFgaClient({
    apiScheme: process.env.OPENFGA_API_SCHEME,
    apiHost: process.env.OPENFGA_API_HOST,
  });
  const response = await fgaClient.listStores();
  if (response.stores?.length === 0) {
    throw new Error("There is no stores");
  }
  const targetStore = response.stores?.filter((s) => s.name === storeName);
  if (targetStore.length !== 1) {
    throw new Error("There are more than one stores with the target name");
  }
  return targetStore[0].id;
}

export const fgaClient = new OpenFgaClient({
  apiScheme: process.env.OPENFGA_API_SCHEME,
  apiHost: process.env.OPENFGA_API_HOST,
  storeId: await getStoreId(),
});
