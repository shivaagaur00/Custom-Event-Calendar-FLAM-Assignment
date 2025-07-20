import React from 'react';
import { useSelector } from 'react-redux';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth, 
  isSameDay,
} from 'date-fns';
import DayCell from './DayCell';

export default function DayGrid() {
  const currentDate = useSelector(state => new Date(state.calendar.currentDate));
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="grid grid-cols-7">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div 
          key={day} 
          className="py-3 text-center text-sm font-medium text-gray-500 uppercase bg-gray-50"
        >
          {day}
        </div>
      ))}
      
      {days.map(day => (
        <DayCell 
          key={day.toString()}
          day={day}
          isCurrentMonth={isSameMonth(day, monthStart)}
          isToday={isSameDay(day, new Date())}
        />
      ))}
    </div>
  );
}