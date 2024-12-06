// AI Service for comedy assistant tools
const API_ENDPOINT = process.env.REACT_APP_AI_ENDPOINT || 'http://localhost:3001/ai';

export const generateJokeStructure = async (topic) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/generate-structure`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error generating joke structure:', error);
    throw error;
  }
};

export const enhancePunchline = async (setup, currentPunchline) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/enhance-punchline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ setup, currentPunchline }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error enhancing punchline:', error);
    throw error;
  }
};

export const analyzeComedyStyle = async (routine) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/analyze-style`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ routine }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error analyzing comedy style:', error);
    throw error;
  }
};

export const simulateCrowdWork = async (demographic, setting) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/simulate-crowd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ demographic, setting }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error simulating crowd work:', error);
    throw error;
  }
};

export const organizeSetList = async (jokes) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/organize-setlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jokes }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error organizing set list:', error);
    throw error;
  }
};