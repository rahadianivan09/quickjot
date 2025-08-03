//actions/resourceActions.ts

"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getResources() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  return prisma.resource.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createResource(link: string, description: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return prisma.resource.create({
    data: {
      link,
      description,
      user: { connect: { email: session.user.email } },
    },
  });
}

export async function updateResource(id: string, link: string, description: string) {
  return prisma.resource.update({
    where: { id },
    data: { link, description },
  });
}

export async function deleteResource(id: string) {
  return prisma.resource.delete({
    where: { id },
  });
}
