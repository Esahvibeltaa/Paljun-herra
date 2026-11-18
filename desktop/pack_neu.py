#!/usr/bin/env python3
"""Paketoi Neutralinon resources.neu -arkiston (asar-muoto) ilman ulkopuolisia työkaluja.

Käyttö: pack_neu.py <sovelluskansio> <kohde/resources.neu>
Sovelluskansiossa: neutralino.config.json ja resources/-kansio.
"""
import json
import os
import struct
import sys


def pickle_string(s: bytes) -> bytes:
    """Chromium Pickle: uint32 hyötykuorman koko, uint32 merkkijonon pituus, data + täyte 4 tavuun."""
    pad = (4 - len(s) % 4) % 4
    payload = struct.pack('<I', len(s)) + s + b'\0' * pad
    return struct.pack('<I', len(payload)) + payload


def build(app_dir: str, out_path: str) -> None:
    entries = []  # (arkistopolku-osat, tiedostopolku)
    entries.append((['neutralino.config.json'], os.path.join(app_dir, 'neutralino.config.json')))
    res_dir = os.path.join(app_dir, 'resources')
    for root, _dirs, files in os.walk(res_dir):
        for name in sorted(files):
            full = os.path.join(root, name)
            rel = os.path.relpath(full, app_dir).split(os.sep)
            entries.append((rel, full))

    header = {'files': {}}
    blobs, offset = [], 0
    for parts, full in entries:
        with open(full, 'rb') as f:
            data = f.read()
        node = header
        for p in parts[:-1]:
            node = node['files'].setdefault(p, {'files': {}})
        node['files'][parts[-1]] = {'size': len(data), 'offset': str(offset)}
        blobs.append(data)
        offset += len(data)

    head = pickle_string(json.dumps(header, separators=(',', ':')).encode('utf-8'))
    size_pickle = struct.pack('<II', 4, len(head))
    with open(out_path, 'wb') as f:
        f.write(size_pickle)
        f.write(head)
        for b in blobs:
            f.write(b)


def verify(path: str) -> list:
    """Lukee arkiston takaisin ja palauttaa tiedostolistan (tarkistus)."""
    with open(path, 'rb') as f:
        buf = f.read()
    _, head_len = struct.unpack_from('<II', buf, 0)
    _, str_len = struct.unpack_from('<II', buf, 8)
    header = json.loads(buf[16:16 + str_len])
    base = 8 + head_len
    out = []

    def walk(node, prefix):
        for name, v in node['files'].items():
            if 'files' in v:
                walk(v, prefix + name + '/')
            else:
                start = base + int(v['offset'])
                assert start + v['size'] <= len(buf), name
                out.append((prefix + name, v['size']))
    walk(header, '/')
    return out


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    build(sys.argv[1], sys.argv[2])
    for name, size in verify(sys.argv[2]):
        print(f'{name}\t{size}')
