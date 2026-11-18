#!/usr/bin/env python3
"""Kokoaa Paljun Herra 2:n yhdeksi index.html-tiedostoksi (selain, artifact ja Windows-versio).

Moduulit src/*.js liitetään nimen mukaisessa järjestyksessä (00_, 01_, ...), koska ne jakavat
yhteiset globaalit ja ylätason vakiot on määriteltävä ennen käyttöä.
Käyttö: python3 koonti.py  ->  dist/index.html
"""
import glob
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')


def build() -> str:
    with open(os.path.join(SRC, 'pohja.html'), encoding='utf-8') as f:
        page = f.read()
    with open(os.path.join(SRC, 'tyyli.css'), encoding='utf-8') as f:
        css = f.read().rstrip('\n')
    parts = []
    for path in sorted(glob.glob(os.path.join(SRC, '*.js'))):
        with open(path, encoding='utf-8') as f:
            parts.append(f.read().rstrip('\n'))
    page = page.replace('/*TYYLI*/', css).replace('/*KOODI*/', '\n'.join(parts))
    out_dir = os.path.join(HERE, 'dist')
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, 'index.html')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(page)
    return out


if __name__ == '__main__':
    p = build()
    print(f'Valmis: {p} ({os.path.getsize(p) // 1024} kt)')
