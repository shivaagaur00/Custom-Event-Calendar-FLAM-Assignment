import React, { useState } from 'react';
import MonthHeader from './MonthHeader';
import DayGrid from './DayGrid';
import EventFormModal from './../modals/EventFormModal';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };

  const handleAddEvent = (date) => {
    setModalData({
      type: 'add',
      event: { date: format(date, 'yyyy-MM-dd') }
    });
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setModalData({
      type: 'edit',
      event: { ...event }
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <MonthHeader 
          currentDate={currentDate} 
          setCurrentDate={setCurrentDate} 
        />
        
        <DayGrid 
          currentDate={currentDate}
          events={events}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
        />
        
        {showModal && (
          <EventFormModal
            modalData={modalData}
            onClose={handleCloseModal}
            events={events}
            saveEvents={saveEvents}
          />
        )}
      </div>
    </div>
  );
}

function format(date, formatStr) {
  return date.toISOString().split('T')[0]; 
}