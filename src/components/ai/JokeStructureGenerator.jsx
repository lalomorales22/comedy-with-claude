import React, { useState } from 'react';
import { generateJokeStructure } from '../../services/ai/aiService';

const JokeStructureGenerator = () => {
  const [topic, setTopic] = useState('');
  const [structures, setStructures] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await generateJokeStructure(topic);
      setStructures(result);
    } catch (err) {
      setError('Failed to generate joke structures. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Joke Structure Generator</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
            Topic/Theme
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your comedy topic..."
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Structures'}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {structures && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-3">Generated Structures:</h3>
          <div className="space-y-4">
            {structures.map((structure, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">{structure.type}</h4>
                <p className="text-gray-700">{structure.description}</p>
                {structure.example && (
                  <div className="mt-2 text-sm text-gray-600">
                    Example: {structure.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JokeStructureGenerator;