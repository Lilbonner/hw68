import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../Features/TodoSlice';
import { toggleTodo, removeTodo } from '../Features/TodoSlice';

interface TodoItemProps {
    todo: Todo;
    onToggle: () => void;
    onRemove: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onRemove }) => {
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTodo(todo)).then(onToggle);
    };

    const handleRemove = () => {
        dispatch(removeTodo(todo.id)).then(onRemove);
    };

    return (
        <div>
            <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
            <span>{todo.title}</span>
            <button onClick={handleRemove}>Delete</button>
        </div>
    );
};

export default TodoItem;
