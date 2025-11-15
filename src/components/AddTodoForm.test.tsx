import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddTodoForm } from './AddTodoForm';

describe('AddTodoForm', () => {
  it('should render the form with input and button', () => {
    const onAddTodo = vi.fn();
    render(<AddTodoForm onAddTodo={onAddTodo} />);

    expect(
      screen.getByPlaceholderText('What needs to be done?')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add todo/i })
    ).toBeInTheDocument();
  });

  it('should update input value when typing', async () => {
    const user = userEvent.setup();
    const onAddTodo = vi.fn();
    render(<AddTodoForm onAddTodo={onAddTodo} />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'New Todo');

    expect(input).toHaveValue('New Todo');
  });

  it('should call onAddTodo with trimmed title when form is submitted', async () => {
    const user = userEvent.setup();
    const onAddTodo = vi.fn().mockResolvedValue(undefined);
    render(<AddTodoForm onAddTodo={onAddTodo} />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, '  New Todo  ');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    expect(onAddTodo).toHaveBeenCalledWith('New Todo');
    expect(onAddTodo).toHaveBeenCalledTimes(1);
  });

  it('should clear input after successful submission', async () => {
    const user = userEvent.setup();
    const onAddTodo = vi.fn().mockResolvedValue(undefined);
    render(<AddTodoForm onAddTodo={onAddTodo} />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'New Todo');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    await vi.waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should not submit when input is empty', async () => {
    const user = userEvent.setup();
    const onAddTodo = vi.fn();
    render(<AddTodoForm onAddTodo={onAddTodo} />);

    await user.click(screen.getByRole('button', { name: /add todo/i }));

    expect(onAddTodo).not.toHaveBeenCalled();
  });

  it('should not submit when input contains only whitespace', async () => {
    const user = userEvent.setup();
    const onAddTodo = vi.fn();
    render(<AddTodoForm onAddTodo={onAddTodo} />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, '   ');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    expect(onAddTodo).not.toHaveBeenCalled();
  });

  it('should disable input and button while submitting', async () => {
    const user = userEvent.setup();
    const onAddTodo = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    render(<AddTodoForm onAddTodo={onAddTodo} />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByRole('button', { name: /add todo/i });

    await user.type(input, 'New Todo');
    await user.click(button);

    // Wait a bit to check disabled state
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('should submit form when pressing Enter', async () => {
    const user = userEvent.setup();
    const onAddTodo = vi.fn().mockResolvedValue(undefined);
    render(<AddTodoForm onAddTodo={onAddTodo} />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'New Todo{Enter}');

    expect(onAddTodo).toHaveBeenCalledWith('New Todo');
  });
});
