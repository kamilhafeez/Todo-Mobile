import { useState, useEffect, useCallback } from "react";
import {
  fetchTodos,
  createTodo,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
} from "@/app/services/TodoService";
import { Todo } from "@/app/types/Todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        setLoading(true);
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
      } catch (err) {
        setError("Failed to fetch todos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);

  const addTodo = useCallback(async (title: string) => {
    try {
      const newTodo = await createTodo({ title });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (err) {
      setError("Failed to add todo. Please try again.");
    }
  }, []);

  const updateTodo = useCallback(async (id: string, title?: string) => {
    try {
      const updatedTodo = await updateTodoApi(
        id,
        title ? { title } : undefined
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError("Failed to update todo. Please try again.");
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      await deleteTodoApi(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return { todos, addTodo, updateTodo, deleteTodo, error, loading, resetError };
}
