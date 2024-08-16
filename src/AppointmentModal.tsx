import React, { useState } from 'react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  accessToken: string | null;
  refreshEvents: () => Promise<void>;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, accessToken, refreshEvents }) => {
  const [appointment, setAppointment] = useState({
    startDateTime: '',
    endDateTime: '',
    nombre_cliente: '',
    telefono: '',
    handicap: '',
    baston: '',
    comentarios: '',
    ticket_rem: '',
    simulador: '',
    fitter: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointment(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          summary: appointment.nombre_cliente,
          start: {
            dateTime: appointment.startDateTime,
            timeZone: 'America/Los_Angeles'
          },
          end: {
            dateTime: appointment.endDateTime,
            timeZone: 'America/Los_Angeles'
          },
          description: appointment.comentarios,
          location: appointment.simulador,
          attendees: [
            { email: appointment.telefono }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Error saving appointment: ${response.statusText}`);
      }

      await refreshEvents();
      onClose();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Start Date and Time:</label>
            <input
              type="datetime-local"
              name="startDateTime"
              value={appointment.startDateTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>End Date and Time:</label>
            <input
              type="datetime-local"
              name="endDateTime"
              value={appointment.endDateTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Nombre Cliente:</label>
            <input
              type="text"
              name="nombre_cliente"
              value={appointment.nombre_cliente}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={appointment.telefono}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Handicap:</label>
            <input
              type="text"
              name="handicap"
              value={appointment.handicap}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Bastón:</label>
            <input
              type="text"
              name="baston"
              value={appointment.baston}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Comentarios:</label>
            <input
              type="text"
              name="comentarios"
              value={appointment.comentarios}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Ticket Rem:</label>
            <input
              type="text"
              name="ticket_rem"
              value={appointment.ticket_rem}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Simulador:</label>
            <input
              type="text"
              name="simulador"
              value={appointment.simulador}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Fitter:</label>
            <input
              type="text"
              name="fitter"
              value={appointment.fitter}
              onChange={handleChange}
            />
          </div>
        </div>
        <button onClick={handleSave} className="mt-4 p-2 bg-blue-500 text-white rounded">Save Appointment</button>
      </div>
    </div>
  );
};

export default AppointmentModal;
