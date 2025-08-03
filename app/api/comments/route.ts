import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const comments = await prisma.comment.findMany();
  return new Response(JSON.stringify(comments), { status: 200 });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const { text } = await req.json();
  const comment = await prisma.comment.create({
    data: { text, userId: session.user.id },
  });
  return new Response(JSON.stringify(comment), { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const { id, text } = await req.json();
  const comment = await prisma.comment.update({
    where: { id },
    data: { text },
  });
  return new Response(JSON.stringify(comment), { status: 200 });
}
