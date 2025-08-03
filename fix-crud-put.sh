mkdir -p app/api/notes/[id]
cat <<'ROUTE' > app/api/notes/[id]/route.ts
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await prisma.note.update({
    where: { id: params.id },
    data,
  });
  return Response.json(updated);
}
ROUTE
mkdir -p app/api/resources/[id]
cat <<'ROUTE' > app/api/resources/[id]/route.ts
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await prisma.resource.update({
    where: { id: params.id },
    data,
  });
  return Response.json(updated);
}
ROUTE
mkdir -p app/api/comments/[id]
cat <<'ROUTE' > app/api/comments/[id]/route.ts
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await prisma.comment.update({
    where: { id: params.id },
    data,
  });
  return Response.json(updated);
}
ROUTE

echo "✅ Semua endpoint PUT sudah dibuat/diupdate"
