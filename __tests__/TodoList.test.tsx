import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TodoList from "@/app/components/TodoList";
import { Todo } from "@/app/types/Todo";

describe("TodoList Component", () => {
  const mockTodos: Todo[] = [
    { _id: "1", title: "First Todo", completed: false },
    { _id: "2", title: "Second Todo", completed: true },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnToggleComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a list of todos", () => {
    const { getByText } = render(
      <TodoList
        todos={mockTodos}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    expect(getByText("First Todo")).toBeTruthy();
    expect(getByText("Second Todo")).toBeTruthy();
  });

  it("calls onEdit when the Edit button is pressed", () => {
    const { getAllByText } = render(
      <TodoList
        todos={mockTodos}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    const editButtons = getAllByText("Edit");
    fireEvent.press(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTodos[0]);
  });

  it("calls onDelete when the Delete button is pressed", () => {
    const { getAllByText } = render(
      <TodoList
        todos={mockTodos}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    const deleteButtons = getAllByText("Delete");
    fireEvent.press(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockTodos[0]._id);
  });

  it("calls onToggleComplete when the checkbox is pressed", () => {
    const { getAllByTestId } = render(
      <TodoList
        todos={mockTodos}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    const checkboxes = getAllByTestId("checkbox");

    fireEvent.press(checkboxes[0]);

    expect(mockOnToggleComplete).toHaveBeenCalledWith(mockTodos[0]._id);
  });
});
