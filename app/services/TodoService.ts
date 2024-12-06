import axios from "axios";
import { Platform } from "react-native";
import { Todo } from "@/app/types/Todo";

const getBaseURL = () => {
  if (Platform.OS === "android") {
    return "10.0.2.2";
  }
  return "localhost";
};

export const api = axios.create({
  baseURL: `http://${getBaseURL()}:5000/api`,
  withCredentials: true,
});

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await api.get("/todos");
  return response.data;
};

export const createTodo = async (todo: { title: string }): Promise<Todo> => {
  const response = await api.post("/todos", todo);
  return response.data;
};

export const updateTodo = async (
  id: string,
  updates?: { title: string }
): Promise<Todo> => {
  const response = await api.put(`/todos/${id}`, updates);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
