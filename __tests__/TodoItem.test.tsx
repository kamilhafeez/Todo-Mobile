import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TodoItem from "@/app/components/TodoItem";
import { Todo } from "@/app/types/Todo";

describe("TodoItem Component", () => {
  const mockTodo: Todo = {
    _id: "1",
    sessionId: "xyz",
    title: "Test Todo",
    completed: false,
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnToggleComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the todo item correctly", () => {
    const { getByText } = render(
      <TodoItem
        todo={mockTodo}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    expect(getByText("Test Todo")).toBeTruthy();
    expect(getByText("Edit")).toBeTruthy();
    expect(getByText("Delete")).toBeTruthy();
  });

  it("calls onToggleComplete when the checkbox is clicked", () => {
    const { getByTestId } = render(
      <TodoItem
        todo={mockTodo}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    const checkbox = getByTestId("checkbox");
    fireEvent.press(checkbox);

    expect(mockOnToggleComplete).toHaveBeenCalledWith("1");
  });

  it("calls onEdit when the Edit button is pressed", () => {
    const { getByText } = render(
      <TodoItem
        todo={mockTodo}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    const editButton = getByText("Edit");
    fireEvent.press(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTodo);
  });

  it("calls onDelete when the Delete button is pressed", () => {
    const { getByText } = render(
      <TodoItem
        todo={mockTodo}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    const deleteButton = getByText("Delete");
    fireEvent.press(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("renders the todo text with strike-through when completed", () => {
    const completedTodo = { ...mockTodo, completed: true };
    const { getByText } = render(
      <TodoItem
        todo={completedTodo}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    const todoText = getByText("Test Todo");
    expect(todoText.props.style).toEqual(
      expect.objectContaining({ textDecorationLine: "line-through" })
    );
  });

  it("renders the checkbox with correct background color when completed", () => {
    const completedTodo = { ...mockTodo, completed: true };
    const { toJSON } = render(
      <TodoItem
        todo={completedTodo}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
