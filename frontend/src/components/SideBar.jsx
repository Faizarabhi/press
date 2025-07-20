import { Home, ClipboardList, Calendar, BarChart2, Users, Settings, HelpCircle, LogOut } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className=" bg-white shadow-lg h-screen p-6 fixed left-0 top-0 z-20 w-1/5">
      <div className="text-2xl font-bold text-green-600 mb-8">Donezo</div>
      <nav className="space-y-6">
        <div>
          <p className="text-gray-400 uppercase text-sm">Menu</p>
          <ul className="space-y-4 mt-2">
            <li className="flex items-center text-green-700 font-semibold">
              <Home className="w-5 h-5 mr-3" /> Dashboard
            </li>
            <li className="flex items-center text-gray-600 hover:text-green-700 cursor-pointer">
              <ClipboardList className="w-5 h-5 mr-3" /> Tasks
            </li>
            <li className="flex items-center text-gray-600 hover:text-green-700 cursor-pointer">
              <Calendar className="w-5 h-5 mr-3" /> Calendar
            </li>
            <li className="flex items-center text-gray-600 hover:text-green-700 cursor-pointer">
              <BarChart2 className="w-5 h-5 mr-3" /> Analytics
            </li>
            <li className="flex items-center text-gray-600 hover:text-green-700 cursor-pointer">
              <Users className="w-5 h-5 mr-3" /> Team
            </li>
          </ul>
        </div>

        <div>
          <p className="text-gray-400 uppercase text-sm">General</p>
          <ul className="space-y-4 mt-2">
            <li className="flex items-center text-gray-600 hover:text-green-700 cursor-pointer">
              <Settings className="w-5 h-5 mr-3" /> Settings
            </li>
            <li className="flex items-center text-gray-600 hover:text-green-700 cursor-pointer">
              <HelpCircle className="w-5 h-5 mr-3" /> Help
            </li>
            <li className="flex items-center text-gray-600 hover:text-green-700 cursor-pointer">
              <LogOut className="w-5 h-5 mr-3" /> Logout
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
