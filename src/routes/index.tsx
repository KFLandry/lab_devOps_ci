import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getTodos, createTodo, toggleTodo, deleteTodo } from '../actions/todos';
import { type Todo } from '../db/schema';
import { PageHeader } from '../components/PageHeader';
import { AddTodoForm } from '../components/AddTodoForm';
import { TodoStats } from '../components/TodoStats';
import { TodoList } from '../components/TodoList';

export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    const todos = await getTodos();
    return { todos };
  },
});

function App() {
  const { todos: initialTodos } = Route.useLoaderData();

  const createTodoFn = useServerFn(createTodo);
  const toggleTodoFn = useServerFn(toggleTodo);
  const deleteTodoFn = useServerFn(deleteTodo);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await createTodoFn({
        data: { title },
      });
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error('Failed to create todo:', error);
      throw error;
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const updatedTodo = await toggleTodoFn({ data: { id } });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodoFn({ data: { id } });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <PageHeader />
        <AddTodoForm onAddTodo={handleAddTodo} />
        <TodoStats
          activeCount={activeTodos.length}
          completedCount={completedTodos.length}
        />
        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
}
