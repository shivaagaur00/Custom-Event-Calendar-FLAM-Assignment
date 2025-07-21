import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExpandMore } from '@mui/icons-material';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const years = [2023, 2024, 2025, 2026, 2027];

export default function MonthHeader({ currentDate, setCurrentDate }) {
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const changeMonth = (monthIndex) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  const changeYear = (year) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-50">
      <div className="flex gap-2">
        <button onClick={() => changeMonth(currentDate.getMonth() - 1)}>
          <ChevronLeft />
        </button>
        <button onClick={() => changeMonth(currentDate.getMonth() + 1)}>
          <ChevronRight />
        </button>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative">
          <button onClick={() => setShowMonthPicker(!showMonthPicker)}>
            {currentDate.toLocaleString('default', { month: 'long' })}
            <ExpandMore fontSize="small" />
          </button>
          {showMonthPicker && (
            <div className="absolute grid grid-cols-3 gap-1 bg-white border p-2 z-10">
              {months.map((month, i) => (
                <button key={month} onClick={() => changeMonth(i)}>
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="relative">
          <button onClick={() => setShowYearPicker(!showYearPicker)}>
            {currentDate.getFullYear()}
            <ExpandMore fontSize="small" />
          </button>
          {showYearPicker && (
            <div className="absolute grid gap-1 bg-white border p-2 z-10">
              {years.map(year => (
                <button key={year} onClick={() => changeYear(year)}>
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <button onClick={goToToday}>Today</button>
    </div>
  );
}