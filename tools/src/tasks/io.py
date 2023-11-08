import json
from pathlib import Path

LIB_DIR = Path(__file__).parent.resolve()
REPO_DIR = LIB_DIR.parent.parent.resolve()
OPENFGA_AUTH_MODEL_DIR = f"{REPO_DIR}/openfga"
OPENFGA_AUTH_JSON_FILE = f"{OPENFGA_AUTH_MODEL_DIR}/model.json"


def read_file(path: str) -> str:
    with open(path, "r") as file:
        data = file.read()
    return data


def read_json(path: str) -> dict:
    return json.loads(read_file(path))
