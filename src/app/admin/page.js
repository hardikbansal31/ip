// "use client";

// import { useEffect, useState } from "react";
// import { fetchUsers, assignTask } from "../lib/api";
// import { useSession } from "next-auth/react";

// export default function Admin() {
//   const { data: session } = useSession();
//   const [users, setUsers] = useState([]); // ✅ Default to empty array
//   const [task, setTask] = useState({ title: "", description: "", userId: "" });

//   useEffect(() => {
//     if (session?.accessToken) {
//       // ✅ Check if session is valid
//       fetchUsers(session.accessToken)
//         .then((res) => {
//           console.log("Fetched Users:", res); // ✅ Debugging
//           setUsers(res || []); // ✅ Ensure `users` is always an array
//         })
//         .catch((err) => {
//           console.error("Error fetching users:", err);
//           setUsers([]); // ✅ Prevent undefined issues
//         });
//     }
//   }, [session]);

//   const handleAssignTask = async () => {
//     console.log("Assigning Task with Token:", session?.accessToken);
//     console.log("Task Data:", task);
//     if (!session?.accessToken) {
//       console.error("No authentication token found");
//       return;
//     }

//     try {
//       const response = await assignTask(session.accessToken, task);
//       console.log("Task Assigned:", response.data);
//     } catch (error) {
//       console.error(
//         "Error assigning task:",
//         error.response?.data || error.message
//       );
//     }
//   };


//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <select onChange={(e) => setTask({ ...task, userId: e.target.value })}>
//         <option value="">Select User</option>
//         {users.length > 0 ? ( // ✅ Check before mapping
//           users.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.username || user.name || "Unknown User"}
//             </option>
//           ))
//         ) : (
//           <option disabled>No users found</option>
//         )}
//       </select>
//       <input
//         type="text"
//         placeholder="Task Title"
//         onChange={(e) => setTask({ ...task, title: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Task Description"
//         onChange={(e) => setTask({ ...task, description: e.target.value })}
//       />
//       <button onClick={handleAssignTask}>Assign Task</button>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { fetchUsers, assignTask } from "../lib/api";
import { useSession } from "next-auth/react";

export default function Admin() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]); // ✅ Ensure users is always an array
  const [taskDescriptions, setTaskDescriptions] = useState({}); // Store descriptions per user

  useEffect(() => {
    if (session?.accessToken) {
      fetchUsers(session.accessToken)
        .then((res) => {
          setUsers(res || []); // ✅ Prevent undefined errors
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          setUsers([]);
        });
    }
  }, [session]);

  // Handle input change for each user
  const handleInputChange = (userId, value) => {
    setTaskDescriptions((prev) => ({ ...prev, [userId]: value }));
  };

  // Assign task function
  const handleAssignTask = async (userId) => {
    const description = taskDescriptions[userId];

    if (!description) {
      alert("Please enter a task description");
      return;
    }

    try {
      await assignTask(session.accessToken, { userId, description });
      alert(`Task assigned to ${userId} successfully!`);
      setTaskDescriptions((prev) => ({ ...prev, [userId]: "" })); // Clear input
    } catch (error) {
      console.error(
        "Error assigning task:",
        error.response?.data || error.message
      );
      alert("Failed to assign task.");
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-wheat">
        Assign Tasks
      </h1>

      {users.length === 0 ? (
        <p className="text-gray-400">Loading users...</p>
      ) : (
        <table className="w-full border border-gray-700 text-wheat">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-3 border border-gray-700">Username</th>
              <th className="p-3 border border-gray-700">Task Description</th>
              <th className="p-3 border border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center bg-gray-800">
                {/* Username Column */}
                <td className="p-3 border border-gray-700 hover:text-white">
                  {user.username}
                </td>

                {/* Task Input Column */}
                <td className="p-3 border border-gray-700">
                  <input
                    type="text"
                    className="p-2 w-full bg-black text-wheat border border-gray-600 rounded"
                    placeholder="Enter task"
                    value={taskDescriptions[user.id] || ""}
                    onChange={(e) => handleInputChange(user.id, e.target.value)}
                  />
                </td>

                {/* Assign Button Column */}
                <td className="p-3 border border-gray-700">
                  <button
                    className="bg-gray-900 text-wheat px-4 py-2 rounded hover:bg-gray-700 transition"
                    onClick={() => handleAssignTask(user.id)}
                  >
                    Assign Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
