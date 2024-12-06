import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import OpenMic from './pages/OpenMic';
import Workshops from './pages/Workshops';
import Collaborate from './pages/Collaborate';
import Analytics from './pages/Analytics';
import AITools from './pages/AITools';
import Practice from './pages/Practice';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/open-mic" element={<OpenMic />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/collaborate" element={<Collaborate />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;