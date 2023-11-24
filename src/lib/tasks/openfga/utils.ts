import { transformer } from "@openfga/syntax-transformer";
import { readAuthModelDSL, writeAuthModelJSON } from "@/lib/tasks/io";

export function transformModel() {
  const dslString = readAuthModelDSL();
  const jsonStringModel = transformer.transformDSLToJSON(dslString);
  writeAuthModelJSON(jsonStringModel);
}
