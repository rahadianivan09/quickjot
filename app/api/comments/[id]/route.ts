import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const comment = await prisma.comment.update({
    where: { id: params.id },
    data,
  });
  return new Response(JSON.stringify(comment), { status: 200 });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.comment.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
