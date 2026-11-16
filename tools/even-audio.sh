#!/usr/bin/env bash
# Evens out the loudness of every recording, so Scripture, narration and dialogue all play at the same level.
# Each file's loudness is measured (EBU R128, the broadcast standard). Files more than 1.5 LU away from the target are
# brought to it with a two-pass loudnorm (a true-peak limit keeps loud words from clipping), then saved again as mono MP3
# at the same bitrate. Files already at the target are left alone, so running it again changes nothing.
# Usage: tools/even-audio.sh [target LUFS] [folder] [kbps]   (defaults: -24, audio, 48)
set -uo pipefail
TARGET="${1:--24}"
DIR="${2:-audio}"
KBPS="${3:-48}"
if [ ! -d "$DIR" ]; then echo "No $DIR folder here; nothing to do."; exit 0; fi
export TARGET KBPS
one() {
  local f="$1" m I
  m=$(ffmpeg -nostdin -hide_banner -nostats -i "$f" -af loudnorm=I="$TARGET":TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
  I=$(printf '%s' "$m" | python3 -c 'import json,sys; print(json.load(sys.stdin)["input_i"])' 2>/dev/null)
  if ! [[ "$I" =~ ^-?[0-9.]+$ ]] || [[ "$I" == "-inf" ]]; then echo "skip $f"; return; fi
  if awk -v i="$I" -v t="$TARGET" 'BEGIN { d = i - t; if (d < 0) d = -d; exit !(d <= 1.5) }'; then echo "ok $f"; return; fi
  local args; args=$(printf '%s' "$m" | python3 -c 'import json,sys; j=json.load(sys.stdin); print("measured_I=%s:measured_TP=%s:measured_LRA=%s:measured_thresh=%s:offset=%s" % (j["input_i"], j["input_tp"], j["input_lra"], j["input_thresh"], j["target_offset"]))')
  local tmp="${f%.mp3}.even.mp3"
  if ffmpeg -nostdin -loglevel error -y -i "$f" -af "loudnorm=I=$TARGET:TP=-1.5:LRA=11:linear=true:$args" -map_metadata -1 -ac 1 -ar 24000 -c:a libmp3lame -b:a "${KBPS}k" "$tmp"; then
    mv "$tmp" "$f"; echo "fixed $f $I"
  else
    rm -f "$tmp"; echo "fail $f"
  fi
}
export -f one
total=$(find "$DIR" -type f -name '*.mp3' | wc -l)
echo "Measuring $total recordings in $DIR/ (target $TARGET LUFS)…"
out=$(find "$DIR" -type f -name '*.mp3' -print0 | xargs -0 -P "$(nproc)" -I{} bash -c 'one "$@"' _ {})
fixed=$(printf '%s\n' "$out" | grep -c '^fixed ' || true)
ok=$(printf '%s\n' "$out" | grep -c '^ok ' || true)
failed=$(printf '%s\n' "$out" | grep -c '^fail ' || true)
printf '%s\n' "$out" | grep '^fixed ' | head -8 | awk '{ printf "  %s was %s LUFS\n", $2, $3 }'
echo "Evened out $fixed recordings; $ok were already at the right level; $failed could not be read."
[ -n "${GITHUB_ENV:-}" ] && echo "EVENED=$fixed" >> "$GITHUB_ENV"
exit 0
