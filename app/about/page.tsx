//app/about/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutUsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tentang Kami</h1>
      <p className="mb-4">
        QuickJot dibuat oleh tim yang peduli terhadap dunia pendidikan digital.
        Kami percaya bahwa ide adalah aset yang berharga, dan setiap siswa serta
        mahasiswa berhak memiliki alat untuk menyimpannya dengan mudah.
      </p>
      <p className="mb-4">
        Tujuan kami adalah memberikan platform sederhana, cepat, dan modern
        untuk mencatat ide, mengelola sumber belajar, dan berbagi catatan
        penting dengan rekan atau komunitas belajar.
      </p>
      <p className="mb-6">
        QuickJot akan terus berkembang dengan fitur-fitur baru untuk mendukung
        produktivitas dan kreativitas generasi muda Indonesia.
      </p>

      {/* Tombol Home */}
      <Link href="/">
        <Button variant="default">Home</Button>
      </Link>
    </div>
  );
}
