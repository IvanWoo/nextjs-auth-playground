import os

import openfga_sdk
from openfga_sdk.sync import OpenFgaClient
from contextlib import contextmanager

OPENFGA_API_SCHEME = os.environ.get("OPENFGA_API_SCHEME", "http")
OPENFGA_API_HOST = os.environ.get("OPENFGA_API_HOST", "localhost:8080")
OPENFGA_STORE_NAME = os.environ.get("OPENFGA_STORE_NAME", "nextjs_auth_playground")


def _get_store_id_by_name(store_name: str = OPENFGA_STORE_NAME):
    configuration = openfga_sdk.ClientConfiguration(
        api_scheme=OPENFGA_API_SCHEME,  # optional, defaults to "https"
        api_host=OPENFGA_API_HOST,  # required, define without the scheme (e.g. api.fga.example instead of https://api.fga.example)
    )
    with OpenFgaClient(configuration) as fga_client:
        target_store = [
            s
            for s in fga_client.list_stores().to_dict()["stores"]
            if s["deleted_at"] is None and s["name"] == store_name
        ]
        if not target_store:
            raise ValueError(f"{store_name=} does not exist")
        if len(target_store) != 1:
            raise ValueError(
                f"invalid state: more than one store have the name {store_name}"
            )
        return target_store[0]["id"]


@contextmanager
def get_fga_client() -> OpenFgaClient:
    OPENFGA_STORE_ID = os.environ.get("OPENFGA_STORE_ID")
    configuration = openfga_sdk.ClientConfiguration(
        api_scheme=OPENFGA_API_SCHEME,  # optional, defaults to "https"
        api_host=OPENFGA_API_HOST,  # required, define without the scheme (e.g. api.fga.example instead of https://api.fga.example)
        store_id=OPENFGA_STORE_ID or _get_store_id_by_name(),
    )
    with OpenFgaClient(configuration) as fga_client:
        yield fga_client


def main():
    with get_fga_client() as fga_client:
        api_response = fga_client.read_authorization_models()
        print(api_response)


if __name__ == "__main__":
    main()
