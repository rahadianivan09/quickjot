"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  async function fetchResources() {
    const res = await fetch("/api/resources");
    setResources(await res.json());
  }

  async function addResource() {
    await fetch("/api/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link, description }),
    });
    setLink("");
    setDescription("");
    fetchResources();
  }

  async function deleteResource(id: string) {
    await fetch(`/api/resources/${id}`, { method: "DELETE" });
    fetchResources();
  }

  useEffect(() => { fetchResources(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Sumber Daya</h1>
      <div className="flex gap-2 mb-4">
        <Input placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />
        <Input placeholder="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button onClick={addResource}>Tambah</Button>
      </div>
      <ul className="space-y-2">
        {resources.map((r) => (
          <li key={r.id} className="flex justify-between border p-2 rounded">
            <div>
              <a href={r.link} target="_blank" className="text-blue-500">{r.link}</a> - {r.description}
            </div>
            <Button variant="destructive" onClick={() => deleteResource(r.id)}>Hapus</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
