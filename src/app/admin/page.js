"use client";

import { useEffect, useState } from "react";
import { fetchUsers, assignTask } from "../lib/api";
import { useSession } from "next-auth/react";

export default function Admin() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]); 
  const [taskDescriptions, setTaskDescriptions] = useState({}); // Store descriptions per user

  useEffect(() => {
    if (session?.accessToken) {
      fetchUsers(session.accessToken)
        .then((res) => {
          setUsers(res || []); 
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          setUsers([]);
        });
    }
  }, [session]);

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
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-wheat">Assign Tasks</h1>

      {users.length === 0 ? (
        <p className="text-gray-400">Loading users...</p>
      ) : (
        // <table className="w-full border border-gray-700 text-wheat">
        //   <thead>
        //     <tr className="bg-gray-900 text-white">
        //       <th className="p-3 border border-gray-700">Username</th>
        //       <th className="p-3 border border-gray-700">Task Description</th>
        //       <th className="p-3 border border-gray-700">Action</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {users.map((user) => (
        //       <tr key={user.id} className="text-center bg-gray-800">
        //         {/* Username Column */}
        //         <td className="p-3 border border-gray-700 hover:text-white">
        //           {user.username}
        //         </td>

        //         {/* Task Input Column */}
        //         <td className="p-3 border border-gray-700">
        //           <input
        //             type="text"
        //             className="p-2 w-full bg-black text-wheat border border-gray-600 rounded"
        //             placeholder="Enter task"
        //             value={taskDescriptions[user.id] || ""}
        //             onChange={(e) => handleInputChange(user.id, e.target.value)}
        //           />
        //         </td>

        //         {/* Assign Button Column */}
        //         <td className="p-3 border border-gray-700">
        //           <button
        //             className="bg-gray-900 text-wheat px-4 py-2 rounded hover:bg-gray-700 transition"
        //             onClick={() => handleAssignTask(user.id)}
        //           >
        //             Assign Task
        //           </button>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full border border-gray-700 text-sm sm:text-base text-wheat">
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
                  <td className="p-3 border border-gray-700 break-words">
                    {user.username}
                  </td>
                  <td className="p-3 border border-gray-700">
                    <input
                      type="text"
                      className="p-2 w-full bg-black text-wheat border border-gray-600 rounded text-sm sm:text-base"
                      placeholder="Enter task"
                      value={taskDescriptions[user.id] || ""}
                      onChange={(e) =>
                        handleInputChange(user.id, e.target.value)
                      }
                    />
                  </td>
                  <td className="p-3 border border-gray-700">
                    <button
                      className="bg-gray-900 text-wheat px-4 py-2 rounded hover:bg-gray-700 transition text-sm sm:text-base"
                      onClick={() => handleAssignTask(user.id)}
                    >
                      Assign Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
