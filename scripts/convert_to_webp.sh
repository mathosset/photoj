#!/usr/bin/env bash
# scripts/convert_to_webp.sh
# Convertit les JPG/PNG en WebP dans source/images/ (root, blog, tirages)
# Idempotent : ignore les fichiers dont le .webp existe déjà
# Conserve les originaux (non-destructif)
# Usage : bash scripts/convert_to_webp.sh

set -euo pipefail

CWEBP="${CWEBP:-/opt/homebrew/bin/cwebp}"
QUALITY=82
METHOD=4

DIRS=(
  "source/images"
  "source/images/blog"
  "source/images/tirages"
)

TOTAL_BEFORE=0
TOTAL_AFTER=0
COUNT_CONVERTED=0
COUNT_SKIPPED=0

echo "========================================"
echo "  Conversion WebP — cwebp -q $QUALITY -m $METHOD"
echo "========================================"
echo ""

for DIR in "${DIRS[@]}"; do
  echo "--- $DIR ---"
  # Cherche les JPG/PNG directement dans ce dossier (pas récursif)
  while IFS= read -r -d '' INPUT; do
    BASENAME="${INPUT%.*}"
    OUTPUT="${BASENAME}.webp"

    if [[ -f "$OUTPUT" ]]; then
      COUNT_SKIPPED=$((COUNT_SKIPPED + 1))
      echo "  SKIP  $(basename "$INPUT") (webp existe)"
      continue
    fi

    SIZE_BEFORE=$(stat -f%z "$INPUT" 2>/dev/null || stat -c%s "$INPUT")
    "$CWEBP" -q "$QUALITY" -m "$METHOD" -quiet "$INPUT" -o "$OUTPUT"
    SIZE_AFTER=$(stat -f%z "$OUTPUT" 2>/dev/null || stat -c%s "$OUTPUT")

    SAVING=$((SIZE_BEFORE - SIZE_AFTER))
    PCT=0
    if [[ $SIZE_BEFORE -gt 0 ]]; then
      PCT=$(( SAVING * 100 / SIZE_BEFORE ))
    fi

    TOTAL_BEFORE=$((TOTAL_BEFORE + SIZE_BEFORE))
    TOTAL_AFTER=$((TOTAL_AFTER + SIZE_AFTER))
    COUNT_CONVERTED=$((COUNT_CONVERTED + 1))

    printf "  OK    %-40s %6d Ko → %6d Ko  (-%d%%)\n" \
      "$(basename "$INPUT")" \
      $((SIZE_BEFORE / 1024)) \
      $((SIZE_AFTER / 1024)) \
      $PCT
  done < <(find "$DIR" -maxdepth 1 \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | sort -z)

  echo ""
done

TOTAL_SAVING=$((TOTAL_BEFORE - TOTAL_AFTER))
TOTAL_PCT=0
if [[ $TOTAL_BEFORE -gt 0 ]]; then
  TOTAL_PCT=$(( TOTAL_SAVING * 100 / TOTAL_BEFORE ))
fi

echo "========================================"
echo "  Résumé"
echo "  Convertis : $COUNT_CONVERTED  |  Ignorés : $COUNT_SKIPPED"
printf "  Avant : %d Mo  |  Après : %d Mo  |  Économie : %d Mo (-%d%%)\n" \
  $((TOTAL_BEFORE / 1048576)) \
  $((TOTAL_AFTER / 1048576)) \
  $((TOTAL_SAVING / 1048576)) \
  $TOTAL_PCT
echo "========================================"
