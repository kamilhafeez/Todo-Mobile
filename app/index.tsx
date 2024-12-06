import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import TodoList from "@/app/components/TodoList";
import { useTodos } from "@/app/hooks/useTodos";
import { Todo } from "@/app/types/Todo";
import { showAlert } from "@/app/utils/alertUtils";

export default function RootLayout() {
  const { todos, addTodo, updateTodo, deleteTodo, error, loading, resetError } =
    useTodos();
  const [input, setInput] = useState("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const handleAddOrUpdate = useCallback(() => {
    if (!input.trim()) {
      showAlert("Error", "Input field cannot be empty.");
    }

    if (editTodo) {
      updateTodo(editTodo._id, input);
      setEditTodo(null);
    } else {
      addTodo(input);
    }
  }, [input, editTodo, updateTodo, addTodo]);

  const handleEdit = useCallback(
    (todo: Todo) => {
      setInput(todo.title);
      setEditTodo(todo);
    },
    [setInput, setEditTodo]
  );

  useEffect(() => {
    if (error) {
      showAlert("Error", error, resetError);
    }
  }, [error, resetError]);

  useEffect(() => {
    setInput("");
  }, [todos]);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#0000ff" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Input
        placeholder="Enter a todo..."
        value={input}
        onChangeText={setInput}
      />
      <StyledButton
        title={editTodo ? "Update" : "Add"}
        onPress={handleAddOrUpdate}
      />
      <TodoList
        todos={todos}
        onEdit={handleEdit}
        onDelete={deleteTodo}
        onToggleComplete={updateTodo}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const StyledButton = styled.Button``;
