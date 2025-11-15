import type { Meta, StoryObj } from '@storybook/react';
import { TodoStats } from './TodoStats';

const meta = {
  title: 'Components/TodoStats',
  component: TodoStats,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TodoStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeCount: 3,
    completedCount: 5,
  },
};

export const NoTodos: Story = {
  args: {
    activeCount: 0,
    completedCount: 0,
  },
};

export const OnlyActive: Story = {
  args: {
    activeCount: 8,
    completedCount: 0,
  },
};

export const OnlyCompleted: Story = {
  args: {
    activeCount: 0,
    completedCount: 12,
  },
};

export const ManyTodos: Story = {
  args: {
    activeCount: 42,
    completedCount: 158,
  },
};
