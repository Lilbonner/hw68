import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axiosApi.get('/todos.json');
    return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title: string) => {
    const response = await axiosApi.post('https://plovo-js-default-rtdb.europe-west1.firebasedatabase.app/todos.json', { title, completed: false });
    return response.data;
});

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
    async (todo: Todo) => {
    const response = await axiosApi.patch(`https://plovo-js-default-rtdb.europe-west1.firebasedatabase.app/todos/${todo.id}.json`, {  completed: !todo.completed });
    return response.data;
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id: number) => {
    await axiosApi.delete(`https://plovo-js-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`);
    return id;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState: { todos: [] } as TodoState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = Object.keys(action.payload || {}).map((key) => ({
                    id: parseInt(key),
                    ...action.payload[key],
                }));
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload.id);
                state.todos[todoIndex] = action.payload;
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            });
    },
});

export default todoSlice.reducer;
