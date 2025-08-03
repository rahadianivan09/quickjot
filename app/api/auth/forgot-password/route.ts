//app/api/auth/forgot-password/route.ts

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    const token = randomUUID();
    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: new Date(Date.now() + 3600000), // 1 jam
      },
    });

    // TODO: Kirim email beneran pakai Resend/Nodemailer
    console.log(`Link reset: ${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`);

    return NextResponse.json({ message: "Token reset dikirim" });
  } catch {
    return NextResponse.json({ error: "Gagal memproses" }, { status: 500 });
  }
}
