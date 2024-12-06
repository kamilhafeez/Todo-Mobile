import React from "react";
import styled from "styled-components/native";
import TodoItem from "@/app/components/TodoItem";
import { Todo } from "@/app/types/Todo";

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <List
      data={todos}
      keyExtractor={(item: Todo) => item._id}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      )}
    />
  );
};

export default TodoList;

const List = styled.FlatList`
  margin-vertical: 10px;
`;
