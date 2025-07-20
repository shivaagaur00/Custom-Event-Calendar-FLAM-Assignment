import React from 'react';
export default function IconButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full hover:bg-gray-200 ${className}`}
    >
      {children}
    </button>
  );
}