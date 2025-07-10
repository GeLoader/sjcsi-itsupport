import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { FileText, Send, CheckCircle } from 'lucide-react';

const CreateRequest: React.FC = () => {
  const { user } = useAuth();
  const { addTicket } = useData();
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    priority: 'medium' as const
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const newTicketNumber = `TK${String(Date.now()).slice(-4)}`;
    
    addTicket({
      userId: user.id,
      userName: user.name,
      office: user.office,
      category: formData.category,
      description: formData.description,
      priority: formData.priority,
      status: 'pending'
    });

    setTicketNumber(newTicketNumber);
    setIsSubmitted(true);
    setFormData({
      category: '',
      description: '',
      priority: 'medium'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setTicketNumber('');
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 text-center">
          <div className="mb-6">
            <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted Successfully!</h2>
            <p className="text-gray-600">Your ticket number is: <span className="font-semibold text-blue-600">{ticketNumber}</span></p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-blue-800 text-sm">
              Your request has been submitted and is awaiting admin approval. You will be notified once your request is reviewed.
            </p>
          </div>

          <button
            onClick={resetForm}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Support Request</h1>
        <p className="text-gray-600">Submit a new IT support request and get help from our team</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Request Form</h3>
              <p className="text-sm text-gray-600">Fill out the form below to submit your support request</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Request Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="Hardware Issue">Hardware Issue</option>
                <option value="Software Issue">Software Issue</option>
                <option value="Network Problem">Network Problem</option>
                <option value="Password Reset">Password Reset</option>
                <option value="Equipment Request">Equipment Request</option>
                <option value="Printer Issue">Printer Issue</option>
                <option value="Email Problem">Email Problem</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low - Minor issue, can wait</option>
                <option value="medium">Medium - Moderate impact</option>
                <option value="high">High - Critical issue, urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                required
                placeholder="Please describe your issue in detail. Include any error messages, steps you've tried, and when the problem started."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Request Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Requester:</span>
                  <span className="ml-2 font-medium text-gray-900">{user?.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Office:</span>
                  <span className="ml-2 font-medium text-gray-900">{user?.office}</span>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <span className="ml-2 font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 font-medium text-yellow-600">Will be Pending</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;