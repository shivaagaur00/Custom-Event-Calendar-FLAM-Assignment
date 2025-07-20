import React from 'react';
import { useSelector } from 'react-redux';
import MonthHeader from './MonthHeader';
import DayGrid from './DayGrid';
import EventFormModal from '../modals/EventFormModal';

export default function CalendarView() {
  const { showModal } = useSelector(state => state.calendar);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 border-b border-gray-200">
          <MonthHeader />
        </div>
        
        <DayGrid />
        
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <EventFormModal />
          </div>
        )}
      </div>
      
      <div className="text-center mt-4 text-xs text-gray-400">
        Click on a date to add an event
      </div>
    </div>
  );
}