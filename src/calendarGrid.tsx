// src/CalendarGrid.tsx
import React from 'react';

interface CalendarGridProps {
  events: any[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ events }) => {
  // Organiza eventos por hora
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Filtra eventos por hora
  const getEventsByHour = (hour: number) => {
    return events.filter(event => {
      const eventStartHour = new Date(event.start.dateTime).getHours();
      return eventStartHour === hour;
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div className="col-span-1 bg-gray-200 p-2 font-bold text-center">
        Hora
      </div>
      {hours.map(hour => (
        <div key={hour} className="flex flex-col border border-gray-300 rounded-md">
          <div className="bg-gray-100 p-2 font-semibold">{hour}:00</div>
          <div className="flex flex-col p-2">
            {getEventsByHour(hour).map(event => (
              <div key={event.id} className="bg-blue-100 p-2 mb-2 rounded shadow-sm">
                {event.summary}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
