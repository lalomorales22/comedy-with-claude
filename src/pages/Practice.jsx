import React, { useState } from 'react';
import {
  VirtualComedyClub,
  PerformanceAnalytics,
  SpeechAnalysis,
  GestureAnalysis
} from '../components/practice';
import { Play, Activity, FileText, Video } from 'lucide-react';

const Practice = () => {
  const [activeTab, setActiveTab] = useState('virtual-club');

  const tabs = [
    {
      id: 'virtual-club',
      name: 'Virtual Comedy Club',
      icon: Play,
      component: VirtualComedyClub
    },
    {
      id: 'performance-analytics',
      name: 'Performance Analytics',
      icon: Activity,
      component: PerformanceAnalytics
    },
    {
      id: 'speech-analysis',
      name: 'Speech Analysis',
      icon: FileText,
      component: SpeechAnalysis
    },
    {
      id: 'gesture-analysis',
      name: 'Gesture Analysis',
      icon: Video,
      component: GestureAnalysis
    }
  ];

  const renderContent = () => {
    const tab = tabs.find(t => t.id === activeTab);
    if (tab?.component) {
      const Component = tab.component;
      return <Component />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Practice Room</h1>
          <p className="mt-2 text-lg text-gray-600">
            Perfect your comedy with our virtual practice tools
          </p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto space-x-4 mb-8 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center px-4 py-2 rounded-md whitespace-nowrap transition-colors
                ${activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Practice;