import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

// Admin Components
import DataEntry from './components/admin/DataEntry';
import ViewRequests from './components/admin/ViewRequests';
import Inventory from './components/admin/Inventory';
import IncidentReports from './components/admin/IncidentReports';

// User Components
import CreateRequest from './components/user/CreateRequest';
import Troubleshooting from './components/user/Troubleshooting';

// Shared Components
import Messages from './components/shared/Messages';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      
      // Admin Routes
      case 'data-entry':
        return user.role === 'admin' ? <DataEntry /> : <Dashboard />;
      case 'view-requests':
        return user.role === 'admin' ? <ViewRequests /> : <Dashboard />;
      case 'inventory':
        return user.role === 'admin' ? <Inventory /> : <Dashboard />;
      case 'incidents':
        return user.role === 'admin' ? <IncidentReports /> : <Dashboard />;
      
      // User Routes
      case 'create-request':
        return user.role === 'user' ? <CreateRequest /> : <Dashboard />;
      case 'view-requests':
        return user.role === 'user' ? <ViewRequests /> : <Dashboard />;
      case 'troubleshooting':
        return user.role === 'user' ? <Troubleshooting /> : <Dashboard />;
      
      // Shared Routes
      case 'messages':
        return <Messages />;
      
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;