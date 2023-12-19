import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, Todo } from '../Features/TodoSlice';
import TodoItem from './TodoItem';
import { RootState } from '../App/Store';

const TodoList: React.FC = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            dispatch(addTodo(newTodo)).then(() => {
                setNewTodo('');
                dispatch(fetchTodos());
            });
        }
    };

    const handleToggleTodo = () => {
        dispatch(fetchTodos());
    };

    const handleRemoveTodo = () => {
        dispatch(fetchTodos());
    };

    return (
        <div>
            <ul>
                {todos.map((todo: Todo) => (
                    <li key={todo.id}>
                        <TodoItem todo={todo} onToggle={handleToggleTodo} onRemove={handleRemoveTodo} />
                    </li>
                ))}
            </ul>
            <div>
                <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                <button onClick={handleAddTodo}>Add task</button>
            </div>
        </div>
    );
};

export default TodoList;
