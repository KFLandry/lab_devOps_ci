export function PageHeader() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-black text-white mb-4">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Todo App
        </span>
      </h1>
      <p className="text-gray-400">
        Built with TanStack Start, React, Tailwind & Drizzle
      </p>
    </div>
  );
}
