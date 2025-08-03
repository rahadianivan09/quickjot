import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const adminPass = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      password: adminPass,
      role: Role.ADMIN,
    },
  });

  const userEmail = "user@example.com";
  const userPass = await bcrypt.hash("user123", 10);

  await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      name: "Pengguna",
      email: userEmail,
      password: userPass,
      role: Role.USER,
    },
  });

  console.log(`
âœ… Seed selesai!
í´‘ Admin login:
   Email: admin@example.com
   Password: admin123

í´‘ User login:
   Email: user@example.com
   Password: user123
`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
