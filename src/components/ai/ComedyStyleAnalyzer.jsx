import React, { useState } from 'react';
import { analyzeComedyStyle } from '../../services/ai/aiService';

const ComedyStyleAnalyzer = () => {
  const [routine, setRoutine] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeComedyStyle(routine);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze comedy style. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Comedy Style Analyzer</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="routine" className="block text-sm font-medium text-gray-700 mb-2">
            Your Joke/Routine
          </label>
          <textarea
            id="routine"
            value={routine}
            onChange={(e) => setRoutine(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="6"
            placeholder="Paste your comedy routine here..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Style'}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-semibold mb-3">Style Overview</h3>
            <p className="text-gray-700">{analysis.overview}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="font-medium mb-2">Strengths</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {analysis.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="font-medium mb-2">Areas for Improvement</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Pacing Analysis</h4>
            <div className="space-y-2">
              <p className="text-gray-700">{analysis.pacing.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${analysis.pacing.score}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Word Choice Analysis</h4>
            <div className="space-y-2">
              <p className="text-gray-700">{analysis.wordChoice.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {analysis.wordChoice.highlights.map((highlight, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    <span className="font-medium">{highlight.word}: </span>
                    {highlight.note}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Similar Comedians</h4>
            <div className="grid grid-cols-2 gap-4">
              {analysis.similarComedians.map((comedian, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{comedian.name}</span>
                  <p className="text-gray-600">{comedian.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComedyStyleAnalyzer;