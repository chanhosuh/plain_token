#!/usr/bin/env python3
# https://ethereum.stackexchange.com/a/59322/55116
import json
filepath = '.ganache/accounts.json'
output_filepath = '.ganache/keys.txt'
with open(filepath, 'r') as f_in:
    data = json.load(f_in)
    with open(output_filepath, 'w') as f_out:
        for address in data['addresses']:
            pubkeyArray=data['addresses'][address]['publicKey']['data']
            pubkey = ''.join('%02x' % i for i in pubkeyArray)
            f_out.write("Address:%s\n" % address)
            f_out.write("Public Key:0x%s\n" % pubkey)
            f_out.write("Private Key:0x%s\n\n" % data['private_keys'][address])

print("Private and public keys retrieved:\n")
print("Open ", output_filepath, " to see them.")
print("")