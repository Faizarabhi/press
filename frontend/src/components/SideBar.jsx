import {
  Home,
  ClipboardList,
  Calendar,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../store/auth/authSlice'; 

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { to: '/', icon: Home, label: 'Dashboard', roles: ['reporter', 'editor'] },
    { to: '/dashboard/categories', icon: ClipboardList, label: 'Categories', roles: ['editor'] },
    { to: '/dashboard/posts', icon: Calendar, label: 'Posts', roles: ['reporter', 'editor'] },
    { to: '/dashboard/analytics', icon: BarChart2, label: 'Analytics', roles: ['editor'] },
    { to: '/dashboard/team', icon: Users, label: 'Team', roles: ['editor'] },
  ];

  const generalItems = [
    { to: '/settings', icon: Settings, label: 'Settings' },
    { to: '/help', icon: HelpCircle, label: 'Help' },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center px-2 py-1 rounded-md transition-colors duration-200 ${
      isActive ? 'text-orange-500 font-semibold' : 'text-gray-600 hover:text-orange-600'
    }`;

  return (
    <aside className="bg-white shadow-lg h-screen p-6 fixed left-0 top-0 z-20 w-1/5">
      <div className="text-2xl font-bold text-orange-600 mb-8"><img src="/logopress.png" className="h-8 me-3" alt="e Logo" /></div>

      <div className="space-y-8">
        <div>
          <p className="text-gray-400 uppercase text-sm mb-2">Menu</p>
          <ul className="space-y-3">
            {menuItems
              .filter((item) => !item.roles || item.roles.includes(user?.role))
              .map(({ to, icon: Icon, label }) => (
                <li key={to}>
                  <NavLink to={to} className={linkClass}>
                    <Icon className="w-5 h-5 mr-3" />
                    {label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <p className="text-gray-400 uppercase text-sm mb-2">General</p>
          <ul className="space-y-3">
            {generalItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink to={to} className={linkClass}>
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </NavLink>
              </li>
            ))}

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center px-2 py-1 text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
