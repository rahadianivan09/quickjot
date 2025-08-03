import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const notes = await prisma.note.findMany({ include: { user: true } });
  return Response.json(notes);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const body = await req.json();
  const note = await prisma.note.create({
    data: {
      title: body.title,
      content: body.content,
      userId: session.user.id,
    },
  });
  return Response.json(note);
}
