import React from 'react';
import DayCell from './DayCell';
import { 
  startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth,
  format
} from 'date-fns';

export default function DayGrid({ 
  currentDate, 
  events, 
  onAddEvent, 
  onEditEvent, 
  onDragStart, 
  onDrop,
  draggedEvent
}) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-7">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="py-2 text-center font-medium text-gray-500">
          {day}
        </div>
      ))}
      
      {days.map(day => (
        <div 
          key={day.toString()}
          onDragOver={handleDragOver}
          onDrop={() => onDrop(day)}
          className={`min-h-[120px] border ${draggedEvent ? 'bg-gray-50' : ''}`}
        >
          <DayCell 
            day={day}
            isCurrentMonth={isSameMonth(day, currentDate)}
            events={events.filter(event => event.date === format(day, 'yyyy-MM-dd'))}
            onAddEvent={onAddEvent}
            onEditEvent={onEditEvent}
            onDragStart={onDragStart}
          />
        </div>
      ))}
    </div>
  );
}
