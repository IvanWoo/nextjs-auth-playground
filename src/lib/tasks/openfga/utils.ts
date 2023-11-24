import { transformer } from "@openfga/syntax-transformer";
import {
  readAuthModelDSL,
  readAuthModelJSON,
  writeAuthModelJSON,
} from "@/lib/tasks/io";
import { getFgaClient } from "@/lib/authz";

export function transformModel() {
  const dslString = readAuthModelDSL();
  const jsonStringModel = transformer.transformDSLToJSON(dslString);
  writeAuthModelJSON(jsonStringModel);
}

async function writeAuthzModel() {
  const fgaClient = getFgaClient();
  const model = readAuthModelJSON();
  console.log(`Target authz model is: ${JSON.stringify(model)}`);
  const { authorization_model_id: modelId } =
    await fgaClient.writeAuthorizationModel(model);
  return { modelId };
}

export async function migrateAuthzModel() {
  return await writeAuthzModel();
}
