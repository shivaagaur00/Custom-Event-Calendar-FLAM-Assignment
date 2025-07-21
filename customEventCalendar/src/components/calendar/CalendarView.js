import React, { useState, useEffect } from 'react';
import MonthHeader from './MonthHeader';
import DayGrid from './DayGrid';
import EventFormModal from './../modals/EventFormModal';
import { format } from 'date-fns';

// Helper function to safely parse localStorage data
const getStoredEvents = () => {
  try {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  } catch (error) {
    console.error('Failed to parse events from localStorage', error);
    return [];
  }
};

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [events, setEvents] = useState([]);
  const [draggedEvent, setDraggedEvent] = useState(null);

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = getStoredEvents();
    if (storedEvents.length > 0) {
      setEvents(storedEvents);
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    const saveEvents = () => {
      try {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        console.log('Events saved to localStorage:', events); // Debug log
      } catch (error) {
        console.error('Failed to save events to localStorage', error);
      }
    };

    if (events.length > 0 || localStorage.getItem('calendarEvents') !== null) {
      saveEvents();
    }
  }, [events]);

  const handleAddEvent = (date) => {
    setModalData({
      type: 'add',
      event: {
        id: Date.now().toString(),
        title: '',
        date: format(date, 'yyyy-MM-dd'),
        time: '12:00',
        description: '',
        color: 'blue',
        recurrence: 'none',
        recurrenceEnd: ''
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

  const handleDragStart = (event) => {
    setDraggedEvent(event);
  };

  const handleDrop = (day) => {
    if (!draggedEvent) return;
    const newDate = format(day, 'yyyy-MM-dd');
    const updatedEvents = events.map((e) =>
      e.id === draggedEvent.id ? { ...e, date: newDate } : e
    );
    setEvents(updatedEvents);
    setDraggedEvent(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <MonthHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
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
            setEvents={setEvents}
          />
        )}
      </div>
    </div>
  );
}