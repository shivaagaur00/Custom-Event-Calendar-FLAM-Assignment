import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function MonthHeader({ currentDate, setCurrentDate }) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-50">
      <div className="flex gap-2">
        <button onClick={() => changeMonth(-1)}>
          <ChevronLeft />
        </button>
        <button onClick={() => changeMonth(1)}>
          <ChevronRight />
        </button>
      </div>
      
      <div className="text-lg font-semibold">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </div>
      
      <button 
        onClick={goToToday}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Today
      </button>
    </div>
  );
}