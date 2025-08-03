//actions/auth.ts

"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { Role } from "@prisma/client";

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: string = Role.USER // terima dari form dalam bentuk string
) {
  const hashed = await hash(password, 10);

  // Konversi string → enum Role
  const roleValue: Role =
    Object.values(Role).includes(role as Role) ? (role as Role) : Role.USER;

  const newUser = await prisma.user.create({
    data: { name, email, password: hashed, role: roleValue },
  });

  return newUser;
}

export async function forgotPassword(email: string) {
  const token = randomUUID();

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetTokenExpiry: new Date(Date.now() + 3600000), // 1 jam
    },
  });

  console.log(
    `Link reset: ${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`
  );
}

export async function resetPassword(token: string, newPassword: string) {
  const hashed = await hash(newPassword, 10);

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) throw new Error("Token tidak valid atau sudah kadaluarsa");

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed, resetToken: null, resetTokenExpiry: null },
  });

  return true;
}
