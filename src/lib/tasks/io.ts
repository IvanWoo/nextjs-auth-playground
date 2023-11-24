import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_DIR = path.join(__dirname, "../../../");
const AUTH_MODEL_DSL_FILE = path.join(REPO_DIR, "openfga/model.fga");
const AUTH_MODEL_JSON_FILE = path.join(REPO_DIR, "openfga/model.json");

function readText(path: string) {
  return fs.readFileSync(path).toString();
}

function readJSON(path: string) {
  return JSON.parse(readText(path));
}

function write(path: string, data: string) {
  fs.writeFileSync(path, data);
}

export function readAuthModelJSON() {
  return readJSON(AUTH_MODEL_JSON_FILE);
}

export function readAuthModelDSL() {
  return readText(AUTH_MODEL_DSL_FILE);
}

export function writeAuthModelJSON(data: string) {
  write(AUTH_MODEL_JSON_FILE, JSON.stringify(JSON.parse(data), null, 2));
}
