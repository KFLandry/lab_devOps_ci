import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoList } from './TodoList';
import { type Todo } from '../db/schema';

const createMockTodo = (overrides?: Partial<Todo>): Todo => ({
  id: 1,
  title: 'Test Todo',
  completed: false,
  createdAt: new Date(),
  ...overrides,
});

describe('TodoList', () => {
  it('should display empty state when no todos exist', () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoList todos={[]} onToggle={onToggle} onDelete={onDelete} />);

    expect(
      screen.getByText('No todos yet. Add one above to get started!')
    ).toBeInTheDocument();
  });

  it('should render active todos', () => {
    const todos = [
      createMockTodo({ id: 1, title: 'Todo 1' }),
      createMockTodo({ id: 2, title: 'Todo 2' }),
    ];
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('should render completed todos section when todos are completed', () => {
    const todos = [
      createMockTodo({ id: 1, title: 'Active Todo', completed: false }),
      createMockTodo({ id: 2, title: 'Completed Todo', completed: true }),
    ];
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText('Active Todo')).toBeInTheDocument();
    expect(screen.getByText('Completed Todo')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('should not render completed section when no todos are completed', () => {
    const todos = [
      createMockTodo({ id: 1, title: 'Todo 1' }),
      createMockTodo({ id: 2, title: 'Todo 2' }),
    ];
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.queryByText('Completed')).not.toBeInTheDocument();
  });

  it('should separate active and completed todos correctly', () => {
    const todos = [
      createMockTodo({ id: 1, title: 'Active 1', completed: false }),
      createMockTodo({ id: 2, title: 'Completed 1', completed: true }),
      createMockTodo({ id: 3, title: 'Active 2', completed: false }),
      createMockTodo({ id: 4, title: 'Completed 2', completed: true }),
    ];
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText('Active 1')).toBeInTheDocument();
    expect(screen.getByText('Active 2')).toBeInTheDocument();
    expect(screen.getByText('Completed 1')).toBeInTheDocument();
    expect(screen.getByText('Completed 2')).toBeInTheDocument();
  });

  it('should call onToggle when a todo is toggled', async () => {
    const user = userEvent.setup();
    const todos = [createMockTodo({ id: 1, title: 'Test Todo' })];
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />);

    await user.click(screen.getByLabelText('Mark as complete'));

    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it('should call onDelete when a todo is deleted', async () => {
    const user = userEvent.setup();
    const todos = [createMockTodo({ id: 1, title: 'Test Todo' })];
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />);

    await user.click(screen.getByLabelText('Delete todo'));

    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('should render all todos when they are all completed', () => {
    const todos = [
      createMockTodo({ id: 1, title: 'Completed 1', completed: true }),
      createMockTodo({ id: 2, title: 'Completed 2', completed: true }),
    ];
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText('Completed 1')).toBeInTheDocument();
    expect(screen.getByText('Completed 2')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});
