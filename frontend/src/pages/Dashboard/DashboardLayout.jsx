import { Outlet, Link } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-2">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <nav className="mt-4 flex flex-col gap-2">
          <Link to="/dashboard/posts" className="hover:text-indigo-400">Articles</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
