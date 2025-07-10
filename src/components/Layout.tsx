import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Users, 
  FileText, 
  Package, 
  AlertTriangle, 
  MessageCircle, 
  HelpCircle,
  LogOut,
  Plus,
  Eye
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'data-entry', label: 'Data Entry', icon: Plus },
    { id: 'view-requests', label: 'View Requests', icon: Eye },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'incidents', label: 'Incident Reports', icon: AlertTriangle },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
  ];

  const userMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create-request', label: 'Create Request', icon: FileText },
    { id: 'view-requests', label: 'View Requests', icon: Eye },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: HelpCircle },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600 mr-2" />
                  <h1 className="text-xl font-bold text-gray-900">SJCSI IT Support Technical Ticketing and Inventory Management System</h1>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user?.name}</div>
                <div className="text-gray-500">{user?.office}</div>
              </div>
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;