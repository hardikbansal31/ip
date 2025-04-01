// // "use client";

// // import { usePathname } from "next/navigation";
// // import { useState, useEffect } from "react";
// // import { useSession, signOut } from "next-auth/react";

// // export default function Navbar() {
// //   const pathname = usePathname();
// //   const [isClient, setIsClient] = useState(false);

// //   useEffect(() => {
// //     setIsClient(true); // Ensures this only runs on the client
// //   }, []);

// //   if (pathname === "/") return null; // Hide navbar on home page

// //   return isClient ? (
// //     <nav className="bg-black text-wheat p-4 flex gap-6">
// //       <a href="/" className="hover:underline">
// //         Home
// //       </a>
// //       <a href="/register" className="hover:underline">
// //         Register
// //       </a>
// //       <a href="/login" className="hover:underline">
// //         Login
// //       </a>
// //       <a href="/admin" className="hover:underline">
// //         Assign Tasks
// //       </a>
// //       <a href="/tasks" className="hover:underline">
// //         My Tasks
// //       </a>
// //       <button className="hover:underline" onClick={() => signOut()}>Logout</button>
// //     </nav>
// //   ) : null; // Avoid mismatch during hydration
// // }

// "use client";

// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useSession, signOut } from "next-auth/react";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); // Ensure this runs on the client
//   }, []);

//   if (pathname === "/") return null; // Hide navbar on home page

//   return isClient ? (
//     <nav className="bg-black text-wheat p-4 flex gap-6 items-center">
//       <a href="/" className="hover:underline">
//         Home
//       </a>
//       <a href="/register" className="hover:underline">
//         Register
//       </a>
//       <a href="/login" className="hover:underline">
//         Login
//       </a>
//       <a href="/admin" className="hover:underline">
//         Assign Tasks
//       </a>
//       <a href="/tasks" className="hover:underline">
//         My Tasks
//       </a>

//       {/* Styled Logout Button */}
//       <button
//         className="bg-gray-900 text-wheat px-4 py-2 rounded hover:bg-gray-700 transition"
//         onClick={() => signOut({ callbackUrl: "/" })} // Redirect to home on logout
//       >
//         Logout
//       </button>
//     </nav>
//   ) : null; // Avoid hydration mismatch
// }

"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this runs on the client
  }, []);

  if (pathname === "/") return null; // Hide navbar on home page

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

      {/* Styled Logout Button */}
      <button
        className="bg-gray-900 text-wheat px-4 py-2 rounded hover:bg-gray-700 transition"
        onClick={() => signOut({ callbackUrl: "/" })} // Redirect to home on logout
      >
        Logout
      </button>
    </nav>
  ) : null; // Avoid hydration mismatch
}
