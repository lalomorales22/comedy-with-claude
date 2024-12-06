import React, { useState } from 'react';
import { Calendar, MapPin, Globe, Twitter, Instagram, Youtube, Award, Star, Clock, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('content');

  const mockProfile = {
    name: "Sarah Johnson",
    handle: "@sarahjcomedy",
    avatar: "/avatars/sarah.jpg",
    bio: "Stand-up comedian, writer, and podcast host. Making people laugh since 2015. Usually found at The Comedy Store or writing jokes about my cat.",
    location: "Los Angeles, CA",
    followers: 12500,
    following: 890,
    tags: ["Stand-up", "Observational", "Podcaster"],
    achievements: [
      { title: "Rising Star 2023", icon: Star },
      { title: "100 Shows Milestone", icon: Award },
      { title: "Top Creator", icon: Award }
    ]
  };

  const mockContent = [
    {
      id: 1,
      type: 'joke',
      content: "Just spent $300 on a 'smart' fridge. All it does is judge my pizza-to-vegetable ratio and passive-aggressively reorganize my leftovers.",
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: '2h ago'
    },
    {
      id: 2,
      type: 'show',
      title: "Weekend Special",
      venue: "The Comedy Store",
      date: "2024-12-15",
      time: "8:00 PM",
      tickets: "Available",
      price: "$25"
    }
  ];

  const mockUpcoming = [
    {
      id: 1,
      title: "Comedy Night Live",
      date: "2024-12-20",
      venue: "Laugh Factory",
      time: "9:00 PM"
    },
    {
      id: 2,
      title: "Podcast Recording - Comedy Chronicles",
      date: "2024-12-22",
      venue: "Virtual",
      time: "7:00 PM"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        {/* Profile Info */}
        <div className="p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="relative -mt-16">
                <img
                  src={mockProfile.avatar}
                  alt={mockProfile.name}
                  className="w-32 h-32 rounded-full ring-4 ring-white"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/128';
                  }}
                />
              </div>
              <div className="mt-4 sm:mt-0">
                <h1 className="text-2xl font-bold text-gray-900">{mockProfile.name}</h1>
                <p className="text-sm text-gray-500">{mockProfile.handle}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {mockProfile.location}
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Follow
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Message
              </button>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <p className="text-gray-600">{mockProfile.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {mockProfile.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-b py-4">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">{mockProfile.followers.toLocaleString()}</span>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">{mockProfile.following.toLocaleString()}</span>
              <p className="text-sm text-gray-500">Following</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">4.8</span>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <Globe className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mt-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-1 ${
                activeTab === 'content'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-1 ${
                activeTab === 'upcoming'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming Shows
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`py-4 px-1 ${
                activeTab === 'achievements'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Achievements
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'content' && (
            <div className="space-y-6">
              {mockContent.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow p-6">
                  {item.type === 'joke' ? (
                    <>
                      <p className="text-gray-800 text-lg">{item.content}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex space-x-4">
                          <button className="flex items-center text-gray-400 hover:text-gray-500">
                            <ThumbsUp className="w-5 h-5 mr-1" />
                            {item.likes}
                          </button>
                          <button className="flex items-center text-gray-400 hover:text-gray-500">
                            <MessageCircle className="w-5 h-5 mr-1" />
                            {item.comments}
                          </button>
                          <button className="flex items-center text-gray-400 hover:text-gray-500">
                            <Share2 className="w-5 h-5 mr-1" />
                            {item.shares}
                          </button>
                        </div>
                        <span className="text-gray-500 text-sm">{item.timestamp}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 mr-2" />
                          {item.date} at {item.time}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 mr-2" />
                          {item.venue}
                        </div>
                        <div className="mt-4">
                          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                            Get Tickets - {item.price}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              {mockUpcoming.map(show => (
                <div key={show.id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800">{show.title}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2" />
                      {show.date} at {show.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      {show.venue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProfile.achievements.map((achievement, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <achievement.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;