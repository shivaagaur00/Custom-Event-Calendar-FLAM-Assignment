import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, addEvent, updateEvent, deleteEvent } from '../../store/calendarSlice';
import { format } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import TimeSelect from '../ui/TimeSelect';

export default function EventFormModal() {
  const dispatch = useDispatch();
  const { showModal, modalType, selectedEvent, currentDate } = useSelector(state => state.calendar);
  const isEdit = modalType === 'edit';
  
  const [formData, setFormData] = useState({
    id: selectedEvent?.id || Date.now().toString(),
    title: selectedEvent?.title || '',
    date: selectedEvent?.date || format(new Date(currentDate), 'yyyy-MM-dd'),
    time: selectedEvent?.time || '12:00',
    description: selectedEvent?.description || '',
    color: selectedEvent?.color || 'blue',
    recurrence: selectedEvent?.recurrence || 'none',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateEvent(formData));
    } else {
      dispatch(addEvent(formData));
    }
    dispatch(hideModal());
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(selectedEvent.id));
      dispatch(hideModal());
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden border">
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {isEdit ? 'Edit Event' : 'Add Event'}
          </h3>
          <button 
            onClick={() => dispatch(hideModal())}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
          >
            <CloseIcon />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Title*</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Meeting with team"
              required
            />
          </div>
          
          {/* Date & Time */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Date*</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full rounded border border-gray-300 p-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Time*</label>
              <TimeSelect
                value={formData.time}
                onChange={(time) => setFormData({...formData, time})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Event details..."
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Color</label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="w-full rounded border border-gray-300 p-2"
              >
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
              </select>
            </div>
          </div>
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
                onClick={() => dispatch(hideModal())}
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