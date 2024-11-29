import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Key, CreditCard, LogOut } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('micard_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Micard SSO</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Overview</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/keys"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Key className="w-5 h-5" />
                <span>Client Keys</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/pricing"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <CreditCard className="w-5 h-5" />
                <span>Pricing</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 w-full p-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};