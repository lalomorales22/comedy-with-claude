import React, { useState } from 'react';
import { simulateCrowdWork } from '../../services/ai/aiService';

const CrowdWorkSimulator = () => {
  const [demographic, setDemographic] = useState('');
  const [setting, setSetting] = useState('');
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const venues = [
    'Comedy Club',
    'Corporate Event',
    'College Campus',
    'Bar/Pub',
    'Theater',
    'Private Party'
  ];

  const demographics = [
    'Young Professionals',
    'College Students',
    'Corporate Audience',
    'Mixed Age Groups',
    'Family Friendly',
    'Late Night Crowd'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await simulateCrowdWork({ demographic, setting });
      setScenario(result);
    } catch (err) {
      setError('Failed to generate crowd work scenario. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Crowd Work Simulator</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="demographic" className="block text-sm font-medium text-gray-700 mb-2">
            Audience Demographic
          </label>
          <select
            id="demographic"
            value={demographic}
            onChange={(e) => setDemographic(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Demographic</option>
            {demographics.map((demo) => (
              <option key={demo} value={demo}>{demo}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="setting" className="block text-sm font-medium text-gray-700 mb-2">
            Venue Setting
          </label>
          <select
            id="setting"
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Venue</option>
            {venues.map((venue) => (
              <option key={venue} value={venue}>{venue}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Scenario'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {scenario && (
        <div className="mt-6 space-y-6">
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-semibold mb-3">Scenario Setup</h3>
            <p className="text-gray-700">{scenario.setup}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Audience Personas</h4>
            <div className="space-y-3">
              {scenario.personas.map((persona, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-3">
                  <p className="font-medium">{persona.name}</p>
                  <p className="text-sm text-gray-600">{persona.description}</p>
                  <p className="text-sm text-gray-500 mt-1">Likely responses: {persona.responses.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Suggested Approaches</h4>
            <ul className="space-y-2">
              {scenario.suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-medium">{suggestion.title}: </span>
                  {suggestion.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Potential Challenges</h4>
            <ul className="list-disc list-inside space-y-2">
              {scenario.challenges.map((challenge, index) => (
                <li key={index} className="text-gray-700">
                  {challenge.problem}
                  <p className="ml-5 text-sm text-gray-600">Solution: {challenge.solution}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrowdWorkSimulator;