import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function LandingPage() {
  const navigate = useNavigate();
  const enableLanding = (import.meta as any).env.VITE_ENABLE_LANDING_PAGE === 'true';

  useEffect(() => {
    if (!enableLanding) {
      navigate({ to: '/app' });
    }
  }, [enableLanding, navigate]);

  if (!enableLanding) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 font-serif">Welcome to Lumière</h1>
        <p className="text-gray-600 mb-8 font-sans">A scholarly sanctuary for the modern mind.</p>
        <button 
          onClick={() => navigate({ to: '/auth' })}
          className="bg-black text-white px-8 py-3 rounded-none font-bold uppercase tracking-widest text-sm"
        >
          Enter Workspace
        </button>
      </div>
    </div>
  );
}