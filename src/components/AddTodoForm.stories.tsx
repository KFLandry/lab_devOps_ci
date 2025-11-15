import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AddTodoForm } from './AddTodoForm';

const meta = {
  title: 'Components/AddTodoForm',
  component: AddTodoForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onAddTodo: fn(async (title: string) => {
      console.log('Adding todo:', title);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }),
  },
} satisfies Meta<typeof AddTodoForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSubmitDelay: Story = {
  args: {
    onAddTodo: fn(async (title: string) => {
      console.log('Adding todo with delay:', title);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }),
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates the form behavior with a longer submission delay. Try adding a todo to see the loading state.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    onAddTodo: fn(async (title: string) => {
      console.log('Attempting to add todo:', title);
      await new Promise((resolve) => setTimeout(resolve, 500));
      throw new Error('Failed to create todo');
    }),
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story simulates an error during todo creation. The form will still function, but the submission will fail.',
      },
    },
  },
};
