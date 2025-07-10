import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { 
  FileText, 
  Package, 
  AlertTriangle, 
  MessageCircle, 
  TrendingUp,
  CheckCircle,
  Clock,
  Users
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { tickets, inventory, incidents, messages } = useData();

  const userTickets = tickets.filter(ticket => ticket.userId === user?.id);
  const unreadMessages = messages.filter(msg => msg.receiverId === user?.id && !msg.read);

  const StatCard: React.FC<{ 
    title: string; 
    value: number; 
    icon: React.ComponentType<{ className?: string }>; 
    color: string;
    description: string;
  }> = ({ title, value, icon: Icon, color, description }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const adminStats = [
    {
      title: 'Total Tickets',
      value: tickets.length,
      icon: FileText,
      color: 'bg-blue-500',
      description: 'All support requests'
    },
    {
      title: 'Pending Tickets',
      value: tickets.filter(t => t.status === 'pending').length,
      icon: Clock,
      color: 'bg-yellow-500',
      description: 'Awaiting approval'
    },
    {
      title: 'Inventory Items',
      value: inventory.length,
      icon: Package,
      color: 'bg-green-500',
      description: 'Total items in stock'
    },
    {
      title: 'Incident Reports',
      value: incidents.length,
      icon: AlertTriangle,
      color: 'bg-red-500',
      description: 'Filed reports'
    }
  ];

  const userStats = [
    {
      title: 'My Tickets',
      value: userTickets.length,
      icon: FileText,
      color: 'bg-blue-500',
      description: 'Total requests made'
    },
    {
      title: 'Pending',
      value: userTickets.filter(t => t.status === 'pending').length,
      icon: Clock,
      color: 'bg-yellow-500',
      description: 'Awaiting approval'
    },
    {
      title: 'Completed',
      value: userTickets.filter(t => t.status === 'completed').length,
      icon: CheckCircle,
      color: 'bg-green-500',
      description: 'Resolved tickets'
    },
    {
      title: 'Unread Messages',
      value: unreadMessages.length,
      icon: MessageCircle,
      color: 'bg-purple-500',
      description: 'New messages'
    }
  ];

  const stats = user?.role === 'admin' ? adminStats : userStats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}
            </h1>
            <p className="text-gray-600 mt-1">
              {user?.role === 'admin' ? 'System Administrator' : 'User'} - {user?.office}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tickets</h3>
          <div className="space-y-3">
            {(user?.role === 'admin' ? tickets : userTickets)
              .slice(0, 5)
              .map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{ticket.ticketNumber}</p>
                    <p className="text-sm text-gray-600">{ticket.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    ticket.status === 'approved' ? 'bg-green-100 text-green-800' :
                    ticket.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              ))}
            {(user?.role === 'admin' ? tickets : userTickets).length === 0 && (
              <p className="text-gray-500 text-center py-4">No tickets found</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {user?.role === 'admin' ? (
              <>
                <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium text-blue-900">Add New Inventory Item</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-medium text-green-900">Review Pending Tickets</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="font-medium text-purple-900">Create Incident Report</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium text-blue-900">Create New Request</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-medium text-green-900">Check Troubleshooting</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="font-medium text-purple-900">Send Message to Admin</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;