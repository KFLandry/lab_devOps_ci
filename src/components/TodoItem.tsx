import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { type Todo } from '../db/schema';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const isCompleted = todo.completed;

  return (
    <div
      className={`group backdrop-blur-sm border rounded-lg p-4 transition-all duration-300 ${
        isCompleted
          ? 'bg-slate-800/30 border-slate-700/50 hover:border-green-500/30'
          : 'bg-slate-800/50 border-slate-700 hover:border-cyan-500/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 transition-colors ${
            isCompleted
              ? 'text-green-400 hover:text-gray-400'
              : 'text-gray-400 hover:text-cyan-400'
          }`}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        <span
          className={`flex-1 ${
            isCompleted ? 'text-gray-500 line-through' : 'text-white'
          }`}
        >
          {todo.title}
        </span>
        <button
          onClick={() => onDelete(todo.id)}
          className={`flex-shrink-0 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all ${
            isCompleted ? 'text-gray-600' : 'text-gray-500'
          }`}
          aria-label="Delete todo"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
