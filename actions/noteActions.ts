//actions/noteActions.ts

"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getNotes() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  return prisma.note.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createNote(title: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return prisma.note.create({
    data: {
      title,
      content,
      user: { connect: { email: session.user.email } },
    },
  });
}

export async function updateNote(id: string, title: string, content: string) {
  return prisma.note.update({
    where: { id },
    data: { title, content },
  });
}

export async function deleteNote(id: string) {
  return prisma.note.delete({
    where: { id },
  });
}
