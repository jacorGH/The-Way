#!/usr/bin/env bash
# Re-encodes recordings above the target bitrate as mono MP3 at the target bitrate (same file name, same format).
# Files already at or below the target are left alone, so nothing is ever compressed twice.
# Usage: tools/compress-audio.sh [kbps] [folder]   (defaults: 48, audio)
set -uo pipefail
KBPS="${1:-48}"
DIR="${2:-audio}"
LIMIT=$(( KBPS * 1000 + 8000 ))      # a little headroom for rounding in the reported bitrate
size() { local b=$1; if (( b >= 1048576 )); then echo "$(( (b + 524288) / 1048576 )) MB"; else echo "$(( (b + 512) / 1024 )) KB"; fi; }
# the bitrate of a file: from the audio stream, else from the file, else worked out from its size and length
bitrate() {
  local f="$1" br
  br=$(ffprobe -v error -select_streams a:0 -show_entries stream=bit_rate -of default=nw=1:nk=1 "$f" 2>/dev/null)
  [[ "$br" =~ ^[0-9]+$ ]] || br=$(ffprobe -v error -show_entries format=bit_rate -of default=nw=1:nk=1 "$f" 2>/dev/null)
  if ! [[ "$br" =~ ^[0-9]+$ ]]; then
    local d; d=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$f" 2>/dev/null)
    br=$(awk -v s="$(stat -c %s "$f")" -v d="$d" 'BEGIN { if (d > 0) printf "%d", s * 8 / d; else print 0 }')
  fi
  echo "${br:-0}"
}
if [ ! -d "$DIR" ]; then echo "No $DIR folder here; nothing to do."; exit 0; fi
total=$(find "$DIR" -type f -name '*.mp3' | wc -l)
echo "Found $total MP3 recordings in $DIR/. Target: ${KBPS} kbps mono."
done=0; kept=0; failed=0; before=0; after=0; shown=0
while IFS= read -r -d '' f; do
  br=$(bitrate "$f")
  if (( shown < 5 )); then echo "  $f: $(( br / 1000 )) kbps"; shown=$((shown + 1)); fi
  if (( br > LIMIT )); then
    sz=$(stat -c %s "$f")
    tmp="${f%.mp3}.tmp.mp3"
    if ffmpeg -nostdin -loglevel error -y -i "$f" -map_metadata -1 -ac 1 -ar 24000 -c:a libmp3lame -b:a "${KBPS}k" "$tmp"; then
      mv "$tmp" "$f"; done=$((done + 1)); before=$((before + sz)); after=$((after + $(stat -c %s "$f")))
    else
      rm -f "$tmp"; failed=$((failed + 1)); echo "  Could not re-encode $f; left as it was." >&2
    fi
  else
    kept=$((kept + 1))
  fi
done < <(find "$DIR" -type f -name '*.mp3' -print0)
if (( done > 0 )); then
  echo "Compressed $done recordings: $(size $before) to $(size $after). $kept were already at or below ${KBPS} kbps. $failed failed."
else
  echo "Nothing to compress: $kept recordings are at or below ${KBPS} kbps. $failed failed."
fi
