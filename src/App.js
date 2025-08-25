// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/landing';
import SignUp from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import { supabase } from './utils/supabaseClient';
import './App.css';
import PosterMaker from './pages/PosterMaker';
import WatchRoom from './pages/WatchRoom';


function ProtectedRoute({ user, loading, children }) {
  const location = useLocation();

  if (loading) {
    // Prevent early redirect
    return null;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🆕 loading state

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false); // ✅ Session checked
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Home />
            </ProtectedRoute>
          }
        />
          <Route path="/poster-maker" element={<PosterMaker />} />
          <Route path="/room/:roomId" element={<WatchRoom />} />

      </Routes>
    

    </BrowserRouter>
  );
}

export default App;
