import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import RootLayout from "@/app/index";
import { useTodos } from "@/app/hooks/useTodos";

jest.mock("@/app/hooks/useTodos");

describe("RootLayout Component", () => {
  const mockAddTodo = jest.fn();
  const mockUpdateTodo = jest.fn();
  const mockDeleteTodo = jest.fn();
  const mockUseTodos = useTodos as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTodos.mockReturnValue({
      todos: [],
      addTodo: mockAddTodo,
      updateTodo: mockUpdateTodo,
      deleteTodo: mockDeleteTodo,
    });
  });

  it("shows an alert if the input field is empty when trying to add a todo", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");

    const { getByText } = render(<RootLayout />);

    const addButton = getByText("Add");
    fireEvent.press(addButton);

    expect(alertSpy).toHaveBeenCalledWith(
      "Error",
      "Input field cannot be empty.",
      [{ text: "OK" }]
    );
  });

  it("calls addTodo when a new todo is added", () => {
    const { getByPlaceholderText, getByText } = render(<RootLayout />);

    const inputField = getByPlaceholderText("Enter a todo...");
    const addButton = getByText("Add");

    fireEvent.changeText(inputField, "New Todo");
    fireEvent.press(addButton);

    expect(mockAddTodo).toHaveBeenCalledWith("New Todo");
  });

  it("shows the Update button only after clicking the Edit button inside a FlatList item", () => {
    const mockTodos = [{ _id: "1", title: "Existing Todo", completed: false }];
    mockUseTodos.mockReturnValue({
      todos: mockTodos,
      addTodo: mockAddTodo,
      updateTodo: mockUpdateTodo,
      deleteTodo: mockDeleteTodo,
    });

    const { getByPlaceholderText, getByText, queryByText } = render(
      <RootLayout />
    );
    expect(getByText("Add")).toBeTruthy();
    expect(queryByText("Update")).toBeNull();

    const editButton = getByText("Edit");
    fireEvent.press(editButton);

    expect(getByText("Update")).toBeTruthy();
    expect(queryByText("Add")).toBeNull();

    const inputField = getByPlaceholderText("Enter a todo...");
    fireEvent.changeText(inputField, "Updated Todo");

    const updateButton = getByText("Update");
    fireEvent.press(updateButton);

    expect(mockUpdateTodo).toHaveBeenCalledWith("1", "Updated Todo");
    expect(getByText("Add")).toBeTruthy();
  });

  it("calls deleteTodo when the delete button is clicked in TodoList", () => {
    const mockTodos = [{ _id: "1", title: "Existing Todo", completed: false }];
    mockUseTodos.mockReturnValue({
      todos: mockTodos,
      addTodo: mockAddTodo,
      updateTodo: mockUpdateTodo,
      deleteTodo: mockDeleteTodo,
    });

    const { getByText } = render(<RootLayout />);

    const deleteButton = getByText("Delete");
    fireEvent.press(deleteButton);

    expect(mockDeleteTodo).toHaveBeenCalledWith("1");
  });
});
