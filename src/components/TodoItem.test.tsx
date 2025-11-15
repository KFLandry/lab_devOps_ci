import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem } from './TodoItem';
import { type Todo } from '../db/schema';

const createMockTodo = (overrides?: Partial<Todo>): Todo => ({
  id: 1,
  title: 'Test Todo',
  completed: false,
  createdAt: new Date(),
  ...overrides,
});

describe('TodoItem', () => {
  it('should render an active todo correctly', () => {
    const todo = createMockTodo();
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByLabelText('Mark as complete')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete todo')).toBeInTheDocument();
  });

  it('should render a completed todo correctly', () => {
    const todo = createMockTodo({ completed: true });
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByLabelText('Mark as incomplete')).toBeInTheDocument();
    expect(screen.getByText('Test Todo')).toHaveClass('line-through');
  });

  it('should call onToggle when toggle button is clicked', async () => {
    const user = userEvent.setup();
    const todo = createMockTodo();
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />);

    await user.click(screen.getByLabelText('Mark as complete'));

    expect(onToggle).toHaveBeenCalledWith(1);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const todo = createMockTodo();
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />);

    await user.click(screen.getByLabelText('Delete todo'));

    expect(onDelete).toHaveBeenCalledWith(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('should apply correct styles for active todos', () => {
    const todo = createMockTodo();
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    const { container } = render(
      <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
    );

    const todoElement = container.firstChild as HTMLElement;
    expect(todoElement).toHaveClass('bg-slate-800/50');
    expect(screen.getByText('Test Todo')).toHaveClass('text-white');
  });

  it('should apply correct styles for completed todos', () => {
    const todo = createMockTodo({ completed: true });
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    const { container } = render(
      <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
    );

    const todoElement = container.firstChild as HTMLElement;
    expect(todoElement).toHaveClass('bg-slate-800/30');
    expect(screen.getByText('Test Todo')).toHaveClass('text-gray-500');
  });
});
