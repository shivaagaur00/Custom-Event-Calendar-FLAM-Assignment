import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EventFormModal({ modalData, onClose, events, saveEvents }) {
  const isEdit = modalData.type === 'edit';
  const [formData, setFormData] = useState({
    id: modalData.event?.id || Date.now().toString(),
    title: modalData.event?.title || '',
    date: modalData.event?.date || '',
    description: modalData.event?.description || '',
    color: modalData.event?.color || 'blue'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let updatedEvents;
    if (isEdit) {
      updatedEvents = events.map(e => e.id === formData.id ? formData : e);
    } else {
      updatedEvents = [...events, formData];
    }
    
    saveEvents(updatedEvents);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(e => e.id !== formData.id);
      saveEvents(updatedEvents);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b flex justify-between">
          <h3>{isEdit ? 'Edit Event' : 'Add Event'}</h3>
          <button onClick={onClose}><CloseIcon /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div>
            <label>Color</label>
            <select
              value={formData.color}
              onChange={(e) => setFormData({...formData, color: e.target.value})}
            >
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
            </select>
          </div>
          
          <div className="flex justify-between">
            {isEdit && (
              <button type="button" onClick={handleDelete} className="text-red-500">
                <DeleteIcon /> Delete
              </button>
            )}
            
            <div className="space-x-2">
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">{isEdit ? 'Save' : 'Add'}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}