import React, { useState, useEffect } from 'react';
import MonthHeader from './MonthHeader';
import DayGrid from './DayGrid';
import EventFormModal from './../modals/EventFormModal';
import { format, parseISO, isSameDay } from 'date-fns';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [events, setEvents] = useState([]);
  const [draggedEvent, setDraggedEvent] = useState(null);

  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
  };

  const handleAddEvent = (date) => {
    setModalData({
      type: 'add',
      event: { 
        date: format(date, 'yyyy-MM-dd'),
        time: '12:00'
      }
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

  // Drag and drop functions
  const handleDragStart = (event) => {
    setDraggedEvent(event);
  };

  const handleDrop = (day) => {
    if (!draggedEvent) return;
    
    const newDate = format(day, 'yyyy-MM-dd');
    const updatedEvents = events.map(e => 
      e.id === draggedEvent.id ? { ...e, date: newDate } : e
    );
    
    saveEvents(updatedEvents);
    setDraggedEvent(null);
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
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          draggedEvent={draggedEvent}
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