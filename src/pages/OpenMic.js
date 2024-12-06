import React, { useState } from 'react';
import { Mic, Users, MessageCircle, ThumbsUp, Clock } from 'lucide-react';

const OpenMic = () => {
  const [isJoiningStage, setIsJoiningStage] = useState(false);

  const mockPerformances = [
    {
      id: 1,
      performer: 'Mike Johnson',
      title: 'Late Night Chronicles',
      viewers: 234,
      status: 'live',
      duration: '15:23',
      likes: 156,
      comments: 45
    },
    {
      id: 2,
      performer: 'Sarah Williams',
      title: 'Comedy Hour Special',
      viewers: 189,
      status: 'upcoming',
      startTime: '10 minutes',
      likes: 0,
      comments: 12
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Open Mic Night</h1>
            <p className="text-gray-600 mt-1">Take the stage and show off your comedy chops!</p>
          </div>
          <button
            onClick={() => setIsJoiningStage(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <Mic className="w-5 h-5 mr-2" />
            Take the Stage
          </button>
        </div>
      </div>

      {/* Live and Upcoming Performances */}
      <div className="grid md:grid-cols-2 gap-6">
        {mockPerformances.map(performance => (
          <div key={performance.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Performance Preview */}
            <div className="relative bg-gray-800 h-48 flex items-center justify-center">
              {performance.status === 'live' ? (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></span>
                  LIVE
                </div>
              ) : (
                <div className="absolute top-4 left-4 bg-gray-600 text-white px-2 py-1 rounded-full text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Starts in {performance.startTime}
                </div>
              )}
              <Mic className="w-16 h-16 text-gray-400" />
            </div>

            {/* Performance Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{performance.title}</h3>
                  <p className="text-gray-600">{performance.performer}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{performance.viewers}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center text-gray-600">
                  <ThumbsUp className="w-5 h-5 mr-1" />
                  <span>{performance.likes}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  <span>{performance.comments}</span>
                </div>
                {performance.status === 'live' && (
                  <div className="text-gray-600">
                    <Clock className="w-5 h-5 inline mr-1" />
                    {performance.duration}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Join Stage Modal */}
      {isJoiningStage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Take the Stage</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Performance Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Give your performance a catchy title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Tell your audience what to expect"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsJoiningStage(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Start Performance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenMic;