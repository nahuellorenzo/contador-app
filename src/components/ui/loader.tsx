import React from 'react';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader h-40 w-40 border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin aspect-square flex justify-center items-center text-yellow-700" />
    </div>
  );
}

export const LoaderHistorial = () => {
  return (
    <div className="w-10 h-10 border-4 border-t-gray-500 border-gray-300 rounded-full animate-spin" />
  );
}

