#!/usr/bin/env bash
set -euo pipefail

yarn run openfga:check user:foo@example.com writer document:bar

yarn run openfga:write user:foo@example.com owner document:bar

yarn run openfga:check user:foo@example.com can_read document:bar
yarn run openfga:check user:foo@example.com can_write document:bar

for i in {1..10}; do
    yarn run openfga:write user:$i@example.com owner document:var
done

yarn run openfga:read-all document:var
