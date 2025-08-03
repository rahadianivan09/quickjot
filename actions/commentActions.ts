//actions/commentActions.ts

"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getComments() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  return prisma.comment.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createComment(text: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return prisma.comment.create({
    data: {
      text,
      user: { connect: { email: session.user.email } },
    },
  });
}

export async function updateComment(id: string, text: string) {
  return prisma.comment.update({
    where: { id },
    data: { text },
  });
}

export async function deleteComment(id: string) {
  return prisma.comment.delete({
    where: { id },
  });
}
