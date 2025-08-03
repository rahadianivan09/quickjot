"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CommentsPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  async function fetchComments() {
    const res = await fetch("/api/comments");
    setComments(await res.json());
  }

  async function addComment() {
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    fetchComments();
  }

  async function deleteComment(id: string) {
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    fetchComments();
  }

  useEffect(() => { fetchComments(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Komentar</h1>
      <div className="flex gap-2 mb-4">
        <Input placeholder="Teks komentar" value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={addComment}>Tambah</Button>
      </div>
      <ul className="space-y-2">
        {comments.map((c) => (
          <li key={c.id} className="flex justify-between border p-2 rounded">
            <div>{c.text}</div>
            <Button variant="destructive" onClick={() => deleteComment(c.id)}>Hapus</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
