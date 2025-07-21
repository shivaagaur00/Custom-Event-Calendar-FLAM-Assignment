import React from 'react';
import DayCell from './DayCell';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export default function DayGrid({ currentDate, events, onAddEvent, onEditEvent }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="grid grid-cols-7">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="py-2 text-center font-medium text-gray-500">
          {day}
        </div>
      ))}
      
      {days.map(day => (
        <DayCell 
          key={day.toString()}
          day={day}
          currentDate={currentDate}
          events={events.filter(e => new Date(e.date).toDateString() === day.toDateString())}
          onAddEvent={onAddEvent}
          onEditEvent={onEditEvent}
        />
      ))}
    </div>
  );
}