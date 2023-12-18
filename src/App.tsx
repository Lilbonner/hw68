import React, { useState } from "react";
import "./App.css";
import TodoItem from "../src/Containers/TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "./Features/TodoSlice";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();

  const count = useSelector((state: any) => state.todo.count);
  const todos = useSelector((state: any) => state.todo.todos);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="App">
      <h1>TODO List</h1>
      <form className="App-form" onSubmit={handleAddTodo}>
        <input type="text" value={input} onChange={(e) => setInput(e.currentTarget.value)} />
        <button type="submit">Add task</button>
      </form>
      <div className="Todos">
        {count > 0 &&
          todos.map((todo: any) => (
            <TodoItem
              key={todo.id}
              text={todo.text}
              id={todo.id}
              completed={todo.completed}
              onToggle={handleToggleTodo}
              onRemove={handleRemoveTodo}
            />
          ))}
        {count === 0 && <p>No todos</p>}
      </div>
    </div>
  );
};

export default App;