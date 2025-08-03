//dashboard/notes/page.tsx

"use client";

import { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "@/actions/noteActions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editNote, setEditNote] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const loadNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSave = async () => {
    if (editNote) {
      await updateNote(editNote.id, title, content);
    } else {
      await createNote(title, content);
    }
    setTitle("");
    setContent("");
    setEditNote(null);
    setOpen(false);
    loadNotes();
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    loadNotes();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Catatan</h1>
        <Button onClick={() => setOpen(true)}>Tambah Catatan</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={() => { setEditNote(note); setTitle(note.title); setContent(note.content); setOpen(true); }}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(note.id)}>
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editNote ? "Edit Catatan" : "Tambah Catatan"}</DialogTitle>
          </DialogHeader>
          <Input placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Isi catatan" value={content} onChange={(e) => setContent(e.target.value)} />
          <DialogFooter>
            <Button onClick={handleSave}>{editNote ? "Simpan Perubahan" : "Tambah"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
