import { OpenFgaClient } from "@openfga/sdk";

export const fgaClient = new OpenFgaClient({
  apiScheme: process.env.OPENFGA_API_SCHEME,
  apiHost: process.env.OPENFGA_API_HOST,
  storeId: process.env.OPENFGA_STORE_ID,
  authorizationModelId: process.env.OPENFGA_AUTHORIZATION_MODEL_ID,
});
