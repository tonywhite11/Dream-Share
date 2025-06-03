
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-700 bg-opacity-40 text-red-200 border border-red-600 p-4 rounded-lg shadow-lg my-6" role="alert">
      <p className="font-semibold">Error:</p>
      <p>{message}</p>
    </div>
  );
};
