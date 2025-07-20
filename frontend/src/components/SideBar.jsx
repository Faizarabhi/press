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
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    const { user } = useSelector((state) => state.auth);

    const menuItems = [
        { to: '/dashboard', icon: Home, label: 'Dashboard', roles: ['reporter', 'editor'] },
        { to: '/dashboard/categories', icon: ClipboardList, label: 'Categories', roles: ['editor'] },
        { to: '/dashboard/posts', icon: Calendar, label: 'Posts', roles: ['reporter', 'editor'] },
        { to: '/dashboard/analytics', icon: BarChart2, label: 'Analytics', roles: ['editor'] },
        { to: '/dashboard/team', icon: Users, label: 'Team', roles: ['editor'] },
    ];

    const generalItems = [
        { to: '/settings', icon: Settings, label: 'Settings' },
        { to: '/help', icon: HelpCircle, label: 'Help' },
        { to: '/logout', icon: LogOut, label: 'Logout' },
    ];

    const linkClass = ({ isActive }) =>
        `flex items-center px-2 py-1 rounded-md transition-colors duration-200 ${isActive ? 'text-green-700 font-semibold' : 'text-gray-600 hover:text-green-600'
        }`;

    return (
        <aside className="bg-white shadow-lg h-screen p-6 fixed left-0 top-0 z-20 w-1/5">
            <div className="text-2xl font-bold text-green-600 mb-8">Donezo</div>

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
                    </ul>
                </div>
            </div>
        </aside>
    );
}
