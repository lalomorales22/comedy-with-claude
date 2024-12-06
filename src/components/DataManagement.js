import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DataManagement = () => {
  const [formData, setFormData] = useState({
    month: '',
    revenue: '',
    users: '',
    engagement: ''
  });

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Data added successfully!');
        setFormData({ month: '', revenue: '', users: '', engagement: '' });
      } else {
        setMessage('Error adding data. Please try again.');
      }
    } catch (error) {
      setMessage('Error connecting to server. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Data Management</h1>
          <Link 
            to="/" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Data</h2>
          
          {message && (
            <div className={`mb-4 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                placeholder="e.g., Jan"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Revenue
              </label>
              <input
                type="number"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                placeholder="e.g., 5000"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Users
              </label>
              <input
                type="number"
                name="users"
                value={formData.users}
                onChange={handleChange}
                placeholder="e.g., 1200"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Engagement Rate
              </label>
              <input
                type="number"
                name="engagement"
                value={formData.engagement}
                onChange={handleChange}
                placeholder="e.g., 75"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Data
            </button>
          </form>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Current Data</h2>
            {/* Add a table or list to display current data */}
            {/* This would be populated from your backend */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;