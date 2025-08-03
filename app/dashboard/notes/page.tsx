"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function fetchNotes() {
    const res = await fetch("/api/notes");
    setNotes(await res.json());
  }

  async function addNote() {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    fetchNotes();
  }

  async function deleteNote(id: string) {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  }

  useEffect(() => { fetchNotes(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Catatan</h1>
      <div className="flex gap-2 mb-4">
        <Input placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Isi" value={content} onChange={(e) => setContent(e.target.value)} />
        <Button onClick={addNote}>Tambah</Button>
      </div>
      <ul className="space-y-2">
        {notes.map((n) => (
          <li key={n.id} className="flex justify-between border p-2 rounded">
            <div>
              <strong>{n.title}</strong> - {n.content}
            </div>
            <Button variant="destructive" onClick={() => deleteNote(n.id)}>Hapus</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
