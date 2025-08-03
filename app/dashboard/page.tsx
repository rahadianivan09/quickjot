"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Note { id: string; title: string; content: string; }
interface Resource { id: string; link: string; description: string; }
interface Comment { id: string; text: string; }

export default function DashboardPage() {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"note" | "resource" | "comment" | "">("");
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", link: "", description: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = () => {
    fetch("/api/notes").then(r => r.json()).then(setNotes);
    fetch("/api/resources").then(r => r.json()).then(setResources);
    fetch("/api/comments").then(r => r.json()).then(setComments);
  };

  const filtered = (data: any[]) =>
    data
      .filter(item =>
        Object.values(item).some(v =>
          v?.toString().toLowerCase().includes(search.toLowerCase())
        )
      )
      .sort((a, b) =>
        sort === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

  const openForm = (type: "note" | "resource" | "comment", item?: any) => {
    setModalType(type);
    setEditId(item?.id || null);
    if (item) {
      setFormData(item);
    } else {
      setFormData({ title: "", content: "", link: "", description: "", text: "" });
    }
    setOpenModal(true);
  };

  const saveItem = async () => {
    setLoading(true);
    let url = `/api/${modalType === "note" ? "notes" : modalType === "resource" ? "resources" : "comments"}`;
    let method = editId ? "PUT" : "POST";
    let body: any = { ...formData };
    if (editId) body.id = editId;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    setLoading(false);
    if (res.ok) {
      toast({ title: "Berhasil", description: `${modalType} disimpan` });
      fetchAll();
      setOpenModal(false);
    } else {
      toast({ title: "Gagal", description: "Terjadi kesalahan", variant: "destructive" });
    }
  };

  const deleteItem = async (type: string, id: string) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    const res = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Dihapus", description: `${type} dihapus` });
      fetchAll();
    } else {
      toast({ title: "Gagal", description: "Tidak bisa menghapus", variant: "destructive" });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard QuickJot</h1>
      <div className="flex gap-2 mb-4">
        <Input placeholder="Cari..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={sort} onChange={e => setSort(e.target.value as "asc" | "desc")} className="border rounded p-2">
          <option value="desc">Terbaru</option>
          <option value="asc">Terlama</option>
        </select>
      </div>
      <Tabs defaultValue="notes">
        <TabsList>
          <TabsTrigger value="notes">Catatan</TabsTrigger>
          <TabsTrigger value="resources">Sumber Daya</TabsTrigger>
          <TabsTrigger value="comments">Komentar</TabsTrigger>
        </TabsList>

        <TabsContent value="notes">
          <Button onClick={() => openForm("note")} className="mb-4">Tambah Catatan</Button>
          {filtered(notes).map(n => (
            <Card key={n.id} className="mb-2">
              <CardHeader className="flex justify-between">
                <CardTitle>{n.title}</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openForm("note", n)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteItem("notes", n.id)}>Hapus</Button>
                </div>
              </CardHeader>
              <CardContent>{n.content}</CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources">
          <Button onClick={() => openForm("resource")} className="mb-4">Tambah Sumber Daya</Button>
          {filtered(resources).map(r => (
            <Card key={r.id} className="mb-2">
              <CardHeader className="flex justify-between">
                <CardTitle>{r.link}</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openForm("resource", r)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteItem("resources", r.id)}>Hapus</Button>
                </div>
              </CardHeader>
              <CardContent>{r.description}</CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="comments">
          <Button onClick={() => openForm("comment")} className="mb-4">Tambah Komentar</Button>
          {filtered(comments).map(c => (
            <Card key={c.id} className="mb-2">
              <CardHeader className="flex justify-between">
                <CardTitle>{c.text}</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openForm("comment", c)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteItem("comments", c.id)}>Hapus</Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editId ? "Edit" : "Tambah"} {modalType}</DialogTitle>
          </DialogHeader>
          {modalType === "note" && (
            <>
              <Input placeholder="Judul" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
              <Textarea placeholder="Isi" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
            </>
          )}
          {modalType === "resource" && (
            <>
              <Input placeholder="Link" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} />
              <Textarea placeholder="Deskripsi" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
            </>
          )}
          {modalType === "comment" && (
            <>
              <Textarea placeholder="Komentar" value={formData.text} onChange={e => setFormData({ ...formData, text: e.target.value })} />
            </>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenModal(false)}>Batal</Button>
            <Button onClick={saveItem} disabled={loading}>{loading ? "Menyimpan..." : "Simpan"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
