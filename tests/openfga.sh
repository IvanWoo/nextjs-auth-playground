#!/usr/bin/env bash
set -euo pipefail

yarn run openfga:check user:foo@example.com writer document:bar

yarn run openfga:write user:foo@example.com owner document:bar

yarn run openfga:check user:foo@example.com can_read document:bar
yarn run openfga:check user:foo@example.com can_write document:bar
