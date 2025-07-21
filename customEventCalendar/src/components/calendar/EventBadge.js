import React from 'react';

const colorClasses = {
  red: 'bg-red-100 text-red-800 border-red-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  green: 'bg-green-100 text-green-800 border-green-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

export default function EventBadge({ event, onClick, onDragStart }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', event.id);
    onDragStart(e);
  };

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      className={`text-xs p-1 rounded truncate cursor-pointer ${colorClasses[event.color] || colorClasses.blue} border hover:shadow-sm`}
    >
      {event.title}
    </div>
  );
}