//app/api/auth/register/route.ts

import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: "Data tidak lengkap" }), { status: 400 });
  }

  const hashed = await hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: Role.USER, // default role
      },
    });

    return new Response(JSON.stringify({ message: "Pendaftaran berhasil" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Email sudah digunakan" }), { status: 400 });
  }
}
