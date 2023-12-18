import React from "react";

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const handleCheckboxClick = () => {
    props.onToggle(props.id);
  };

  const handleRemoveClick = () => {
    props.onRemove(props.id);
  };

  return (
    <div className={`todo ${props.completed ? "completed" : ""}`}>
      <input type="checkbox" checked={props.completed} onChange={handleCheckboxClick} />
      <label>{props.text}</label>
      <button onClick={handleRemoveClick}>Delete</button>
    </div>
  );
};

export default TodoItem;
