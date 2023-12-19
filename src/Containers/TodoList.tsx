import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, Todo } from '../Features/TodoSlice';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todos.todos);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  return (
    <div>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
      <div>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoList;
