import React, { useState } from 'react';
import { organizeSetList } from '../../services/ai/aiService';

const SetListOrganizer = () => {
  const [jokes, setJokes] = useState([{ id: 1, text: '', duration: '', energy: 'medium', topic: '' }]);
  const [organizedSet, setOrganizedSet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const energyLevels = ['low', 'medium', 'high'];

  const addJoke = () => {
    setJokes([...jokes, {
      id: jokes.length + 1,
      text: '',
      duration: '',
      energy: 'medium',
      topic: ''
    }]);
  };

  const removeJoke = (id) => {
    if (jokes.length > 1) {
      setJokes(jokes.filter(joke => joke.id !== id));
    }
  };

  const updateJoke = (id, field, value) => {
    setJokes(jokes.map(joke => 
      joke.id === id ? { ...joke, [field]: value } : joke
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await organizeSetList(jokes);
      setOrganizedSet(result);
    } catch (err) {
      setError('Failed to organize set list. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Set List Organizer</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {jokes.map((joke) => (
            <div key={joke.id} className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Joke #{joke.id}</h3>
                {jokes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeJoke(joke.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joke/Bit
                  </label>
                  <textarea
                    value={joke.text}
                    onChange={(e) => updateJoke(joke.id, 'text', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={joke.duration}
                      onChange={(e) => updateJoke(joke.id, 'duration', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                      min="0.5"
                      step="0.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Energy Level
                    </label>
                    <select
                      value={joke.energy}
                      onChange={(e) => updateJoke(joke.id, 'energy', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    >
                      {energyLevels.map(level => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Topic/Theme
                    </label>
                    <input
                      type="text"
                      value={joke.topic}
                      onChange={(e) => updateJoke(joke.id, 'topic', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addJoke}
          className="w-full border-2 border-dashed border-gray-300 p-3 rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-400"
        >
          Add Another Joke
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Organizing...' : 'Organize Set List'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {organizedSet && (
        <div className="mt-6 space-y-6">
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-semibold mb-3">Organized Set List</h3>
            <p className="text-gray-700 mb-4">{organizedSet.overview}</p>
            
            <div className="space-y-4">
              {organizedSet.sequence.map((item, index) => (
                <div key={index} className="flex items-start border-l-4 border-blue-500 pl-3">
                  <div className="w-12 text-lg font-bold text-gray-500">
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.reasoning}</p>
                    <div className="mt-1 flex space-x-4 text-sm text-gray-500">
                      <span>{item.duration} mins</span>
                      <span>Energy: {item.energy}</span>
                      <span>Topic: {item.topic}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Set Flow Analysis</h4>
            <p className="text-gray-700">{organizedSet.flowAnalysis}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="list-disc list-inside space-y-2">
              {organizedSet.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-700">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetListOrganizer;