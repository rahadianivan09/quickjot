mkdir -p app/api/notes/[id]
mkdir -p app/api/resources/[id]
mkdir -p app/api/comments/[id]
cat <<'TS' > app/api/notes/[id]/route.ts
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
TS
cat <<'TS' > app/api/resources/[id]/route.ts
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const resource = await prisma.resource.update({
    where: { id: params.id },
    data,
  });
  return new Response(JSON.stringify(resource), { status: 200 });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.resource.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
TS
cat <<'TS' > app/api/comments/[id]/route.ts
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
TS
sed -i 's|/api/notes"|/api/notes/${id}"|g' app/dashboard/page.tsx
sed -i 's|/api/resources"|/api/resources/${id}"|g' app/dashboard/page.tsx
sed -i 's|/api/comments"|/api/comments/${id}"|g' app/dashboard/page.tsx

echo "✅ Semua endpoint PUT & DELETE sudah dibuat dan dashboard diarahkan ke endpoint [id]."
