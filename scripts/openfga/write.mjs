import { fgaClient } from "./utils.mjs";

async function main(user, relation, object) {
  const { tuples } = await fgaClient.read({ user, relation, object });
  if (tuples.length != 0) {
    console.log("tuple already existed");
    return;
  }

  const result = await fgaClient.write({
    writes: [{ user, relation, object }],
  });
  console.log(result);
}

const args = process.argv.slice(2);
if (args.length < 3) {
  console.log("Usage: yarn run openfga:write <user> <relation> <object>");
  process.exit(1);
}
main(args[0], args[1], args[2]);
