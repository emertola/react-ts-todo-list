import { useState } from 'react';
import { TODOS } from './data/todos.const';
import { TodoItem as TodoListItem } from './types/todo.interface';
import AddTodoItem from './components/AddTodoItem';
import TodoList from './components/TodoList';
import TodoSummary from './components/TodoSummary';

function App() {
  const [todos, setTodos] = useState<TodoListItem[]>(TODOS);

  const setTodoCompleted = (id: number, completed: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  const addTodo = (title: string) => {
    const newTodo = () => ({
      id: Date.now(),
      title,
      completed: false,
    });
    setTodos((prevTodos) => [...prevTodos, newTodo()]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const deleteCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  return (
    <>
      <main className="py-10 h-screen space-y-5 overflow-y-auto">
        <h1 className="text-4xl font-semibold text-center">Todos:</h1>
        <div className="max-w-2xl mx-auto bg-slate-100 rounded-md p-8 space-y-5">
          <AddTodoItem onSubmit={addTodo} />
          <TodoList
            todos={todos}
            setTodoCompleted={setTodoCompleted}
            onDelete={deleteTodo}
          />
        </div>
        <TodoSummary todos={todos} deleteCompleted={deleteCompleted} />
      </main>
    </>
  );
}

export default App;
