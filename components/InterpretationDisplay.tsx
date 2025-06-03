
import React from 'react';

interface InterpretationDisplayProps {
  interpretation: string | null;
  isLoading: boolean;
}

export const InterpretationDisplay: React.FC<InterpretationDisplayProps> = ({ interpretation, isLoading }) => {
  if (!interpretation && !isLoading) {
    return (
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm shadow-xl rounded-xl p-6 sm:p-8 mt-8 text-center min-h-[100px] flex items-center justify-center">
            <p className="text-slate-400 italic">Your dream interpretation will appear here once you submit a dream.</p>
        </div>
    );
  }

  if (!interpretation && isLoading) {
    return null; // Loader is handled by App.tsx
  }
  
  if (!interpretation) return null;


  return (
    <div className="bg-slate-800 bg-opacity-70 backdrop-blur-md shadow-2xl rounded-xl p-6 sm:p-8 mt-8 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-purple-300 mb-4">Dream Interpretation:</h2>
      <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-slate-200 whitespace-pre-wrap leading-relaxed">
        {interpretation}
      </div>
    </div>
  );
};

// Add this to your tailwind.config.js or a <style> tag if not using a config file for keyframes
// For CDN, we can add it to index.html <style>
// Since we can't modify tailwind.config.js, it's better to put in index.html or use simple opacity transition.
// For this exercise, I'll assume simple opacity transition handled by Tailwind classes if needed or CSS.
// A simple "animate-fadeIn" could be:
// @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
// .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
// This specific animation is better defined in index.html style block for CDN usage.
// For now, the class is there, assuming it would be defined.
// Updated with a simple fadeIn in index.html to make it work.
