import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TodoList } from './TodoList';
import { type Todo } from '../db/schema';

const meta = {
  title: 'Components/TodoList',
  component: TodoList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onToggle: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

const createMockTodo = (overrides?: Partial<Todo>): Todo => ({
  id: 1,
  title: 'Complete project documentation',
  completed: false,
  createdAt: new Date('2024-01-01'),
  ...overrides,
});

export const Empty: Story = {
  args: {
    todos: [],
  },
};

export const OnlyActiveTodos: Story = {
  args: {
    todos: [
      createMockTodo({ id: 1, title: 'Write unit tests' }),
      createMockTodo({ id: 2, title: 'Create Storybook stories' }),
      createMockTodo({ id: 3, title: 'Update documentation' }),
    ],
  },
};

export const OnlyCompletedTodos: Story = {
  args: {
    todos: [
      createMockTodo({ id: 1, title: 'Setup project', completed: true }),
      createMockTodo({ id: 2, title: 'Install dependencies', completed: true }),
      createMockTodo({ id: 3, title: 'Configure linting', completed: true }),
    ],
  },
};

export const MixedTodos: Story = {
  args: {
    todos: [
      createMockTodo({ id: 1, title: 'Write unit tests' }),
      createMockTodo({ id: 2, title: 'Create Storybook stories' }),
      createMockTodo({ id: 3, title: 'Setup project', completed: true }),
      createMockTodo({ id: 4, title: 'Install dependencies', completed: true }),
      createMockTodo({ id: 5, title: 'Update documentation' }),
    ],
  },
};

export const ManyTodos: Story = {
  args: {
    todos: [
      createMockTodo({ id: 1, title: 'Write unit tests' }),
      createMockTodo({ id: 2, title: 'Create Storybook stories' }),
      createMockTodo({ id: 3, title: 'Update documentation' }),
      createMockTodo({ id: 4, title: 'Review pull requests' }),
      createMockTodo({ id: 5, title: 'Refactor components' }),
      createMockTodo({ id: 6, title: 'Setup project', completed: true }),
      createMockTodo({ id: 7, title: 'Install dependencies', completed: true }),
      createMockTodo({ id: 8, title: 'Configure linting', completed: true }),
      createMockTodo({ id: 9, title: 'Setup CI/CD', completed: true }),
      createMockTodo({ id: 10, title: 'Add error handling', completed: true }),
    ],
  },
};

export const LongTitles: Story = {
  args: {
    todos: [
      createMockTodo({
        id: 1,
        title:
          'This is a very long active todo title that should demonstrate how the component handles text wrapping and maintains proper layout even with extended content',
      }),
      createMockTodo({
        id: 2,
        title:
          'Another long todo title that showcases the ability to handle multiple lengthy items in the same list without breaking the layout',
        completed: true,
      }),
    ],
  },
};
