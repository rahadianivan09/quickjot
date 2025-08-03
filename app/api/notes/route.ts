import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const notes = await prisma.note.findMany();
  return new Response(JSON.stringify(notes), { status: 200 });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const { title, content } = await req.json();
  const note = await prisma.note.create({
    data: { title, content, userId: session.user.id },
  });
  return new Response(JSON.stringify(note), { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const { id, title, content } = await req.json();
  const note = await prisma.note.update({
    where: { id },
    data: { title, content },
  });
  return new Response(JSON.stringify(note), { status: 200 });
}
