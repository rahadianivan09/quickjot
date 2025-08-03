//app/admin/page.tsx (Server Component)

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client"; // ⬅️ Import enum
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== Role.ADMIN) {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    include: { notes: true },
  });

  return (
    <AdminClient
      sessionUser={session.user}
      users={JSON.parse(JSON.stringify(users))}
    />
  );
}
