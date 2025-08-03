import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const resources = await prisma.resource.findMany({ include: { user: true } });
  return Response.json(resources);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const body = await req.json();
  const resource = await prisma.resource.create({
    data: {
      link: body.link,
      description: body.description,
      userId: session.user.id,
    },
  });
  return Response.json(resource);
}
