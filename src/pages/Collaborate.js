import React, { useState } from 'react';
import { Users, MessageSquare, Save, Share2, Lock, Globe } from 'lucide-react';

const Collaborate = () => {
  const [selectedTab, setSelectedTab] = useState('myScripts');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const mockScripts = [
    {
      id: 1,
      title: "Coffee Shop Chronicles",
      collaborators: ["John Smith", "Sarah Lee"],
      lastEdited: "2 hours ago",
      status: "In Progress",
      visibility: "private"
    },
    {
      id: 2,
      title: "Tech Support Nightmares",
      collaborators: ["Mike Johnson", "Emily Chen", "David Kim"],
      lastEdited: "1 day ago",
      status: "Ready for Review",
      visibility: "public"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Comedy Writer's Room</h1>
            <p className="text-gray-600 mt-1">Collaborate on scripts and sketches with other comedians</p>
          </div>
          <button
            onClick={() => setIsCreatingNew(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            New Script
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setSelectedTab('myScripts')}
              className={`py-4 px-1 ${
                selectedTab === 'myScripts'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Scripts
            </button>
            <button
              onClick={() => setSelectedTab('shared')}
              className={`py-4 px-1 ${
                selectedTab === 'shared'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Shared with Me
            </button>
            <button
              onClick={() => setSelectedTab('community')}
              className={`py-4 px-1 ${
                selectedTab === 'community'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Community Scripts
            </button>
          </nav>
        </div>
      </div>

      {/* Scripts List */}
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y">
          {mockScripts.map(script => (
            <div key={script.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {script.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{script.collaborators.length} collaborators</span>
                    </div>
                    <div>{script.lastEdited}</div>
                    <div className="flex items-center">
                      {script.visibility === 'private' ? (
                        <Lock className="w-4 h-4 mr-1" />
                      ) : (
                        <Globe className="w-4 h-4 mr-1" />
                      )}
                      {script.visibility}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex -space-x-2">
                  {script.collaborators.map((collaborator, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium"
                    >
                      {collaborator.charAt(0)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Script Modal */}
      {isCreatingNew && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Script</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Script Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Give your script a title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="What's this script about?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visibility
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsCreatingNew(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Create Script
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaborate;