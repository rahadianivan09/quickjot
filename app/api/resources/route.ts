import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const resources = await prisma.resource.findMany();
  return new Response(JSON.stringify(resources), { status: 200 });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const { link, description } = await req.json();
  const resource = await prisma.resource.create({
    data: { link, description, userId: session.user.id },
  });
  return new Response(JSON.stringify(resource), { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const { id, link, description } = await req.json();
  const resource = await prisma.resource.update({
    where: { id },
    data: { link, description },
  });
  return new Response(JSON.stringify(resource), { status: 200 });
}
