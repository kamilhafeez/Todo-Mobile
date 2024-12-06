/** @jest-environment jsdom */
import { renderHook, act, waitFor } from "@testing-library/react";
import {
  fetchTodos,
  createTodo,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
} from "@/app/services/TodoService";
import { useTodos } from "@/app/hooks/useTodos";

jest.mock("@/app/services/TodoService");

describe("useTodos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches todos on mount", async () => {
    (fetchTodos as jest.Mock).mockResolvedValue([
      { _id: "1", title: "Test Todo", completed: false },
    ]);

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.todos).toEqual([
        { _id: "1", title: "Test Todo", completed: false },
      ]);
    });

    expect(fetchTodos).toHaveBeenCalledTimes(1);
  });

  it("adds a new todo", async () => {
    (createTodo as jest.Mock).mockResolvedValue({
      _id: "2",
      title: "New Todo",
      completed: false,
    });

    const { result } = renderHook(() => useTodos());

    await act(async () => {
      await result.current.addTodo("New Todo");
    });

    expect(createTodo).toHaveBeenCalledWith({ title: "New Todo" });

    await waitFor(() => {
      expect(result.current.todos).toContainEqual({
        _id: "2",
        title: "New Todo",
        completed: false,
      });
    });
  });

  it("updates an existing todo", async () => {
    const initialTodos = [
      { _id: "1", title: "Test Todo", completed: false },
    ];

    const updatedTodo = { _id: "1", title: "Updated Todo", completed: false };

    (fetchTodos as jest.Mock).mockResolvedValue(initialTodos);
    (updateTodoApi as jest.Mock).mockResolvedValue(updatedTodo);

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.todos).toEqual(initialTodos);
    });

    await act(async () => {
      await result.current.updateTodo("1", "Updated Todo");
    });

    expect(updateTodoApi).toHaveBeenCalledWith("1", { title: "Updated Todo" });

    await waitFor(() => {
      expect(result.current.todos).toContainEqual(updatedTodo);
    });
  });

  it("deletes a todo", async () => {
    const initialTodos = [
      { _id: "1", title: "Test Todo", completed: false },
      { _id: "2", title: "Another Todo", completed: true },
    ];

    (fetchTodos as jest.Mock).mockResolvedValue(initialTodos);
    (deleteTodoApi as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.todos).toEqual(initialTodos);
    });

    await act(async () => {
      await result.current.deleteTodo("1");
    });

    expect(deleteTodoApi).toHaveBeenCalledWith("1");

    await waitFor(() => {
      expect(result.current.todos).toEqual([
        { _id: "2", title: "Another Todo", completed: true },
      ]);
    });
  });
});
