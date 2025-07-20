import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, addMonths, subMonths, setMonth, setYear } from 'date-fns';
import { ChevronLeft, ChevronRight, ExpandMore } from '@mui/icons-material';
import IconButton from '../ui/IconButton';
import { changeMonth } from '../../store/calendarSlice';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const years = [2025, 2026, 2027, 2028, 2029, 2030];

export default function MonthHeader() {
  const dispatch = useDispatch();
  const currentDate = useSelector(state => new Date(state.calendar.currentDate));
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const handleMonthChange = (monthIndex) => {
    dispatch(changeMonth(setMonth(currentDate, monthIndex)));
    setShowMonthPicker(false);
  };

  const handleYearChange = (year) => {
    dispatch(changeMonth(setYear(currentDate, year)));
    setShowYearPicker(false);
  };

  const closePickers = () => {
    setShowMonthPicker(false);
    setShowYearPicker(false);
  };

  return (
    <div className="flex justify-between items-center p-4 relative">
      <div className="flex gap-2">
        <IconButton onClick={() => dispatch(changeMonth(subMonths(currentDate, 1)))}>
          <ChevronLeft />
        </IconButton>
        <IconButton onClick={() => dispatch(changeMonth(addMonths(currentDate, 1)))}>
          <ChevronRight />
        </IconButton>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative">
          <button
            onClick={() => {
              setShowMonthPicker(!showMonthPicker);
              setShowYearPicker(false);
            }}
            className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 rounded"
          >
            <span>{format(currentDate, 'MMMM')}</span>
            <ExpandMore fontSize="small" />
          </button>
          
          {showMonthPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg border rounded p-2 grid grid-cols-3 gap-1 z-10">
              {months.map((month, i) => (
                <button
                  key={month}
                  onClick={() => handleMonthChange(i)}
                  className={`p-1 text-sm rounded hover:bg-blue-50 ${
                    i === currentDate.getMonth() ? 'bg-blue-100 text-blue-600' : ''
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowYearPicker(!showYearPicker);
              setShowMonthPicker(false);
            }}
            className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 rounded"
          >
            <span>{format(currentDate, 'yyyy')}</span>
            <ExpandMore fontSize="small" />
          </button>
          
          {showYearPicker && (
            <div className="absolute top-full right-0 mt-1 bg-white shadow-lg border rounded p-2 grid gap-1 z-10">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year)}
                  className={`p-2 text-sm rounded hover:bg-blue-50 ${
                    year === currentDate.getFullYear() ? 'bg-blue-100 text-blue-600' : ''
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => dispatch(changeMonth(new Date()))}
        className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded"
      >
        Today
      </button>

      {(showMonthPicker || showYearPicker) && (
        <div className="fixed inset-0 z-0" onClick={closePickers} />
      )}
    </div>
  );
}