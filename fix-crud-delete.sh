mkdir -p app/api/notes/[id]
cat <<'ROUTE' > app/api/notes/[id]/route.ts
import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.note.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
ROUTE
mkdir -p app/api/resources/[id]
cat <<'ROUTE' > app/api/resources/[id]/route.ts
import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.resource.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
ROUTE
mkdir -p app/api/comments/[id]
cat <<'ROUTE' > app/api/comments/[id]/route.ts
import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.comment.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
ROUTE

echo "✅ Semua endpoint DELETE sudah dibuat/diupdate"
