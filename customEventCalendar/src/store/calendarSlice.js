import { createSlice } from '@reduxjs/toolkit';
const eventsFromStorage = JSON.parse(localStorage.getItem('calendarEvents'))||[];
const initialState = {
  events: eventsFromStorage,
  currentDate: new Date().toISOString(),
  showModal: false,
  modalType: 'add',
  selectedEvent: null
};
const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeMonth(state, action) {
      state.currentDate = action.payload.toISOString();
    },
    showModal(state, action) {
      state.showModal = true;
      state.modalType = action.payload.modalType;
      state.selectedEvent = action.payload.event || null;
    },
    hideModal(state) {
      state.showModal = false;
      state.selectedEvent = null;
    },
    addEvent(state, action) {
      state.events.push(action.payload);
      localStorage.setItem('calendarEvents', JSON.stringify(state.events));
    },
    updateEvent(state, action) {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
      localStorage.setItem('calendarEvents', JSON.stringify(state.events));
    },
    deleteEvent(state, action) {
      state.events = state.events.filter(event => event.id !== action.payload);
      localStorage.setItem('calendarEvents', JSON.stringify(state.events));
    }
  }
});
export const { 
  changeMonth, 
  showModal, 
  hideModal, 
  addEvent, 
  updateEvent, 
  deleteEvent 
} = calendarSlice.actions;

export default calendarSlice.reducer;