// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Register() {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     isAdmin: false,
//   });
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       router.push("/login");
//     } else {
//       const data = await res.json();
//       setError(data.error || "Registration failed");
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Username"
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           required
//         />
//         <label>
//           <input
//             type="checkbox"
//             onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
//           />
//           Register as Admin
//         </label>
//         <button type="submit">Register</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-wheat w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-2 bg-gray-800 text-wheat border border-gray-700 rounded"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 bg-gray-800 text-wheat border border-gray-700 rounded"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <label className="flex items-center gap-2 text-wheat">
            <input
              type="checkbox"
              className="accent-gray-700"
              onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
            />
            Register as Admin
          </label>
          <button
            type="submit"
            className="p-2 bg-gray-900 hover:bg-gray-700 text-wheat rounded transition"
          >
            Register
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}
