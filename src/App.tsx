import React, { useState, useEffect } from 'react';
import './TodoList.css';
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (): void => {
    if (newTodo.trim() === '') return;

    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: number): void => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number): void => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const clearCompletedTodos = (): void => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-list-container">
      <h2>Todo List</h2>
      <div className="add-todo-container">
        <input
          type="text"
          className="new-todo-input"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button className="add-todo-button" onClick={addTodo}>Add Todo</button>
      </div>
      <ul className="todo-items-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="toggle-checkbox"
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCompletedTodos} className="clear-completed-button">
        Clear Completed
      </button>
    </div>
  );
};

export default TodoList;