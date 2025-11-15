import { Plus } from 'lucide-react';
import { useState } from 'react';

interface AddTodoFormProps {
  onAddTodo: (title: string) => Promise<void>;
}

export function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    setIsAdding(true);
    try {
      await onAddTodo(newTodoTitle.trim());
      setNewTodoTitle('');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
          disabled={isAdding}
          aria-label="New todo title"
        />
        <button
          type="submit"
          disabled={isAdding || !newTodoTitle.trim()}
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-gray-500 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          aria-label="Add todo"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>
    </form>
  );
}
