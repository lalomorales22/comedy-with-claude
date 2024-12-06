import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Pause, Volume2, Users, Clock } from 'lucide-react';
import {
  startAudioSimulation,
  processAudioStream,
  generateAudienceReactions,
  analyzePerformance,
  transcribePerformance
} from '../../services/practice/practiceService';

const VirtualComedyClub = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [venueSettings, setVenueSettings] = useState({
    ambientNoise: 0.3,
    crowdSize: 'medium',
    venueType: 'comedy-club',
    audienceEnergy: 'neutral'
  });
  const [performanceData, setPerformanceData] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [audienceReactions, setAudienceReactions] = useState([]);
  
  const audioContextRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const startRecording = async () => {
    try {
      // Initialize audio context
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      // Get microphone stream
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Start audio simulation
      await startAudioSimulation(venueSettings);
      
      // Set up media recorder
      mediaRecorderRef.current = new MediaRecorder(streamRef.current);
      const chunks = [];
      
      mediaRecorderRef.current.ondataavailable = async (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
          
          // Process audio stream in real-time
          const streamData = await e.data.arrayBuffer();
          const metrics = await processAudioStream(streamData);
          
          // Generate audience reactions based on metrics
          const reactions = await generateAudienceReactions(metrics);
          setAudienceReactions(prev => [...prev, ...reactions]);
        }
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const recordingData = await blob.arrayBuffer();
        
        // Analyze the performance
        const analysis = await analyzePerformance(recordingData);
        setPerformanceData(analysis);
        
        // Get transcript
        const transcriptionResult = await transcribePerformance(recordingData);
        setTranscript(transcriptionResult.text);
        
        // Generate final feedback
        setFeedback({
          strengths: analysis.strengths,
          improvements: analysis.improvements,
          audienceEngagement: analysis.audienceEngagement,
          pacing: analysis.pacing,
          timing: analysis.timing
        });
      };
      
      mediaRecorderRef.current.start(1000); // Capture data every second
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      cleanup();
      setIsRecording(false);
      setCurrentTime(0);
    }
  };

  const togglePause = () => {
    if (isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setCurrentTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        clearInterval(timerRef.current);
      }
      setIsPaused(!isPaused);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderMetricBar = (value, max = 100) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Mic className="w-6 h-6 mr-2" />
        Virtual Comedy Club
      </h2>
      
      {/* Venue Settings */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Venue Type
          </label>
          <select
            value={venueSettings.venueType}
            onChange={(e) => setVenueSettings(prev => ({ ...prev, venueType: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
            disabled={isRecording}
          >
            <option value="comedy-club">Comedy Club</option>
            <option value="theater">Theater</option>
            <option value="bar">Bar/Pub</option>
            <option value="coffee-shop">Coffee Shop</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Users className="w-4 h-4 mr-1" />
            Crowd Size
          </label>
          <select
            value={venueSettings.crowdSize}
            onChange={(e) => setVenueSettings(prev => ({ ...prev, crowdSize: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
            disabled={isRecording}
          >
            <option value="small">Small (10-30)</option>
            <option value="medium">Medium (30-100)</option>
            <option value="large">Large (100+)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Volume2 className="w-4 h-4 mr-1" />
            Ambient Noise
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={venueSettings.ambientNoise}
            onChange={(e) => setVenueSettings(prev => ({ ...prev, ambientNoise: parseFloat(e.target.value) }))}
            className="w-full"
            disabled={isRecording}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Quiet</span>
            <span>Loud</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Audience Energy
          </label>
          <select
            value={venueSettings.audienceEnergy}
            onChange={(e) => setVenueSettings(prev => ({ ...prev, audienceEnergy: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
            disabled={isRecording}
          >
            <option value="cold">Cold</option>
            <option value="neutral">Neutral</option>
            <option value="warm">Warm</option>
            <option value="hot">Hot</option>
          </select>
        </div>
      </div>

      {/* Recording Controls */}
      <div className="mb-8 flex justify-center space-x-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Mic className="w-5 h-5 mr-2" />
            Start Recording
          </button>
        ) : (
          <>
            <button
              onClick={togglePause}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isPaused ? (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              )}
            </button>
            <button
              onClick={stopRecording}
              className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              <Square className="w-5 h-5 mr-2" />
              Stop
            </button>
          </>
        )}
      </div>

      {/* Timer */}
      <div className="text-center mb-8 flex items-center justify-center">
        <Clock className="w-5 h-5 mr-2 text-gray-600" />
        <span className="text-3xl font-mono text-gray-700">{formatTime(currentTime)}</span>
      </div>

      {/* Live Audience Reactions */}
      {isRecording && (
        <div className="mb-8 overflow-hidden bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Live Audience Reactions</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {audienceReactions.map((reaction, index) => (
              <div
                key={index}
                className="text-sm py-1 px-2 bg-white rounded shadow-sm flex items-center"
              >
                <span className="text-lg mr-2">{reaction.emoji}</span>
                <span>{reaction.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Analysis */}
      {performanceData && (
        <div className="space-y-6 mt-8">
          <h3 className="text-xl font-semibold mb-4">Performance Analysis</h3>
          
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Timing & Pacing</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Pacing</span>
                    <span className="text-sm font-medium">{performanceData.pacing.score}%</span>
                  </div>
                  {renderMetricBar(performanceData.pacing.score)}
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Energy</span>
                    <span className="text-sm font-medium">{performanceData.energy.score}%</span>
                  </div>
                  {renderMetricBar(performanceData.energy.score)}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Audience Engagement</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Laughter</span>
                    <span className="text-sm font-medium">{performanceData.audienceEngagement.laughter}%</span>
                  </div>
                  {renderMetricBar(performanceData.audienceEngagement.laughter)}
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Attention</span>
                    <span className="text-sm font-medium">{performanceData.audienceEngagement.attention}%</span>
                  </div>
                  {renderMetricBar(performanceData.audienceEngagement.attention)}
                </div>
              </div>
            </div>
          </div>

          {/* Transcript */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">Performance Transcript</h4>
            <div className="bg-white p-4 rounded border max-h-60 overflow-y-auto">
              <p className="whitespace-pre-wrap text-gray-700">{transcript}</p>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Strengths</h4>
                <ul className="list-disc list-inside space-y-2">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="text-gray-700">{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Areas for Improvement</h4>
                <ul className="list-disc list-inside space-y-2">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="text-gray-700">{improvement}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VirtualComedyClub;