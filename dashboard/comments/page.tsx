//dashboard/comments/page.tsx

"use client";

import { useEffect, useState } from "react";
import { getComments, createComment, updateComment, deleteComment } from "@/actions/commentActions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function CommentsPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editComment, setEditComment] = useState<any>(null);
  const [text, setText] = useState("");

  const loadComments = async () => {
    const data = await getComments();
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleSave = async () => {
    if (editComment) {
      await updateComment(editComment.id, text);
    } else {
      await createComment(text);
    }
    setText("");
    setEditComment(null);
    setOpen(false);
    loadComments();
  };

  const handleDelete = async (id: string) => {
    await deleteComment(id);
    loadComments();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Komentar</h1>
        <Button onClick={() => setOpen(true)}>Tambah Komentar</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <CardTitle>Komentar</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{comment.text}</p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditComment(comment);
                    setText(comment.text);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(comment.id)}>
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
            <DialogTitle>{editComment ? "Edit Komentar" : "Tambah Komentar"}</DialogTitle>
          </DialogHeader>
          <Textarea placeholder="Tulis komentar..." value={text} onChange={(e) => setText(e.target.value)} />
          <DialogFooter>
            <Button onClick={handleSave}>{editComment ? "Simpan Perubahan" : "Tambah"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
