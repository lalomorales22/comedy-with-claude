// Audio simulation and performance analysis services

export const startAudioSimulation = async (settings) => {
  try {
    const response = await fetch('/api/practice/audio-simulation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    return await response.json();
  } catch (error) {
    console.error('Error starting audio simulation:', error);
    throw error;
  }
};

export const processAudioStream = async (audioData) => {
  try {
    const response = await fetch('/api/practice/process-audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audioData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error processing audio stream:', error);
    throw error;
  }
};

export const generateAudienceReactions = async (performanceMetrics) => {
  try {
    const response = await fetch('/api/practice/audience-reactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(performanceMetrics),
    });
    return await response.json();
  } catch (error) {
    console.error('Error generating audience reactions:', error);
    throw error;
  }
};

export const analyzePerformance = async (recordingData) => {
  try {
    const response = await fetch('/api/practice/analyze-performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recordingData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error analyzing performance:', error);
    throw error;
  }
};

export const transcribePerformance = async (audioData) => {
  try {
    const response = await fetch('/api/practice/transcribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audioData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error transcribing performance:', error);
    throw error;
  }
};