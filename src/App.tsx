import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './Features/TodoSlice';
import TodoList from './Containers/TodoList';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>TODO List</h1>
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
