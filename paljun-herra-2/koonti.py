#!/usr/bin/env python3
"""Kokoaa Paljun Herra 2:n yhdeksi index.html-tiedostoksi (selain, artifact ja Windows-versio).

Moduulit src/*.js liitetään nimen mukaisessa järjestyksessä (00_, 01_, ...), koska ne jakavat
yhteiset globaalit ja ylätason vakiot on määriteltävä ennen käyttöä.
Käyttö: python3 koonti.py  ->  dist/index.html (julkinen: alkunäytöksen jälkeen "pelattavissa pian")
                              dist/kehitys.html (kehitysversio: piha ja uudet kentät pelattavissa)
Versio valitaan vakiolla JULKINEN, joka lisätään koodin alkuun.
"""
import glob
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')


def build(julkinen: bool, nimi: str) -> str:
    with open(os.path.join(SRC, 'pohja.html'), encoding='utf-8') as f:
        page = f.read()
    with open(os.path.join(SRC, 'tyyli.css'), encoding='utf-8') as f:
        css = f.read().rstrip('\n')
    parts = []
    for path in sorted(glob.glob(os.path.join(SRC, '*.js'))):
        with open(path, encoding='utf-8') as f:
            parts.append(f.read().rstrip('\n'))
    lippu = '// Koonnin lisäämä: julkinen versio lukitsee pelaamisen (alkunäytöksen jälkeen "pelattavissa pian")\nconst JULKINEN=' + ('true' if julkinen else 'false') + ';'
    page = page.replace('/*TYYLI*/', css).replace('/*KOODI*/', lippu + '\n' + '\n'.join(parts))
    if not julkinen:  # kehitysversiolle oma otsikko, jotta sen erottaa julkisesta
        page = page.replace('<title>', '<title>KEHITYS – ', 1)
    out_dir = os.path.join(HERE, 'dist')
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, nimi)
    with open(out, 'w', encoding='utf-8') as f:
        f.write(page)
    return out


if __name__ == '__main__':
    for julkinen, nimi in ((True, 'index.html'), (False, 'kehitys.html')):
        p = build(julkinen, nimi)
        print(f'Valmis: {p} ({os.path.getsize(p) // 1024} kt)')
