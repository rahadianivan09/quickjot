grep -rl --include=\*.tsx '"use client"' app actions | while read file; do
  echo "� Memperbaiki $file"
  sed -i '/"use client"/d' "$file"
  sed -i '1i "use client";\n' "$file"
done
echo "✅ Semua 'use client' sudah dipindah ke baris pertama"
