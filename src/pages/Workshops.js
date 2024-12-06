import React, { useState } from 'react';
import { Calendar, Clock, Users, Star, Video } from 'lucide-react';

const Workshops = () => {
  const [selectedFilter, setSelectedFilter] = useState('upcoming');

  const workshops = [
    {
      id: 1,
      title: "Mastering Stand-Up Comedy",
      instructor: "Dave Chappelle",
      date: "2024-12-15",
      time: "7:00 PM EST",
      duration: "90 min",
      capacity: "20/25",
      rating: 4.8,
      reviews: 156,
      image: "/workshops/standup.jpg",
      price: 49.99,
      level: "Intermediate"
    },
    {
      id: 2,
      title: "Comedy Writing Workshop",
      instructor: "Tina Fey",
      date: "2024-12-18",
      time: "6:00 PM EST",
      duration: "120 min",
      capacity: "15/30",
      rating: 4.9,
      reviews: 223,
      image: "/workshops/writing.jpg",
      price: 59.99,
      level: "All Levels"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Comedy Workshops</h1>
            <p className="text-gray-600 mt-1">Learn from the best in the business</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedFilter('upcoming')}
              className={`px-4 py-2 rounded-lg ${
                selectedFilter === 'upcoming'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setSelectedFilter('past')}
              className={`px-4 py-2 rounded-lg ${
                selectedFilter === 'past'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Past Recordings
            </button>
          </div>
        </div>
      </div>

      {/* Workshops Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {workshops.map(workshop => (
          <div key={workshop.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Workshop Image */}
            <div className="relative h-48 bg-gray-200">
              <img
                src={workshop.image}
                alt={workshop.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200';
                }}
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
                {workshop.level}
              </div>
            </div>

            {/* Workshop Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{workshop.title}</h3>
                  <p className="text-gray-600">with {workshop.instructor}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="ml-1 text-gray-600">{workshop.rating}</span>
                  <span className="text-gray-400 ml-1">({workshop.reviews})</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{workshop.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{workshop.time} • {workshop.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{workshop.capacity} spots filled</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">${workshop.price}</span>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  Join Workshop
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workshops;