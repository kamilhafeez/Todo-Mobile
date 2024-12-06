import axios from "axios";
import {
  api,
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/app/services/TodoService";
import { Todo } from "@/app/types/Todo";

jest.mock("axios", () => ({
  create: () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  }),
}));

describe("TodoService", () => {
  const mockTodos: Todo[] = [
    { _id: "1", sessionId: "xyz", title: "First Todo", completed: false },
    { _id: "2", sessionId: "xyy", title: "Second Todo", completed: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches todos successfully", async () => {
    api.get.mockResolvedValueOnce({ data: mockTodos });

    const todos = await fetchTodos();

    expect(todos).toEqual(mockTodos);
    expect(api.get).toHaveBeenCalledWith("/todos");
  });

  it("creates a new todo", async () => {
    const newTodo: Todo = {
      _id: "3",
      sessionId: "xyz",
      title: "New Todo",
      completed: false,
    };
    api.post.mockResolvedValueOnce({ data: newTodo });

    const todo = await createTodo({ title: "New Todo" });

    expect(todo).toEqual(newTodo);
    expect(api.post).toHaveBeenCalledWith("/todos", {
      title: "New Todo",
    });
  });

  it("updates an existing todo", async () => {
    const updatedTodo: Todo = {
      _id: "1",
      sessionId: "xyz",
      title: "Updated Todo",
      completed: false,
    };
    api.put.mockResolvedValueOnce({ data: updatedTodo });

    const todo = await updateTodo("1", { title: "Updated Todo" });

    expect(todo).toEqual(updatedTodo);
    expect(api.put).toHaveBeenCalledWith("/todos/1", {
      title: "Updated Todo",
    });
  });

  it("deletes a todo", async () => {
    api.delete.mockResolvedValueOnce({});

    await deleteTodo("1");

    expect(api.delete).toHaveBeenCalledWith("/todos/1");
  });
});
