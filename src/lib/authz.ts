import { OpenFgaClient } from "@openfga/sdk";

let storeId = process.env.OPENFGA_AUTHORIZATION_MODEL_ID || null;

async function getStoreId(
  apiScheme: string,
  apiHost: string,
  storeName: string
) {
  if (storeId != null) {
    return storeId;
  }
  const fgaClient = new OpenFgaClient({
    apiScheme,
    apiHost,
  });

  const results = await fgaClient.listStores();
  const matchedStores = results.stores?.filter((x) => x.name === storeName);
  if (matchedStores == null || matchedStores.length === 0) {
    throw new Error(`Authz store ${storeName} not found`);
  } else if (matchedStores.length === 1 && matchedStores[0]?.id != null) {
    storeId = matchedStores[0].id;
  } else {
    throw new Error(`Multiple stores have the same name ${storeName}`);
  }
  return storeId;
}

export async function getFgaClient() {
  const apiScheme = process.env.OPENFGA_API_SCHEME || "http";
  const apiHost = process.env.OPENFGA_API_HOST || "localhost:8080";
  const storeName = process.env.OPENFGA_STORE_NAME || "nextjs_auth_playground";
  const authorizationModelId =
    process.env.OPENFGA_AUTHORIZATION_MODEL_ID || undefined;

  const fgaClient = new OpenFgaClient({
    apiScheme: apiScheme,
    apiHost: apiHost,
    storeId: await getStoreId(apiScheme, apiHost, storeName),
    authorizationModelId,
  });
  return fgaClient;
}
