import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/calendarSlice';
const colorClasses = {
  red: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
  green: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
};

export default function EventBadge({ event }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(showModal({ 
      modalType: 'edit',
      event 
    }));
  };

  return (
    <div
      onClick={handleClick}
      className={`text-xs p-1 px-2 rounded border truncate cursor-pointer mb-1 shadow-sm transition-colors
        ${colorClasses[event.color] || colorClasses.blue}
      `}
      title={`${event.title}${event.description ? `\n\n${event.description}` : ''}`}
    >
      {event.title}
    </div>
  );
}