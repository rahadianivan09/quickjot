//app/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="text-lg font-bold">QuickJot</div>
          <div className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/auth/register">Signup</Link>
            <Link href="/auth/login">Login</Link>
            <Link href="/about">About Us</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold mb-4">
          Catat Ide Terbaikmu, Kapan Saja 📚
        </h1>
        <p className="max-w-2xl text-muted-foreground mb-6">
          QuickJot adalah aplikasi catatan online yang dirancang khusus untuk{" "}
          <strong>siswa</strong> dan <strong>mahasiswa</strong> yang ingin menyimpan ide, materi, dan referensi belajar secara cepat, aman, dan mudah diakses di mana saja.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/auth/register">Mulai Gratis</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">Pelajari Lebih Lanjut</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
