import React, { useState } from 'react';
import {
  JokeStructureGenerator,
  PunchlineEnhancer,
  ComedyStyleAnalyzer,
  CrowdWorkSimulator,
  SetListOrganizer
} from '../components/ai';

const AITools = () => {
  const [activeTool, setActiveTool] = useState('joke-structure');

  const tools = [
    { id: 'joke-structure', name: 'Joke Structure Generator' },
    { id: 'punchline', name: 'Punchline Enhancer' },
    { id: 'style', name: 'Comedy Style Analyzer' },
    { id: 'crowd-work', name: 'Crowd Work Simulator' },
    { id: 'set-list', name: 'Set List Organizer' }
  ];

  const renderTool = () => {
    switch (activeTool) {
      case 'joke-structure':
        return <JokeStructureGenerator />;
      case 'punchline':
        return <PunchlineEnhancer />;
      case 'style':
        return <ComedyStyleAnalyzer />;
      case 'crowd-work':
        return <CrowdWorkSimulator />;
      case 'set-list':
        return <SetListOrganizer />;
      default:
        return <JokeStructureGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Comedy Assistant Tools</h1>
          <p className="mt-2 text-gray-600">Enhance your comedy writing and performance with AI-powered tools</p>
        </div>

        <div className="flex overflow-x-auto space-x-4 mb-8 pb-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                activeTool === tool.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tool.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow">
          {renderTool()}
        </div>
      </div>
    </div>
  );
};

export default AITools;