import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ticket, InventoryItem, IncidentReport, Message, TroubleshootingGuide } from '../types';

interface DataContextType {
  tickets: Ticket[];
  requests: Ticket[]; // Add requests as alias for tickets
  inventory: InventoryItem[];
  incidents: IncidentReport[];
  messages: Message[];
  troubleshootingGuides: TroubleshootingGuide[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  updateRequestStatus: (id: string, status: 'approved' | 'rejected') => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  addIncidentReport: (report: Omit<IncidentReport, 'id' | 'reportDate'>) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  markMessageAsRead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const mockTroubleshootingGuides: TroubleshootingGuide[] = [
  {
    id: '1',
    title: 'Computer Won\'t Turn On',
    category: 'Hardware',
    description: 'Steps to troubleshoot when your computer won\'t start',
    steps: [
      'Check if the power cable is properly connected to both the computer and wall outlet',
      'Verify the power outlet is working by testing with another device',
      'Try a different power cable if available',
      'Check for loose RAM by reseating memory modules',
      'Look for any indicator lights on the computer case',
      'If issue persists, contact IT support with error details'
    ],
    videoUrl: 'https://example.com/video1',
    imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Slow Internet Connection',
    category: 'Network',
    description: 'How to diagnose and fix slow internet issues',
    steps: [
      'Run an internet speed test to confirm slow speeds',
      'Restart your modem and router by unplugging for 30 seconds',
      'Check for network interference from other devices',
      'Update your network adapter drivers',
      'Clear your browser cache and cookies',
      'Contact network administrator if speeds remain slow'
    ],
    videoUrl: 'https://example.com/video2',
    imageUrl: 'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    title: 'Printer Not Responding',
    category: 'Hardware',
    description: 'Fix common printer connectivity and printing issues',
    steps: [
      'Check if printer is powered on and displays no error messages',
      'Verify printer is connected to computer via USB or network',
      'Check if printer has paper and ink/toner',
      'Restart the print spooler service on your computer',
      'Update or reinstall printer drivers',
      'Try printing a test page from printer settings'
    ],
    imageUrl: 'https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    title: 'Password Reset Procedure',
    category: 'Account',
    description: 'Steps to reset your account password safely',
    steps: [
      'Navigate to the login page and click "Forgot Password"',
      'Enter your email address associated with the account',
      'Check your email for a password reset link',
      'Click the link and create a strong new password',
      'Use a combination of letters, numbers, and symbols',
      'Log in with your new password and update any saved passwords'
    ],
    imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    title: 'Software Installation Issues',
    category: 'Software',
    description: 'Resolve problems when installing new software',
    steps: [
      'Check if you have administrator privileges on the computer',
      'Verify system requirements match the software specifications',
      'Temporarily disable antivirus software during installation',
      'Clear temporary files and restart the computer',
      'Download the software installer again from official source',
      'Run the installer as administrator and follow prompts carefully'
    ],
    imageUrl: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    title: 'Email Configuration Setup',
    category: 'Software',
    description: 'Configure email client for school email account',
    steps: [
      'Open your email client (Outlook, Mail app, etc.)',
      'Go to Account Settings and select "Add Account"',
      'Choose "Manual setup" for advanced configuration',
      'Enter your school email address and password',
      'Configure incoming server (IMAP/POP3) settings',
      'Configure outgoing server (SMTP) settings',
      'Test the connection and send a test email'
    ],
    imageUrl: 'https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [troubleshootingGuides] = useState<TroubleshootingGuide[]>(mockTroubleshootingGuides);

  useEffect(() => {
    // Load initial sample data
    const sampleInventory: InventoryItem[] = [
      {
        id: '1',
        name: 'Dell Desktop Computer',
        category: 'Computer',
        model: 'OptiPlex 7090',
        serialNumber: 'DL001234',
        quantity: 15,
        status: 'active',
        location: 'IT Storage Room A',
        purchaseDate: new Date('2023-01-15'),
        notes: 'Standard desktop computers for classrooms'
      },
      {
        id: '2',
        name: 'HP Laptop',
        category: 'Computer',
        model: 'EliteBook 840',
        serialNumber: 'HP005678',
        quantity: 8,
        status: 'active',
        location: 'IT Storage Room B',
        purchaseDate: new Date('2023-03-10'),
        notes: 'Portable laptops for mobile teaching'
      },
      {
        id: '3',
        name: 'Canon Printer',
        category: 'Printer',
        model: 'PIXMA TR8620',
        serialNumber: 'CN789012',
        quantity: 3,
        status: 'active',
        location: 'Faculty Office',
        purchaseDate: new Date('2023-05-20'),
        notes: 'Color printers for administrative use'
      },
      {
        id: '4',
        name: 'Samsung Monitor',
        category: 'Monitor',
        model: '24" LED',
        serialNumber: 'SM345678',
        quantity: 2,
        status: 'inactive',
        location: 'IT Storage Room A',
        purchaseDate: new Date('2022-08-15'),
        notes: 'Monitors with minor display issues'
      },
      {
        id: '5',
        name: 'Old Desktop Computer',
        category: 'Computer',
        model: 'Compaq 8300',
        serialNumber: 'HP901234',
        quantity: 5,
        status: 'dispose',
        location: 'Storage Basement',
        purchaseDate: new Date('2019-02-10'),
        notes: 'End of life computers scheduled for disposal'
      }
    ];

    const sampleTickets: Ticket[] = [
      {
        id: '1',
        ticketNumber: 'TK0001',
        userId: '2',
        userName: 'John Teacher',
        office: 'Mathematics Department',
        category: 'Hardware Issue',
        description: 'Classroom computer won\'t boot up. Shows black screen when powered on.',
        priority: 'high',
        status: 'pending',
        createdAt: new Date('2024-01-10T09:30:00'),
        updatedAt: new Date('2024-01-10T09:30:00')
      },
      {
        id: '2',
        ticketNumber: 'TK0002',
        userId: '2',
        userName: 'John Teacher',
        office: 'Mathematics Department',
        category: 'Software Issue',
        description: 'Unable to access email. Getting authentication error when trying to log in.',
        priority: 'medium',
        status: 'approved',
        createdAt: new Date('2024-01-09T14:15:00'),
        updatedAt: new Date('2024-01-09T16:20:00'),
        adminNotes: 'Approved. Will reset email password and provide new credentials.'
      }
    ];

    setInventory(sampleInventory);
    setTickets(sampleTickets);
  }, []);

  const addTicket = (ticketData: Omit<Ticket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      ticketNumber: `TK${String(tickets.length + 1).padStart(4, '0')}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTickets(prev => [...prev, newTicket]);
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === id ? { ...ticket, ...updates, updatedAt: new Date() } : ticket
    ));
  };

  const updateRequestStatus = (id: string, status: 'approved' | 'rejected') => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === id ? { 
        ...ticket, 
        status: status === 'approved' ? 'approved' : 'disapproved', 
        updatedAt: new Date() 
      } : ticket
    ));
  };
  const addInventoryItem = (itemData: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: Date.now().toString()
    };
    setInventory(prev => [...prev, newItem]);
  };

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const addIncidentReport = (reportData: Omit<IncidentReport, 'id' | 'reportDate'>) => {
    const newReport: IncidentReport = {
      ...reportData,
      id: Date.now().toString(),
      reportDate: new Date()
    };
    setIncidents(prev => [...prev, newReport]);
  };

  const addMessage = (messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const markMessageAsRead = (id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  return (
    <DataContext.Provider value={{
      tickets,
      requests: tickets, // Provide requests as alias for tickets
      inventory,
      incidents,
      messages,
      troubleshootingGuides,
      addTicket,
      updateTicket,
      updateRequestStatus,
      addInventoryItem,
      updateInventoryItem,
      deleteInventoryItem,
      addIncidentReport,
      addMessage,
      markMessageAsRead
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};