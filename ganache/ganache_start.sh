#!/usr/bin/env bash
set -a
source .env
set +a

mkdir -p .ganache/{data,logs}
ganache-cli --db .ganache/data -i 10312008 --mnemonic="${MNEMONIC}" --acctKeys=.ganache/accounts.json 2>&1 | tee .ganache/logs/$(date +%Y-%m-%d-%H:%M:%S).log
