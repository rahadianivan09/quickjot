"use client";

//app/admin/AdminClient.tsx (Client Component)


import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminClient({ sessionUser, users }: any) {
  const [open, setOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<null | (() => void)>(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  async function deleteUser(userId: string) {
    await fetch("/api/admin/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    });
    location.reload();
  }

  async function deleteNote(noteId: string) {
    await fetch("/api/admin/note", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: noteId }),
    });
    location.reload();
  }

  function confirmDelete(message: string, action: () => void) {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setOpen(true);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Halaman Admin</h1>
      <p className="mt-2">Selamat datang, {sessionUser?.name}!</p>
      <p className="text-muted-foreground mt-1">
        Di sini kamu bisa mengelola semua catatan dan sumber daya user.
      </p>

      <div className="space-y-4">
        {users.map((user: any) => (
          <div key={user.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">
              {user.name || "Tanpa Nama"}{" "}
              <span className="text-sm text-muted-foreground">
                ({user.role})
              </span>
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>

            <div className="mt-2">
              <strong>Catatan:</strong>
              {user.notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Belum ada catatan
                </p>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {user.notes.map((note: any) => (
                    <li
                      key={note.id}
                      className="flex justify-between items-center"
                    >
                      <span>
                        <strong>{note.title}:</strong> {note.content}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          confirmDelete(
                            `Yakin ingin menghapus catatan "${note.title}"?`,
                            () => deleteNote(note.id)
                          )
                        }
                      >
                        Hapus
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                variant="destructive"
                onClick={() =>
                  confirmDelete(
                    `Yakin ingin menghapus user ${user.email}? Semua datanya akan hilang.`,
                    () => deleteUser(user.id)
                  )
                }
              >
                Hapus User
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Konfirmasi */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p>{confirmMessage}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmAction) confirmAction();
                setOpen(false);
              }}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
