export interface User {
  id: string;
  name: string;
  username: string;
  role: 'admin' | 'user';
  office: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  office: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'disapproved' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  adminNotes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  model: string;
  serialNumber: string;
  quantity: number;
  status: 'active' | 'inactive' | 'dispose';
  location: string;
  purchaseDate: Date;
  notes?: string;
}

export interface IncidentReport {
  id: string;
  ticketId: string;
  technicianName: string;
  office: string;
  issueDescription: string;
  itemsNeedReplacement: string[];
  replacementItems: InventoryItem[];
  actionTaken: string;
  reportDate: Date;
  status: 'pending' | 'completed';
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface TroubleshootingGuide {
  id: string;
  title: string;
  category: string;
  description: string;
  steps: string[];
  videoUrl?: string;
  imageUrl?: string;
}