import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const note = await prisma.note.update({
    where: { id: params.id },
    data,
  });
  return new Response(JSON.stringify(note), { status: 200 });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.note.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
