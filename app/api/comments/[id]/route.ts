import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.comment.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
