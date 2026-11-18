#!/usr/bin/env bash
# Rakentaa Paljun herran Windows-version (Neutralinojs) zip-paketiksi.
# Käyttö: desktop/build.sh <neutralino-win_x64.exe> [kohdekansio]
# Neutralinon ajotiedosto: https://github.com/neutralinojs/neutralinojs/releases (v5.6.0, zip-paketista).
# Tarvitsee: python3 (Pillow kuvakkeelle), zip. Sisältö paketoidaan omalla skriptillä (pack_neu.py), ei npm-riippuvuuksia.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
EXE="${1:?Anna polku tiedostoon neutralino-win_x64.exe}"
OUT="${2:-$HERE/dist}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

# Sovelluksen rakenne: asetukset + resources/
mkdir -p "$WORK/app/resources" "$WORK/PaljunHerra"
cp "$HERE/neutralino.config.json" "$WORK/app/"
cp "$ROOT/index.html" "$HERE/icon.png" "$WORK/app/resources/"

# Paketti: ohjelma, sisältö ja ohje
python3 "$HERE/pack_neu.py" "$WORK/app" "$WORK/PaljunHerra/resources.neu"
cp "$EXE" "$WORK/PaljunHerra/PaljunHerra-win_x64.exe"
python3 "$HERE/set_icon.py" "$WORK/PaljunHerra/PaljunHerra-win_x64.exe" "$HERE/icon.png" >/dev/null
cp "$HERE/LUEMINUT.txt" "$WORK/PaljunHerra/"

mkdir -p "$OUT"
rm -f "$OUT/PaljunHerra-Windows.zip"
(cd "$WORK" && zip -q -r "$OUT/PaljunHerra-Windows.zip" PaljunHerra)
echo "Valmis: $OUT/PaljunHerra-Windows.zip"
