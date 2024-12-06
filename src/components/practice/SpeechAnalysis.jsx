import React, { useState, useRef } from 'react';
import { Mic, Square, BarChart2, Clock, Volume2, AlertCircle, Smile } from 'lucide-react';

const SpeechAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(streamRef.current);
      
      const audioChunks = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        analyzeSpeech(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach(track => track.stop());
      clearInterval(timerRef.current);
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

  const analyzeSpeech = async (audioBlob) => {
    // Mock analysis data - replace with actual API call
    const mockAnalysis = {
      transcript: "So there I was, standing in line at the grocery store...",
      metrics: {
        pace: {
          wpm: 150,
          rating: "Good",
          consistency: 85
        },
        fillerWords: {
          count: 12,
          words: ["um", "like", "you know"],
          frequency: {
            "um": 5,
            "like": 4,
            "you know": 3
          }
        },
        tonality: {
          variety: 78,
          energy: 82,
          clarity: 90
        },
        timing: {
          pauses: 8,
          averagePauseDuration: 1.2,
          punchlineTiming: 85
        },
        clarity: {
          pronunciation: 92,
          articulation: 88,
          volume: 85
        }
      }
    };

    setAnalysis(mockAnalysis);
    setTranscript(mockAnalysis.transcript);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderMetricBar = (value, label) => (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Speech Analysis</h2>
        <p className="text-gray-600">Analyze your delivery, timing, and word choice</p>
      </div>

      {/* Recording Controls */}
      <div className="mb-8 flex justify-center space-x-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Mic className="w-5 h-5 mr-2" />
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Square className="w-5 h-5 mr-2" />
            Stop Recording
          </button>
        )}
      </div>

      {/* Timer */}
      {isRecording && (
        <div className="text-center mb-8">
          <div className="text-3xl font-mono">
            <Clock className="inline-block w-6 h-6 mr-2" />
            {formatTime(recordingTime)}
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Transcript */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium mb-4">Transcript</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{transcript}</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pace & Timing */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Pace & Timing
              </h3>
              <div className="space-y-4">
                {renderMetricBar(analysis.metrics.pace.consistency, 'Pace Consistency')}
                {renderMetricBar(analysis.metrics.timing.punchlineTiming, 'Punchline Timing')}
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Words per minute:</span>
                    <span className="font-medium">{analysis.metrics.pace.wpm}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Pauses:</span>
                    <span className="font-medium">{analysis.metrics.timing.pauses}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vocal Quality */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium mb-4 flex items-center">
                <Volume2 className="w-5 h-5 mr-2" />
                Vocal Quality
              </h3>
              <div className="space-y-4">
                {renderMetricBar(analysis.metrics.clarity.pronunciation, 'Pronunciation')}
                {renderMetricBar(analysis.metrics.clarity.articulation, 'Articulation')}
                {renderMetricBar(analysis.metrics.clarity.volume, 'Volume')}
              </div>
            </div>

            {/* Expression */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium mb-4 flex items-center">
                <Smile className="w-5 h-5 mr-2" />
                Expression
              </h3>
              <div className="space-y-4">
                {renderMetricBar(analysis.metrics.tonality.variety, 'Tonal Variety')}
                {renderMetricBar(analysis.metrics.tonality.energy, 'Energy')}
                {renderMetricBar(analysis.metrics.tonality.clarity, 'Emotional Clarity')}
              </div>
            </div>
          </div>

          {/* Filler Words */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Filler Words
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Summary</h4>
                <p className="text-gray-600">
                  Total filler words: {analysis.metrics.fillerWords.count}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Most Common</h4>
                <div className="space-y-2">
                  {Object.entries(analysis.metrics.fillerWords.frequency).map(([word, count]) => (
                    <div key={word} className="flex justify-between text-sm">
                      <span className="text-gray-600">"{word}"</span>
                      <span className="font-medium">{count} times</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium mb-4">Recommendations</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">
                  Try to reduce the use of filler words, particularly "um" and "like"
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">
                  Your pacing is good, but try to vary your speed more for dramatic effect
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">
                  Consider adding slightly longer pauses before punchlines
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechAnalysis;