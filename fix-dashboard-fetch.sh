TARGET="app/dashboard/page.tsx"
if [ -f "$TARGET" ]; then
  echo "Ì¥ç Memperbaiki fetch API di $TARGET..."
  sed -i 's|fetch("/api/notes/${id}")|fetch("/api/notes")|g' "$TARGET"
  sed -i 's|fetch("/api/resources/${id}")|fetch("/api/resources")|g' "$TARGET"
  sed -i 's|fetch("/api/comments/${id}")|fetch("/api/comments")|g' "$TARGET"
  echo "‚úÖ Fetch API di dashboard sudah diperbaiki."
else
  echo "‚ùå File $TARGET tidak ditemukan!"
fi
