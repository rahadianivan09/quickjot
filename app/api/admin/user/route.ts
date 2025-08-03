import { Role } from "@prisma/client";
//app/api/admin/user/route.ts

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 403 });
  }

  const { id } = await req.json();

  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ message: "User berhasil dihapus" });
}
