import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PenSquare, Sparkles, Target, Brain, Bell, Search, Menu, Settings, Zap } from 'lucide-react';

function Dashboard() {
  const [jokes, setJokes] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample joke categories
  const categories = [
    'Observational',
    'Wordplay',
    'Situational',
    'Character-based',
    'One-liners'
  ];

  // Sample writing prompts
  const prompts = [
    'Write about a GPS that only gives directions in dad jokes',
    'A stand-up comedian performs for an audience of AI robots',
    'Your pet starts doing your comedy routine better than you',
    'A dating app that matches people based on their sense of humor goes horribly wrong'
  ];

  const generateNewPrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(randomPrompt);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-gray-500 mr-4" />
              <span className="text-xl font-semibold">Comedy Writer's Hub</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search your jokes..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Writing Prompt Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Writing Prompt</h2>
            <button 
              onClick={generateNewPrompt}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
            >
              <Zap className="h-4 w-4 mr-2" />
              Generate New Prompt
            </button>
          </div>
          <p className="text-lg text-gray-700 bg-purple-50 p-4 rounded-lg">
            {prompt || "Click 'Generate New Prompt' to get started!"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <PenSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Jokes Written</p>
                <p className="text-2xl font-semibold">42</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Best Performing</p>
                <p className="text-2xl font-semibold">One-liners</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Writing Streak</p>
                <p className="text-2xl font-semibold">7 days</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <Brain className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Ideas Generated</p>
                <p className="text-2xl font-semibold">156</p>
              </div>
            </div>
          </div>
        </div>

        {/* Writing Area and Recent Jokes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Writing Area */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Write</h3>
            <div className="space-y-4">
              <select 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <textarea
                className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Write your joke here..."
              />
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Save Joke
              </button>
            </div>
          </div>

          {/* Recent Jokes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Jokes</h3>
            <div className="space-y-4">
              {[
                { title: "The GPS Dad", category: "Character-based", date: "2 hours ago" },
                { title: "Coffee Shop Confusion", category: "Situational", date: "5 hours ago" },
                { title: "Tech Support Blues", category: "Observational", date: "1 day ago" },
                { title: "The Social Media Predicament", category: "One-liners", date: "2 days ago" }
              ].map((joke, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{joke.title}</h4>
                      <p className="text-sm text-gray-500">{joke.category}</p>
                    </div>
                    <span className="text-xs text-gray-400">{joke.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;