"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  if (pathname === "/") return null; 

  return isClient ? (
    <nav className="bg-black text-wheat p-4 flex gap-6 items-center">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <Link href="/register" className="hover:underline">
        Register
      </Link>
      <Link href="/login" className="hover:underline">
        Login
      </Link>
      <Link href="/admin" className="hover:underline">
        Assign Tasks
      </Link>
      <Link href="/tasks" className="hover:underline">
        My Tasks
      </Link>

      <button
        className="bg-gray-900 text-wheat px-4 py-2 rounded hover:bg-gray-700 transition"
        onClick={() => signOut({ callbackUrl: "/" })} 
      >
        Logout
      </button>
    </nav>
  ) : null; 
}
