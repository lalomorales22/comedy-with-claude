import React, { useState, useRef, useEffect } from 'react';
import { Camera, Square, Play, BarChart2, Maximize, User, Move } from 'lucide-react';

const GestureAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
  const [gestureData, setGestureData] = useState([]);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Initialize camera
  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640,
          height: 480,
          facingMode: 'user'
        } 
      });
      
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setCameraReady(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Start analysis
  const startAnalysis = () => {
    setIsAnalyzing(true);
    startGestureTracking();
  };

  // Stop analysis
  const stopAnalysis = () => {
    setIsAnalyzing(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Generate final analysis
    generateAnalysis();
  };

  // Cleanup on unmount
  useEffect(() => {
    initializeCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Track gestures and movement
  const startGestureTracking = () => {
    const track = () => {
      if (!isAnalyzing) return;

      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, 640, 480);
      
      // Mock gesture detection - replace with actual pose detection
      const mockGesture = {
        timestamp: Date.now(),
        position: {
          x: Math.random() * 640,
          y: Math.random() * 480
        },
        confidence: Math.random() * 100,
        movement: {
          speed: Math.random() * 10,
          direction: Math.random() * 360
        }
      };

      setGestureData(prev => [...prev, mockGesture]);
      setStagePosition({
        x: mockGesture.position.x,
        y: mockGesture.position.y
      });

      animationFrameRef.current = requestAnimationFrame(track);
    };

    track();
  };

  // Generate final analysis
  const generateAnalysis = () => {
    // Mock analysis data - replace with actual analysis
    const mockAnalysis = {
      stagePresence: {
        coverage: 85,
        confidence: 78,
        energy: 82
      },
      movements: {
        variety: 75,
        fluidity: 88,
        purposefulness: 80
      },
      gestures: {
        effectiveness: 85,
        naturalness: 82,
        timing: 90
      },
      areas: {
        strengths: [
          "Good stage coverage",
          "Natural hand movements",
          "Strong physical timing with punchlines"
        ],
        improvements: [
          "Could use more varied gestures",
          "Consider using stage depth more",
          "Watch for repetitive movements"
        ]
      }
    };

    setAnalysis(mockAnalysis);
  };

  const renderMetricGauge = (value, label) => (
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
        <h2 className="text-2xl font-bold mb-2">Gesture Analysis</h2>
        <p className="text-gray-600">Analyze your stage presence and body language</p>
      </div>

      {/* Camera View */}
      <div className="mb-8">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            className="absolute top-0 left-0 w-full h-full"
          />
          {isAnalyzing && (
            <div 
              className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
              style={{ 
                left: `${(stagePosition.x / 640) * 100}%`,
                top: `${(stagePosition.y / 480) * 100}%`
              }}
            />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mb-8 flex justify-center space-x-4">
        {!isAnalyzing ? (
          <button
            onClick={startAnalysis}
            disabled={!cameraReady}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Analysis
          </button>
        ) : (
          <button
            onClick={stopAnalysis}
            className="flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Square className="w-5 h-5 mr-2" />
            Stop Analysis
          </button>
        )}
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stage Presence */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium mb-4 flex items-center">
                <Maximize className="w-5 h-5 mr-2" />
                Stage Presence
              </h3>
              <div className="space-y-4">
                {renderMetricGauge(analysis.stagePresence.coverage, 'Stage Coverage')}
                {renderMetricGauge(analysis.stagePresence.confidence, 'Confidence')}
                {renderMetricGauge(analysis.stagePresence.energy, 'Energy')}
              </div>
            </div>

            {/* Movement Quality */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium mb-4 flex items-center">
                <Move className="w-5 h-5 mr-2" />
                Movement Quality
              </h3>
              <div className="space-y-4">
                {renderMetricGauge(analysis.movements.variety, 'Variety')}
                {renderMetricGauge(analysis.movements.fluidity, 'Fluidity')}
                {renderMetricGauge(analysis.movements.purposefulness, 'Purpose')}
              </div>
            </div>

            {/* Gesture Impact */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Gesture Impact
              </h3>
              <div className="space-y-4">
                {renderMetricGauge(analysis.gestures.effectiveness, 'Effectiveness')}
                {renderMetricGauge(analysis.gestures.naturalness, 'Naturalness')}
                {renderMetricGauge(analysis.gestures.timing, 'Timing')}
              </div>
            </div>
          </div>

          {/* Strengths and Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium mb-4">Strengths</h3>
              <ul className="space-y-2">
                {analysis.areas.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium mb-4">Areas for Improvement</h3>
              <ul className="space-y-2">
                {analysis.areas.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Movement Heatmap */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium mb-4">Stage Movement Pattern</h3>
            <div className="aspect-video bg-gray-100 rounded-lg relative">
              {/* Add heatmap visualization here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestureAnalysis;