import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { AlertTriangle, Plus, Calendar, User, MapPin } from 'lucide-react';

const IncidentReports: React.FC = () => {
  const { incidents, addIncidentReport, tickets } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    ticketId: '',
    technicianName: '',
    office: '',
    issueDescription: '',
    itemsNeedReplacement: '',
    actionTaken: 'REPLACEMENT' as const,
    status: 'pending' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReport = {
      ...formData,
      itemsNeedReplacement: formData.itemsNeedReplacement.split(',').map(item => item.trim()),
      replacementItems: [] // This would be populated when items are actually replaced
    };

    addIncidentReport(newReport);
    setFormData({
      ticketId: '',
      technicianName: '',
      office: '',
      issueDescription: '',
      itemsNeedReplacement: '',
      actionTaken: 'REPLACEMENT',
      status: 'pending'
    });
    setIsFormOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incident Reports</h1>
          <p className="text-gray-600">Track and manage technician incident reports</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{incidents.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reports</p>
              <p className="text-2xl font-bold text-yellow-600">
                {incidents.filter(incident => incident.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Reports</p>
              <p className="text-2xl font-bold text-green-600">
                {incidents.filter(incident => incident.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Incident Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Report #{incident.id}</h4>
                      <p className="text-sm text-gray-600">Related to ticket: {incident.ticketId}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    incident.status === 'pending troubleshooting' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {incident.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{incident.technicianName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{incident.office}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      {new Date(incident.reportDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-700 mb-3">
                  <p><strong>Issue:</strong> {incident.issueDescription}</p>
                </div>


                {incident.itemsNeedReplacement.length > 0 && (
                  <div className="text-sm text-gray-700 mb-2">
                    <strong>Items Need Replacement:</strong> {incident.itemsNeedReplacement.join(', ')}
                  </div>
                )}

                <div className="text-sm text-gray-700">
                  <strong>Action Taken:</strong> {incident.actionTaken}
                </div>
              </div>
            ))}
            {incidents.length === 0 && (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No incident reports found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Report Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create Incident Report</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Related Ticket</label>
                  <select
                    name="ticketId"
                    value={formData.ticketId}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Ticket</option>
                    {tickets.map(ticket => (
                      <option key={ticket.id} value={ticket.id}>
                        {ticket.ticketNumber} - {ticket.description.substring(0, 30)}...
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technician Name</label>
                  <input
                    type="text"
                    name="technicianName"
                    value={formData.technicianName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Office/Location</label>
                  <input
                    type="text"
                    name="office"
                    value={formData.office}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Description</label>
                <textarea
                  name="issueDescription"
                  value={formData.issueDescription}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Items Need Replacement (comma-separated)</label>
                <input
                  type="text"
                  name="itemsNeedReplacement"
                  value={formData.itemsNeedReplacement}
                  onChange={handleChange}
                  placeholder="e.g., Power Supply, RAM, Hard Drive"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action Taken</label>
                <select
                  name="actionTaken"
                  value={formData.actionTaken}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="REPLACEMENT">REPLACEMENT</option>
                  <option value="TROUBLESHOOT">TROUBLESHOOT</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentReports;