const fs = require("fs");
const path = require("path");

const REPO_DIR = path.join(__dirname, "../");
const PAGES_DIR = path.join(REPO_DIR, "/src/pages");

function readDir(dirPath, prefix = "") {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const folders = entries
    .filter((file) => file.isDirectory())
    .map((folder) =>
      readDir(path.join(dirPath, folder.name), `${prefix}/${folder.name}`)
    );

  const files = entries
    .filter((file) => file.isFile())
    .filter((file) =>
      ["_app", "_document", "_error", "index"].every(
        (x) => !file.name.includes(x)
      )
    )
    .map((file) => `${prefix}/${file.name}`);

  return Array.prototype.concat(...files, ...folders);
}

const routes = readDir(PAGES_DIR);
const apiRoutes = readDir(path.join(PAGES_DIR, "/api"));

console.log("--- Routes ---");
routes.forEach((route) => {
  console.log(route.replace(".ts", ""));
});

console.log("--- API Routes ---");
apiRoutes.forEach((route) => {
  console.log(route.replace(".ts", ""));
});
