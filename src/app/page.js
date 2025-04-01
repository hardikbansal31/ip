// // "use client";

// // import { useEffect } from "react";
// // import { useSession } from "next-auth/react";
// // import { useRouter } from "next/navigation";

// // export default function Home() {
// //   const { data: session, status } = useSession();
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (status === "authenticated") {
// //       router.push("/tasks"); // Redirect if logged in
// //     }
// //   }, [status, router]);

// //   if (status === "loading") {
// //     return <p>Loading...</p>;
// //   }

// //   return (
// //     <div>
// //       <h1>Welcome to Task Manager</h1>
// //       <button onClick={() => router.push("/register")}>Register</button>
// //       <button onClick={() => router.push("/login")}>Login</button>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "authenticated") {
//       router.push("/tasks"); // Redirect if logged in
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return <p className="text-center text-gray-500 mt-20">Loading...</p>;
//   }

//   return (
//     <div className="flex items-center justify-center h-screen bg-black">
//       <h1>Welcome to Task Assignment App</h1>
//       <div className="flex gap-6">
//         {/* Register Card */}
//         <div
//           className="bg-gray-900 shadow-lg rounded-lg p-6 w-64 text-center cursor-pointer 
//                      hover:bg-wheat hover:text-white transition duration-300"
//           onClick={() => router.push("/register")}
//         >
//           <h2 className="text-xl font-semibold text-wheat">Register</h2>
//           <p className="text-gray-400 mt-2">Create an account</p>
//         </div>

//         {/* Login Card */}
//         <div
//           className="bg-gray-900 shadow-lg rounded-lg p-6 w-64 text-center cursor-pointer 
//                      hover:bg-wheat hover:text-white transition duration-300"
//           onClick={() => router.push("/login")}
//         >
//           <h2 className="text-xl font-semibold text-wheat">Login</h2>
//           <p className="text-gray-400 mt-2">Sign in to your account</p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/tasks"); // Redirect if logged in
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center text-wheat mt-20">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      {/* Centered Welcome Text */}
      <h1 className="text-wheat text-3xl font-semibold absolute top-80">
        Welcome to Task Assignment App
      </h1>

      {/* Card Section */}
      <div className="flex gap-6">
        {/* Register Card */}
        <div
          className="bg-gray-900 shadow-lg rounded-lg p-6 w-64 text-center cursor-pointer 
                     hover:bg-wheat hover:text-white transition duration-300"
          onClick={() => router.push("/register")}
        >
          <h2 className="text-xl font-semibold text-wheat">Register</h2>
          <p className="text-gray-400 mt-2">Create an account</p>
        </div>

        {/* Login Card */}
        <div
          className="bg-gray-900 shadow-lg rounded-lg p-6 w-64 text-center cursor-pointer 
                     hover:bg-wheat hover:text-white transition duration-300"
          onClick={() => router.push("/login")}
        >
          <h2 className="text-xl font-semibold text-wheat">Login</h2>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>
      </div>
    </div>
  );
}
