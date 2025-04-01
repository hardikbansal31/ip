// "use client";

// import { signIn } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const { data: session } = useSession(); // Get user session
//   const router = useRouter(); // For navigation

//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   });

//   useEffect(() => {
//     if (session) {
//       router.push("/tasks"); // Redirect logged-in users
//     }
//   }, [session, router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       ...credentials,
//       redirect: false,
//     });

//     if (res?.error) {
//       console.error("Login failed:", res.error);
//     } else {
//       console.log("Login successful:", res);
//       router.push("/tasks");
//       const token = res.token; // ❌ NextAuth doesn’t store token in default login
//       if (token) {
//         localStorage.setItem("token", token);
//       }
//       window.location.href = "/admin"; // Redirect after login
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           onChange={(e) =>
//             setCredentials({ ...credentials, username: e.target.value })
//           }
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) =>
//             setCredentials({ ...credentials, password: e.target.value })
//           }
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }


"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (session) {
      router.push("/tasks"); // Redirect if already logged in
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (res?.error) {
      console.error("Login failed:", res.error);
    } else {
      console.log("Login successful:", res);
      router.push("/tasks"); // Redirect after login
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-wheat w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-2 bg-gray-800 text-wheat border border-gray-700 rounded"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 bg-gray-800 text-wheat border border-gray-700 rounded"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="p-2 bg-gray-900 hover:bg-gray-700 text-wheat rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
