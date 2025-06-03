
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 mb-2">
        AI Dream Interpreter
      </h1>
      <p className="text-lg text-slate-300">
        Unveil the mysteries hidden in your slumber.
      </p>
    </header>
  );
};
