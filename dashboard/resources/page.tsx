//dashboard/resources/page.tsx

"use client";

import { useEffect, useState } from "react";
import { getResources, createResource, updateResource, deleteResource } from "@/actions/resourceActions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editResource, setEditResource] = useState<any>(null);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const loadResources = async () => {
    const data = await getResources();
    setResources(data);
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleSave = async () => {
    if (editResource) {
      await updateResource(editResource.id, link, description);
    } else {
      await createResource(link, description);
    }
    setLink("");
    setDescription("");
    setEditResource(null);
    setOpen(false);
    loadResources();
  };

  const handleDelete = async (id: string) => {
    await deleteResource(id);
    loadResources();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sumber Daya</h1>
        <Button onClick={() => setOpen(true)}>Tambah Sumber Daya</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((res) => (
          <Card key={res.id}>
            <CardHeader>
              <CardTitle>
                <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {res.link}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{res.description}</p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditResource(res);
                    setLink(res.link);
                    setDescription(res.description);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(res.id)}>
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
            <DialogTitle>{editResource ? "Edit Sumber Daya" : "Tambah Sumber Daya"}</DialogTitle>
          </DialogHeader>
          <Input placeholder="Tautan (URL)" value={link} onChange={(e) => setLink(e.target.value)} />
          <Textarea placeholder="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} />
          <DialogFooter>
            <Button onClick={handleSave}>{editResource ? "Simpan Perubahan" : "Tambah"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
