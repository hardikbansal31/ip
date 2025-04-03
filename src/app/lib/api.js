import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// || "http://localhost:8080/api"

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/api/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/api/auth/login`, userData);
};

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token"); // Only access in the browser
  }
  return null; // Return null if running on the server
};

export const assignTask = async (token, taskData) => {
  return axios.post(`${API_URL}/api/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
    mode: "cors",
  });
};

export const fetchTasks = async (token) => {
  return axios.get(`${API_URL}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
    mode: "cors",
  });
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`, // Attach JWT token
  },
});

export const fetchUsers = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  const session = await getSession();
  if (!session || !session.accessToken) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get(`${API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
      mode: "cors",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
