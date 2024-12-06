import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, BookmarkPlus } from 'lucide-react';
import { useJokes } from '../hooks/useJokes';

const Home = () => {
  const { jokes, loading, error, createJoke, updateLikes } = useJokes();
  const [newJokeContent, setNewJokeContent] = useState('');

  const handleCreateJoke = async () => {
    if (!newJokeContent.trim()) return;

    try {
      await createJoke({
        comedian_id: 1, // TODO: Replace with actual logged-in user ID
        content: newJokeContent,
        type: 'text',
        media_url: null
      });
      setNewJokeContent('');
    } catch (error) {
      console.error('Error creating joke:', error);
    }
  };

  const handleLike = async (jokeId) => {
    try {
      await updateLikes(jokeId);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Create Post */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <textarea
          className="w-full p-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Share your comedic genius..."
          rows="3"
          value={newJokeContent}
          onChange={(e) => setNewJokeContent(e.target.value)}
        />
        <div className="mt-3 flex justify-between items-center">
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">📷 Photo</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">🎥 Video</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">🎤 Audio</button>
          </div>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={handleCreateJoke}
          >
            Post
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {jokes.map(joke => (
          <div key={joke.id} className="bg-white rounded-lg shadow p-4">
            {/* Author Info */}
            <div className="flex items-center mb-4">
              <img
                src={joke.avatar_url}
                alt={joke.name}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/40';
                }}
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <span className="font-semibold">{joke.name || joke.username}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(joke.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-800 mb-4">{joke.content}</p>

            {/* Media Content */}
            {joke.media_url && joke.type !== 'text' && (
              <div className="mb-4">
                {joke.type === 'image' && (
                  <img 
                    src={joke.media_url} 
                    alt="Joke content"
                    className="rounded-lg w-full"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300';
                    }}
                  />
                )}
                {joke.type === 'video' && (
                  <video
                    src={joke.media_url}
                    controls
                    className="rounded-lg w-full"
                  />
                )}
                {joke.type === 'audio' && (
                  <audio
                    src={joke.media_url}
                    controls
                    className="w-full"
                  />
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t">
              <button 
                className="flex items-center text-gray-600 hover:text-indigo-600"
                onClick={() => handleLike(joke.id)}
              >
                <ThumbsUp className="w-5 h-5 mr-1" />
                <span>{joke.likes}</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-indigo-600">
                <MessageCircle className="w-5 h-5 mr-1" />
                <span>{joke.comments_count}</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-indigo-600">
                <Share2 className="w-5 h-5 mr-1" />
                <span>{joke.shares}</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-indigo-600">
                <BookmarkPlus className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Jokes Message */}
      {jokes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No jokes yet. Be the first to share your comedy!
        </div>
      )}
    </div>
  );
};

export default Home;