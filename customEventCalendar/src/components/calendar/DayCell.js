import React from 'react';
import EventBadge from './EventBadge';
import AddIcon from '@mui/icons-material/Add';
import { isSameDay } from 'date-fns';

export default function DayCell({ 
  day, 
  isCurrentMonth, 
  events, 
  onAddEvent, 
  onEditEvent, 
  onDragStart 
}) {
  const isToday = isSameDay(day, new Date());

  return (
    <div className={`h-full p-1 flex flex-col ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="flex justify-between">
        <span className={`text-sm ${isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
          {day.getDate()}
        </span>
        <button 
          onClick={() => onAddEvent(day)} 
          className="text-gray-400 hover:text-blue-500"
        >
          <AddIcon fontSize="small" />
        </button>
      </div>
      
      <div className="mt-1 space-y-1 flex-1 overflow-y-auto">
        {events.map(event => (
          <EventBadge 
            key={event.id} 
            event={event} 
            onClick={() => onEditEvent(event)}
            onDragStart={(e) => onDragStart(event)}
          />
        ))}
      </div>
    </div>
  );
}