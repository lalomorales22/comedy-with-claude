import React, { useState } from 'react';
import { enhancePunchline } from '../../services/ai/aiService';

const PunchlineEnhancer = () => {
  const [setup, setSetup] = useState('');
  const [currentPunchline, setCurrentPunchline] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await enhancePunchline(setup, currentPunchline);
      setSuggestions(result);
    } catch (err) {
      setError('Failed to enhance punchline. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Punchline Enhancer</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="setup" className="block text-sm font-medium text-gray-700 mb-2">
            Setup
          </label>
          <textarea
            id="setup"
            value={setup}
            onChange={(e) => setSetup(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Enter your joke setup..."
            required
          />
        </div>

        <div>
          <label htmlFor="currentPunchline" className="block text-sm font-medium text-gray-700 mb-2">
            Current Punchline
          </label>
          <textarea
            id="currentPunchline"
            value={currentPunchline}
            onChange={(e) => setCurrentPunchline(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="2"
            placeholder="Enter your current punchline..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Enhancing...' : 'Enhance Punchline'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {suggestions && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Alternative Punchlines:</h3>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-md">
                <p className="text-gray-800">{suggestion.text}</p>
                {suggestion.explanation && (
                  <p className="mt-2 text-sm text-gray-600">
                    Why it works: {suggestion.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PunchlineEnhancer;