import EventBadge from "./EventBadge";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isSameDay, parseISO, format } from "date-fns";
import { showModal } from "../../store/calendarSlice";
export default function DayCell({ day, isCurrentMonth, isToday }) {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.calendar.events);
  const dayEvents = events.filter((event) => isSameDay(parseISO(event.date), day));
  const handleAddEvent = (e) => {
    dispatch(
      showModal({
        modalType: "add",
        event: { date: format(day, "yyyy-MM-dd") },
      })
    );
  };
  return (
    <div
      className={`relative min-h-[120px] p-2 border border-gray-200
        hover:bg-gray-50 transition-colors flex flex-col group`}
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm ">
          {day.getDate()}
        </span>
        <button
          onClick={handleAddEvent}
          className="text-gray-400 hover:text-blue-500
            opacity-0 group-hover:opacity-100 transition
            p-1 rounded hover:bg-gray-200"
          aria-label="Add event"
        >
          <AddIcon fontSize="small" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[80px]">
        {dayEvents.length > 0 ? (
          <div className="space-y-1">
            {dayEvents.map((event) => (
              <EventBadge key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-xs text-gray-400">No events</span>
          </div>
        )}
      </div>

    </div>
  );
}