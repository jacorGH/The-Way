#!/usr/bin/env bash
# Re-encodes recordings above the target bitrate as mono MP3 at the target bitrate (same file name, same format).
# Files already at or below the target are left alone, so nothing is ever compressed twice.
# Usage: tools/compress-audio.sh [kbps] [folder]   (defaults: 48, audio)
set -euo pipefail
KBPS="${1:-48}"
DIR="${2:-audio}"
LIMIT=$(( KBPS * 1000 + 8000 ))      # a little headroom for rounding in the reported bitrate
done=0; kept=0; before=0; after=0
while IFS= read -r -d '' f; do
  br=$(ffprobe -v error -select_streams a:0 -show_entries stream=bit_rate -of default=nw=1:nk=1 "$f" || echo 0)
  [[ "$br" =~ ^[0-9]+$ ]] || br=0
  if (( br > LIMIT )); then
    sz=$(stat -c %s "$f")
    tmp="${f%.mp3}.tmp.mp3"
    if ffmpeg -nostdin -loglevel error -y -i "$f" -map_metadata -1 -ac 1 -ar 24000 -c:a libmp3lame -b:a "${KBPS}k" "$tmp"; then
      mv "$tmp" "$f"; done=$((done + 1)); before=$((before + sz)); after=$((after + $(stat -c %s "$f")))
    else
      rm -f "$tmp"; echo "Could not re-encode $f; left as it was." >&2
    fi
  else
    kept=$((kept + 1))
  fi
done < <(find "$DIR" -type f -name '*.mp3' -print0)
size() { local b=$1; if (( b >= 1048576 )); then echo "$(( (b + 524288) / 1048576 )) MB"; else echo "$(( (b + 512) / 1024 )) KB"; fi; }
if (( done > 0 )); then
  echo "Compressed $done recordings to ${KBPS} kbps: $(size $before) to $(size $after). $kept were already at or below ${KBPS} kbps."
else
  echo "Nothing to compress: all $kept recordings are at or below ${KBPS} kbps."
fi
