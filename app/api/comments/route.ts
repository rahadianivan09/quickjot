import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const comments = await prisma.comment.findMany({ include: { user: true } });
  return Response.json(comments);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const body = await req.json();
  const comment = await prisma.comment.create({
    data: {
      text: body.text,
      userId: session.user.id,
    },
  });
  return Response.json(comment);
}
