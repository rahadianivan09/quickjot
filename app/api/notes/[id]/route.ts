import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.note.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
