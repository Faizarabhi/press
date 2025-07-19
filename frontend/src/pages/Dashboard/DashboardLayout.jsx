import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Link } from 'react-router-dom'
import { logout } from '../../store/auth/authSlice'
import Filter from '../../components/Filter'

export default function DashboardLayout() {

  const dispatch = useDispatch()

     const { user } = useSelector((state) => state.auth)
  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/'
  }
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-2 fixed min-h-full">
        <h2 className="text-xl font-semibold">Dashboard </h2>
        <nav className="mt-4 flex flex-col justify-around gap-2 min-h-full">
          <div className='flex flex-col'>
          <Link to="/dashboard/posts" className="hover:text-indigo-400">Articles</Link>
          {user.role === 'editor' && 
          <Link to="/dashboard/categories" className="hover:text-indigo-400">categories</Link>}
          </div>

            <Filter/>
          <div>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-gray-200 hover:text-orange-600 transition"
          >
            Logout <span aria-hidden="true">&rarr;</span>
          </button>
          </div>
        </nav>
      </aside>
      <main className="ml-[20rem]">
        <Outlet />
      </main>
    </div>
  )
}
