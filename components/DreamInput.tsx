
import React, { useState, useEffect } from 'react';

interface DreamInputProps {
  onSubmit: (dreamText: string) => void;
  isLoading: boolean;
  initialDream?: string;
}

export const DreamInput: React.FC<DreamInputProps> = ({ onSubmit, isLoading, initialDream = '' }) => {
  const [dreamText, setDreamText] = useState<string>(initialDream);

  useEffect(() => {
    // If initialDream is an empty string (e.g. after clearing), update textarea
    if (initialDream === '') {
        setDreamText('');
    }
  }, [initialDream]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamText.trim()) return;
    onSubmit(dreamText);
  };

  return (
    <div className="bg-slate-800 bg-opacity-70 backdrop-blur-md shadow-2xl rounded-xl p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="dream" className="block text-sm font-medium text-purple-300 mb-2">
            Describe your dream:
          </label>
          <textarea
            id="dream"
            name="dream"
            rows={8}
            className="w-full p-4 rounded-lg bg-slate-700 bg-opacity-50 border border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-200 placeholder-slate-400 resize-none shadow-inner transition-colors duration-200"
            placeholder="E.g., I was flying over a city made of clouds, and everyone was speaking in riddles..."
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !dreamText.trim()}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Interpreting...
            </span>
          ) : (
            'Interpret My Dream'
          )}
        </button>
      </form>
    </div>
  );
};
