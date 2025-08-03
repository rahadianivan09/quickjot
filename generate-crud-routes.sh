mkdir -p app/api/notes/[id]
cat <<'EON' > app/api/notes/[id]/route.ts
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { title, content } = await req.json();
  const updated = await prisma.note.update({
    where: { id },
    data: { title, content },
  });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await prisma.note.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
EON
mkdir -p app/api/resources/[id]
cat <<'EOR' > app/api/resources/[id]/route.ts
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { link, description } = await req.json();
  const updated = await prisma.resource.update({
    where: { id },
    data: { link, description },
  });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await prisma.resource.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
EOR
mkdir -p app/api/comments/[id]
cat <<'EOC' > app/api/comments/[id]/route.ts
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { text } = await req.json();
  const updated = await prisma.comment.update({
    where: { id },
    data: { text },
  });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await prisma.comment.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
EOC
echo "✅ Semua route PUT & DELETE untuk Notes, Resources, dan Comments sudah dibuat."
