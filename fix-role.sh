grep -rl --include=\*.ts --include=\*.tsx '"ADMIN"' app actions | while read file; do
  if ! grep -q 'import { Role } from "@prisma/client"' "$file"; then
    sed -i '1i import { Role } from "@prisma/client";' "$file"
  fi
  sed -i 's/"ADMIN"/Role.ADMIN/g' "$file"
done
grep -rl --include=\*.ts --include=\*.tsx '"USER"' app actions | while read file; do
  if ! grep -q 'import { Role } from "@prisma/client"' "$file"; then
    sed -i '1i import { Role } from "@prisma/client";' "$file"
  fi
  sed -i 's/"USER"/Role.USER/g' "$file"
done

echo "✅ Semua 'ADMIN' dan 'USER' sudah diganti ke Role.ADMIN / Role.USER"
