import React, { useState, useEffect } from 'react';
import { format, parseISO, addDays, addWeeks, addMonths } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EventFormModal({ modalData, onClose, events, saveEvents }) {
  const isEdit = modalData.type === 'edit';
  const [formData, setFormData] = useState({
    id: modalData.event?.id || Date.now().toString(),
    title: modalData.event?.title || '',
    date: modalData.event?.date || '',
    time: modalData.event?.time || '12:00',
    description: modalData.event?.description || '',
    color: modalData.event?.color || 'blue',
    recurrence: modalData.event?.recurrence || 'none',
    recurrenceEnd: modalData.event?.recurrenceEnd || ''
  });
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    if (formData.date && formData.time) {
      const conflictingEvents = events.filter(e => 
        e.id !== formData.id && 
        e.date === formData.date && 
        e.time === formData.time
      );
      setConflicts(conflictingEvents);
    }
  }, [formData, events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (conflicts.length > 0 && !window.confirm('There are conflicting events. Do you want to proceed?')) {
      return;
    }
    
    let updatedEvents;
    if (isEdit) {
      updatedEvents = events.map(e => e.id === formData.id ? formData : e);
    } else {
      updatedEvents = [...events, formData];
      
      // Handle recurring events
      if (formData.recurrence !== 'none') {
        const baseDate = parseISO(formData.date);
        let currentDate = baseDate;
        let count = 0;
        const maxRecurrences = 100; // Safety limit
        
        while (count < maxRecurrences) {
          count++;
          
          // Calculate next date based on recurrence
          switch (formData.recurrence) {
            case 'daily':
              currentDate = addDays(currentDate, 1);
              break;
            case 'weekly':
              currentDate = addWeeks(currentDate, 1);
              break;
            case 'monthly':
              currentDate = addMonths(currentDate, 1);
              break;
            default:
              count = maxRecurrences; // Exit loop
          }
          
          // Check if we've passed the recurrence end date
          if (formData.recurrenceEnd && currentDate > new Date(formData.recurrenceEnd)) {
            break;
          }
          
          // Add recurring event
          updatedEvents.push({
            ...formData,
            id: `${formData.id}-${count}`,
            date: format(currentDate, 'yyyy-MM-dd'),
            isRecurring: true
          });
        }
      }
    }
    
    saveEvents(updatedEvents);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(e => e.id !== formData.id && !e.id.startsWith(`${formData.id}-`));
      saveEvents(updatedEvents);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {isEdit ? 'Edit Event' : 'Add Event'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <CloseIcon />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {conflicts.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 text-sm">
              <p className="font-medium">Warning: There are {conflicts.length} conflicting event(s).</p>
              <ul className="list-disc pl-5 mt-1">
                {conflicts.slice(0, 3).map(conflict => (
                  <li key={conflict.id}>{conflict.title}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Title*</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date*</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time*</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="yellow">Yellow</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Recurrence</label>
              <select
                value={formData.recurrence}
                onChange={(e) => setFormData({...formData, recurrence: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          
          {formData.recurrence !== 'none' && (
            <div>
              <label className="block text-sm font-medium mb-1">Recurrence End Date (optional)</label>
              <input
                type="date"
                value={formData.recurrenceEnd}
                onChange={(e) => setFormData({...formData, recurrenceEnd: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
          )}
          
          <div className="flex justify-between pt-4 border-t">
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
              >
                <DeleteIcon className="mr-1" fontSize="small" />
                Delete
              </button>
            )}
            
            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isEdit ? 'Save' : 'Add'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}