import { useState, useEffect } from 'react';
import { useDatabase } from './useDatabase';
import { jokeQueries } from '../services/dbService';

export const useJokes = () => {
  const [jokes, setJokes] = useState([]);
  const { loading, error, executeQuery } = useDatabase();

  const fetchJokes = async () => {
    try {
      console.log('Fetching jokes...');
      const result = await executeQuery(jokeQueries.getAllJokes);
      console.log('Fetched jokes:', result);
      setJokes(result || []);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  const createJoke = async (jokeData) => {
    try {
      console.log('Creating joke:', jokeData);
      const { comedian_id, content, type, media_url } = jokeData;
      await executeQuery(jokeQueries.createJoke, [comedian_id, content, type, media_url]);
      await fetchJokes(); // Refresh jokes list
    } catch (error) {
      console.error('Error creating joke:', error);
      throw error;
    }
  };

  const updateLikes = async (jokeId) => {
    try {
      console.log('Updating likes for joke:', jokeId);
      await executeQuery(jokeQueries.updateJokeLikes, [jokeId]);
      await fetchJokes(); // Refresh jokes list
    } catch (error) {
      console.error('Error updating likes:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return {
    jokes,
    loading,
    error,
    createJoke,
    updateLikes,
  };
};