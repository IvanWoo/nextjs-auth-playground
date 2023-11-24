#!/usr/bin/env bash
set -euo pipefail
set -x

store_id="$OPENFGA_STORE_ID"

fga query check --store-id "$store_id" user:foo@example.com writer document:bar

fga tuple write --store-id "$store_id" user:foo@example.com owner document:bar
fga tuple write --store-id "$store_id" "user:*" reader document:public

fga query check --store-id "$store_id" user:foo@example.com can_read document:public
fga query check --store-id "$store_id" user:foo@example.com can_read document:bar
fga query check --store-id "$store_id" user:foo@example.com can_write document:bar

for i in {1..10}; do
    fga tuple write --store-id "$store_id" user:$i@example.com owner document:var
done
