import React from 'react';
import EventBadge from './EventBadge';
import AddIcon from '@mui/icons-material/Add';

export default function DayCell({ day, currentDate, events, onAddEvent, onEditEvent }) {
  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
  const isToday = day.toDateString() === new Date().toDateString();

  return (
    <div className={`min-h-[100px] p-1 border ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="flex justify-between">
        <span className={`text-sm ${isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
          {day.getDate()}
        </span>
        <button onClick={() => onAddEvent(day)} className="text-gray-400 hover:text-blue-500">
          <AddIcon fontSize="small" />
        </button>
      </div>
      
      <div className="mt-1 space-y-1">
        {events.map(event => (
          <EventBadge key={event.id} event={event} onClick={() => onEditEvent(event)} />
        ))}
      </div>
    </div>
  );
}