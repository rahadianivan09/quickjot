grep -rl --include=\*.tsx '<option value=Role.' app actions | while read file; do
  echo "í´§ Memperbaiki $file"
  # Ganti jadi ada kurung kurawal pembuka
  sed -i 's/<option value=Role\./<option value={Role./g' "$file"
  # Pastikan ada kurung kurawal penutup sebelum >
  sed -i 's/}>/}>/g' "$file" # dummy biar aman
  sed -i 's/Role\.\([A-Z_]\+\)>/Role.\1}>/g' "$file"
done

echo "âœ… Semua <option value=Role...> sudah benar pakai {Role...}>"
