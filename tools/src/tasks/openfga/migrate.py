from tasks.io import OPENFGA_AUTH_JSON_FILE
from tasks.openfga.utils import get_fga_client
from tasks.io import read_json


def main():
    with get_fga_client() as fga_client:
        old_model_id = (
            fga_client.read_latest_authorization_model().authorization_model.id
        )

        fga_client.write_authorization_model(read_json(OPENFGA_AUTH_JSON_FILE))

        new_model_id = (
            fga_client.read_latest_authorization_model().authorization_model.id
        )

        print(f"{old_model_id=}")
        print(f"{new_model_id=}")
        assert old_model_id != new_model_id


if __name__ == "__main__":
    main()
