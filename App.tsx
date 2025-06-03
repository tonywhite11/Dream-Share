import React, { useState, useCallback, useEffect } from 'react';
import { DreamInput } from './components/DreamInput';
import { InterpretationDisplay } from './components/InterpretationDisplay';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { interpretDream } from './services/geminiService';

const App: React.FC = () => {
  const [dream, setDream] = useState<string>('');
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInterpretDream = useCallback(async (dreamText: string) => {
    if (!dreamText.trim()) {
      setError("Please enter a dream description.");
      setInterpretation(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setInterpretation(null); // Clear previous interpretation
    setDream(dreamText);

    try {
      const result = await interpretDream(dreamText);
      setInterpretation(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during dream interpretation.");
      }
      console.error("Interpretation error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Speak the interpretation using a woman's voice if available
  useEffect(() => {
    if (interpretation && !isLoading && !error) {
      const synth = window.speechSynthesis;
      let voices = synth.getVoices();

      function speakWithFemaleVoice() {
        // Try to find a female voice (by name or gender)
        const femaleVoice =
          voices.find(
            v =>
              (v.name.toLowerCase().includes('female') ||
                v.name.toLowerCase().includes('woman') ||
                (v as any).gender === 'female' ||
                v.name.toLowerCase().includes('zira') || // Windows default female
                v.name.toLowerCase().includes('susan')) // Another common female
          ) ||
          voices.find(v => v.name.toLowerCase().includes('zira')) || // fallback
          voices.find(v => v.name.toLowerCase().includes('female')) || // fallback
          voices[0]; // fallback to first

        const utterance = new window.SpeechSynthesisUtterance(interpretation as string);
        utterance.voice = femaleVoice;
        utterance.rate = 1;
        utterance.pitch = 1.1;
        utterance.lang = 'en-US';
        synth.cancel();
        synth.speak(utterance);
      }

      if (voices.length === 0) {
        synth.onvoiceschanged = () => {
          voices = synth.getVoices();
          speakWithFemaleVoice();
        };
      } else {
        speakWithFemaleVoice();
      }

      return () => synth.cancel();
    }
  }, [interpretation, isLoading, error]);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden font-[Cormorant_Garamond] bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 selection:bg-purple-500 selection:text-white">
      {/* Starry background overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Example: Add a star SVG or use a canvas for animated stars */}
        <svg width="100%" height="100%">
          <circle cx="10%" cy="20%" r="1.5" fill="white" opacity="0.7" />
          <circle cx="80%" cy="40%" r="1" fill="white" opacity="0.5" />
          <circle cx="50%" cy="70%" r="2" fill="white" opacity="0.8" />
          {/* ...add more stars or use a library for animation... */}
        </svg>
      </div>
      <div className="relative z-10 max-w-3xl w-full space-y-8 mt-12">
        <Header />

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 space-y-6">
          <DreamInput onSubmit={handleInterpretDream} isLoading={isLoading} initialDream={dream} />

          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          <InterpretationDisplay interpretation={interpretation} isLoading={isLoading} />

          {(interpretation || error) && !isLoading && (
            <div className="text-center">
              <button
                onClick={() => {
                  handleInterpretDream('');
                  setInterpretation(null);
                  setError(null);
                }}
                className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 hover:from-purple-600 hover:to-blue-600 text-white font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
              >
                Interpret Another Dream
              </button>
            </div>
          )}
        </div>
      </div>
      <footer className="relative z-10 text-center py-8 mt-auto text-slate-300 text-sm drop-shadow">
        <p>&copy; {new Date().getFullYear()} <span className="font-semibold tracking-wide">AI Dream Interpreter</span>. <span className="italic">Powered by Gemini.</span></p>
      </footer>
    </div>
  );
};

export default App;