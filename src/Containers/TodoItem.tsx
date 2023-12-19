import React from 'react';
import { useDispatch } from 'react-redux';
import {toggleTodo, removeTodo, Todo} from '../Features/TodoSlice';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTodo(todo));
    };

    const handleRemove = () => {
        dispatch(removeTodo(todo.id));
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
