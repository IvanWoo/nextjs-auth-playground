import { fgaApi } from "./utils.mjs";

async function main(object) {
  let continuation_token = null;
  const tuple_key = {
    object,
  };
  let tuples = [];
  while (true) {
    const result = await fgaApi.read({ tuple_key, continuation_token });
    continuation_token = result.continuation_token;
    tuples = tuples.concat(result.tuples);
    if (continuation_token === "") {
      break;
    }
  }
  console.log(JSON.stringify(tuples));
  return tuples;
}

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log("Usage: yarn run openfga:read-all <object>");
  process.exit(1);
}
main(args[0]);
