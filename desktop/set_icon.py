#!/usr/bin/env python3
"""Lisää Windows-ohjelmaan (PE32+ .exe) kuvakkeen uutena .rsrc-resurssiosiona.

Neutralinon valmis exe ei sisällä resursseja, joten Windowsin Resurssienhallinta näyttää yleiskuvakkeen.
Työkalu kirjoittaa resurssihakemiston (RT_ICON + RT_GROUP_ICON) ja lisää sen uudeksi osioksi tiedoston loppuun.
Kuvakkeet tallennetaan PNG-muodossa (tuettu Windows Vistasta alkaen).

Käyttö: set_icon.py <ohjelma.exe> <kuvake.png>   (vaatii Pillow-kirjaston koon muuttamiseen)
"""
import io
import struct
import sys

from PIL import Image

SIZES = (16, 24, 32, 48, 64, 128, 256)
RT_ICON, RT_GROUP_ICON, LANG = 3, 14, 0x0409


def align(v: int, a: int) -> int:
    return (v + a - 1) // a * a


def icon_pngs(path: str) -> list:
    src = Image.open(path).convert('RGBA')
    out = []
    for s in SIZES:
        buf = io.BytesIO()
        src.resize((s, s), Image.LANCZOS).save(buf, 'PNG', optimize=True)
        out.append((s, buf.getvalue()))
    return out


def build_rsrc(icons: list, base_rva: int) -> bytes:
    """Resurssihakemisto: juuri -> tyyppi -> tunnus -> kieli -> datamerkintä."""
    n = len(icons)
    group = struct.pack('<HHH', 0, 1, n) + b''.join(
        struct.pack('<BBBBHHIH', s % 256, s % 256, 0, 0, 1, 32, len(png), i + 1) for i, (s, png) in enumerate(icons))
    blobs = [png for _, png in icons] + [group]           # resurssit 1..n = kuvakkeet, viimeinen = ryhmä
    d = lambda k: struct.pack('<IIHHHH', 0, 0, 0, 0, 0, k)  # IMAGE_RESOURCE_DIRECTORY, k tunnusmerkintää
    e = lambda ident, off, sub: struct.pack('<II', ident, off | (0x80000000 if sub else 0))

    # Rakenteiden sijainnit
    root = 0
    t_icon = root + 16 + 2 * 8
    t_group = t_icon + 16 + n * 8
    lang0 = t_group + 16 + 8                        # n+1 kielihakemistoa, kukin 16 + 8 tavua
    data0 = lang0 + (n + 1) * 24                    # n+1 datamerkintää, kukin 16 tavua
    blob_off, off = [], align(data0 + (n + 1) * 16, 8)
    for b in blobs:
        blob_off.append(off)
        off = align(off + len(b), 8)

    out = bytearray(off)
    def put(pos, raw):
        out[pos:pos + len(raw)] = raw
    put(root, d(2) + e(RT_ICON, t_icon, True) + e(RT_GROUP_ICON, t_group, True))
    put(t_icon, d(n) + b''.join(e(i + 1, lang0 + i * 24, True) for i in range(n)))
    put(t_group, d(1) + e(1, lang0 + n * 24, True))
    for i in range(n + 1):
        put(lang0 + i * 24, d(1) + e(LANG, data0 + i * 16, False))
        put(data0 + i * 16, struct.pack('<IIII', base_rva + blob_off[i], len(blobs[i]), 0, 0))
        put(blob_off[i], blobs[i])
    return bytes(out)


def set_icon(exe: str, png: str) -> None:
    d = bytearray(open(exe, 'rb').read())
    pe = struct.unpack_from('<I', d, 0x3c)[0]
    assert d[pe:pe + 4] == b'PE\0\0', 'ei PE-tiedosto'
    nsec, = struct.unpack_from('<H', d, pe + 6)
    optsz, = struct.unpack_from('<H', d, pe + 20)
    op = pe + 24
    assert struct.unpack_from('<H', d, op)[0] == 0x20b, 'vain 64-bittinen (PE32+)'
    salign, falign = struct.unpack_from('<II', d, op + 32)
    ddir = op + 112
    if struct.unpack_from('<II', d, ddir + 8 * 2) != (0, 0):
        sys.exit('Ohjelmassa on jo resurssiosio – ei muutettu.')
    if struct.unpack_from('<II', d, ddir + 8 * 4) != (0, 0):
        sys.exit('Ohjelma on allekirjoitettu – allekirjoitus rikkoutuisi, ei muutettu.')
    sec = op + optsz
    last = sec + 40 * (nsec - 1)
    first_raw = min(struct.unpack_from('<I', d, sec + 40 * i + 20)[0] for i in range(nsec))
    assert sec + 40 * (nsec + 1) <= first_raw, 'osiotaulussa ei tilaa'
    lvs, lva, lrs, lro = struct.unpack_from('<IIII', d, last + 8)
    assert lro + lrs == len(d), 'tiedoston lopussa on ylimääräistä dataa'

    va = align(lva + max(lvs, lrs), salign)
    rsrc = build_rsrc(icon_pngs(png), va)
    raw = align(len(d), falign)
    rsize = align(len(rsrc), falign)
    hdr = b'.rsrc\0\0\0' + struct.pack('<IIIIIIHHI', len(rsrc), va, rsize, raw, 0, 0, 0, 0, 0x40000040)
    d[sec + 40 * nsec:sec + 40 * (nsec + 1)] = hdr
    struct.pack_into('<H', d, pe + 6, nsec + 1)
    struct.pack_into('<I', d, op + 56, align(va + len(rsrc), salign))   # SizeOfImage
    struct.pack_into('<I', d, op + 64, 0)                               # CheckSum (ei pakollinen .exe:lle)
    struct.pack_into('<II', d, ddir + 8 * 2, va, len(rsrc))            # resurssihakemisto
    d += b'\0' * (raw - len(d)) + rsrc + b'\0' * (rsize - len(rsrc))
    open(exe, 'wb').write(d)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    set_icon(sys.argv[1], sys.argv[2])
    print('Kuvake lisätty:', sys.argv[1])
