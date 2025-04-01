// "use client";

// import { useEffect, useState } from "react";
// import { fetchTasks } from "../lib/api.js";
// import { useSession, signOut } from "next-auth/react";

// export default function Tasks() {
//   const { data: session } = useSession();
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     console.log("Session Data:", session);

//     if (session?.accessToken) {
//       fetchTasks(session.accessToken)
//         .then((res) => {
//           // console.log("Fetched Tasks:", res.data); // ✅ Debug API Response
//           setTasks(res.data);
//         })
//         .catch((err) => console.error("Error fetching tasks:", err));
//     }
//   }, [session]);

//   return (
//     <div>
//       <h1>My Tasks</h1>
      
//       {session?.user?.username ? (
//         <div>
//           <p>
//             Welcome, <strong>{session.user.username}</strong>!
//           </p>
//         </div>
//       ) : (
//         <p>Loading user info...</p>
//       )}

//       <ul>
//         <p>tasks</p>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             {task.description} - {task.completed ? "Done" : "Pending"}
//           </li>
//         ))}
//       </ul>
//       {/* <button onClick={() => signOut()}>Logout</button> */}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { fetchTasks } from "../lib/api.js";
import { useSession } from "next-auth/react";

export default function Tasks() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchTasks(session.accessToken)
        .then((res) => {
          setTasks(res.data);
        })
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [session]);

  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-wheat mb-4">
        <strong>My Tasks</strong>
      </h1>

      {session?.user?.username ? (
        <p className="mb-4 text-wheat">
          Welcome,{" "}
          <strong className="text-white">{session.user.username}</strong>!
        </p>
      ) : (
        <p className="text-gray-400">Loading user info...</p>
      )}

      <table className="w-full border-collapse border border-gray-700 bg-black text-wheat">
        <thead>
          <tr className="bg-gray-800 text-wheat">
            <th className="p-2 border border-gray-700">#</th>
            <th className="p-2 border border-gray-700">Task Description</th>
            <th className="p-2 border border-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task.id} className="text-center bg-gray-900">
                <td className="p-2 border border-gray-700">{index + 1}</td>
                <td className="p-2 border border-gray-700">
                  {task.description}
                </td>
                <td className="p-2 border border-gray-700">
                  <button
                    className={`px-4 py-1 rounded transition ${
                      task.completed
                        ? "bg-green-600 hover:bg-green-500"
                        : "bg-gray-900 hover:bg-gray-700"
                    } text-wheat`}
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    {task.completed ? "Done" : "Mark as Done"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-400">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
