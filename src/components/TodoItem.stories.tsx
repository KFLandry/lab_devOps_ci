import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TodoItem } from './TodoItem';
import { type Todo } from '../db/schema';

const meta = {
  title: 'Components/TodoItem',
  component: TodoItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onToggle: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const createMockTodo = (overrides?: Partial<Todo>): Todo => ({
  id: 1,
  title: 'Complete project documentation',
  completed: false,
  createdAt: new Date('2024-01-01'),
  ...overrides,
});

export const Active: Story = {
  args: {
    todo: createMockTodo(),
  },
};

export const Completed: Story = {
  args: {
    todo: createMockTodo({
      completed: true,
      title: 'Review pull request',
    }),
  },
};

export const LongTitle: Story = {
  args: {
    todo: createMockTodo({
      title:
        'This is a very long todo title that should demonstrate how the component handles text wrapping and maintains proper layout even with extended content',
    }),
  },
};

export const CompletedLongTitle: Story = {
  args: {
    todo: createMockTodo({
      completed: true,
      title:
        'This is a completed todo with a very long title that should demonstrate how the component handles text wrapping and maintains proper layout',
    }),
  },
};

export const MultipleTodos: Story = {
  render: (args) => (
    <div className="space-y-3">
      <TodoItem
        {...args}
        todo={createMockTodo({ id: 1, title: 'Write unit tests' })}
      />
      <TodoItem
        {...args}
        todo={createMockTodo({ id: 2, title: 'Create Storybook stories' })}
      />
      <TodoItem
        {...args}
        todo={createMockTodo({
          id: 3,
          title: 'Update documentation',
          completed: true,
        })}
      />
    </div>
  ),
};
