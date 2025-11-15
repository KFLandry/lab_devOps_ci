interface TodoStatsProps {
  activeCount: number;
  completedCount: number;
}

export function TodoStats({ activeCount, completedCount }: TodoStatsProps) {
  return (
    <div className="flex gap-4 mb-6 text-sm text-gray-400">
      <div>
        <span className="font-semibold text-cyan-400">{activeCount}</span>{' '}
        active
      </div>
      <div>
        <span className="font-semibold text-green-400">{completedCount}</span>{' '}
        completed
      </div>
    </div>
  );
}
