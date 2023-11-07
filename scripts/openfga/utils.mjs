import { OpenFgaClient } from "@openfga/sdk";

export const fgaClient = new OpenFgaClient({
  apiScheme: process.env.FGA_API_SCHEME,
  apiHost: process.env.FGA_API_HOST,
  storeId: process.env.FGA_STORE_ID,
  authorizationModelId: process.env.FGA_MODEL_ID,
});
