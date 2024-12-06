import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Todo } from "@/app/types/Todo";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const onToggleHandler = useCallback(
    () => onToggleComplete(todo._id),
    [todo, onToggleComplete]
  );
  const onEditHandler = useCallback(() => onEdit(todo), [todo, onEdit]);
  const onDeleteHandler = useCallback(
    () => onDelete(todo._id),
    [todo, onDelete]
  );
  return (
    <Container>
      <CheckboxContainer>
        <TouchableOpacity testID="checkbox" onPress={onToggleHandler}>
          <Checkbox completed={todo.completed} />
        </TouchableOpacity>
      </CheckboxContainer>

      <TodoText completed={todo.completed}>{todo.title}</TodoText>
      <ButtonContainer>
        <StyledButton title="Edit" onPress={onEditHandler} />
        <StyledButton title="Delete" onPress={onDeleteHandler} />
      </ButtonContainer>
    </Container>
  );
};

export default TodoItem;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 5px;
`;

const CheckboxContainer = styled.View`
  margin-right: 10px;
`;

const Checkbox = styled.View<{ completed: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => (props.completed ? "#4caf50" : "#ccc")};
  background-color: ${(props) => (props.completed ? "#4caf50" : "transparent")};
  border-radius: 3px;
`;

const TodoText = styled.Text<{ completed: boolean }>`
  flex: 1;
  font-size: 16px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const StyledButton = styled.Button``;
