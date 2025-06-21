import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to DonQ Kanban Board
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Organize your tasks with a simple and intuitive board
        </p>
        <Link
          href="/kanban"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
