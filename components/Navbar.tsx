//components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: "Home", href: "/dashboard" },
  ];

  return (
    <nav className="w-full bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div
          onClick={() => router.push("/dashboard")}
          className="text-lg font-bold cursor-pointer"
        >
          QuickJot
        </div>

        {/* Menu */}
        <div className="flex gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:underline ${
                pathname === item.href ? "underline font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Logout */}
        <Button
          variant="secondary"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Keluar
        </Button>
      </div>
    </nav>
  );
}
