import React from 'react';

const colorClasses = {
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  purple: 'bg-purple-100 text-purple-800'
};

export default function EventBadge({ event, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`text-xs p-1 rounded truncate cursor-pointer ${colorClasses[event.color] || colorClasses.blue}`}
    >
      {event.title}
    </div>
  );
}