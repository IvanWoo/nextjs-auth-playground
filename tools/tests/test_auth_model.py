from tasks.openfga.utils import get_fga_client
from openfga_sdk.client.models import ClientCheckRequest
from openfga_sdk.client.models import ClientTuple


def check(user, relation, object, fga_client=None):
    if fga_client is not None:
        return fga_client.check(
            body=ClientCheckRequest(user=user, relation=relation, object=object)
        )
    with get_fga_client() as fga_client:
        return fga_client.check(
            body=ClientCheckRequest(user=user, relation=relation, object=object)
        )


USER1 = "user:foo@example.com"
ORG1 = "organization:foo"
DOC1 = "document:bar"


def test_document():
    user = USER1 + "test_document"
    doc = DOC1 + "test_document"
    with get_fga_client() as fga_client:
        try:
            res = fga_client.delete_tuples(
                [ClientTuple(user=user, relation="owner", object=doc)]
            )
        except Exception as e:
            print(e)

        res = check(user, "can_write", doc, fga_client)
        assert res.allowed == False

        try:
            res = fga_client.write_tuples(
                [ClientTuple(user=user, relation="owner", object=doc)]
            )
        except Exception as e:
            print(e)

        res = check(user, "can_read", doc, fga_client)
        assert res.allowed

        res = check(user, "can_write", doc, fga_client)
        assert res.allowed


def test_organization():
    user = USER1 + "test_organization"
    doc = DOC1 + "test_organization"
    org = ORG1 + "test_organization"
    with get_fga_client() as fga_client:
        try:
            res = fga_client.delete_tuples(
                [
                    ClientTuple(user=user, relation="member", object=org),
                    ClientTuple(user=org, relation="associated_organization", object=doc),
                ]
            )
        except Exception as e:
            print(e)

        res = check(user, "can_write", doc, fga_client)
        assert res.allowed == False

        try:
            res = fga_client.write_tuples(
                [
                    ClientTuple(user=user, relation="member", object=org),
                    ClientTuple(user=org, relation="associated_organization", object=doc),
                ]
            )
        except Exception as e:
            print(e)

        res = check(user, "can_read", doc, fga_client)
        assert res.allowed

        res = check(user, "can_write", doc, fga_client)
        assert res.allowed
