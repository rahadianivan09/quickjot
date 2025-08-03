grep -rl --include=\*.tsx '<option value=Role.' app actions | while read file; do
  echo "í´§ Memperbaiki $file"
  # Tambah { setelah value=
  sed -i 's/<option value=Role\./<option value={Role./g' "$file"
  # Tambah } sebelum >
  sed -i 's/Role\.\([A-Z_]\+\)>/Role.\1}>/g' "$file"
done

echo "âœ… Semua <option value=Role...> sudah dibungkus {}"
