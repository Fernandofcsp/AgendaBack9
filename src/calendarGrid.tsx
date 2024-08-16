import React from 'react';

interface Event {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

interface CalendarGridProps {
  events: Event[];
  refreshEvents: () => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ events, refreshEvents }) => {
  // Función para formatear la fecha y hora a un formato legible
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Renderiza la cuadrícula de eventos
  return (
    <div className="calendar-grid">
      <h2>Eventos</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resumen</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inicio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fin</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map(event => (
            <tr key={event.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.summary}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(event.start.dateTime)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(event.end.dateTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Botón para refrescar eventos */}
      <button onClick={refreshEvents} className="mt-4 p-2 bg-green-500 text-white rounded">Refrescar</button>
    </div>
  );
};

export default CalendarGrid;
