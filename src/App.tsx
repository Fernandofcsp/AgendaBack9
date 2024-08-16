import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { gapi } from 'gapi-script';

interface EventData {
    summary: string;
    start: { dateTime: string };
    end: { dateTime: string };
}

const App: React.FC = () => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID!;
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY!;
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

    const [events, setEvents] = useState<EventData[]>([]);
    // const [selectedView, setSelectedView] = useState('day');
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    // const [endDate, setEndDate] = useState<Date | null>(new Date());

    useEffect(() => {
      function start() {
          (window as any).gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              scope: SCOPES,
              discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
          }).then(() => {
              (window as any).gapi.auth2.getAuthInstance().signIn().then(() => {
                  loadEvents();
              });
          });
      }
  
      function loadEvents() {
          (window as any).gapi.client.calendar.events.list({
              calendarId: 'primary',
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: 'startTime',
          }).then((response: { result: { items: EventData[] } }) => {
              setEvents(response.result.items);
          });
      }
  
      gapi.load('client:auth2', start);
  }, []);
  
  

    const renderEvents = () => {
        const grid = Array.from({ length: 24 }, () => Array(3).fill(null));

        events.forEach((event: EventData) => {
            const startHour = new Date(event.start.dateTime).getHours();
            const endHour = new Date(event.end.dateTime).getHours();

            for (let hourIndex = startHour; hourIndex < endHour; hourIndex++) {
                const columnIndex = grid[hourIndex].findIndex(col => col === null);
                grid[hourIndex][columnIndex] = event.summary;
            }
        });

        return grid.map((hour, hourIndex) => (
            <div key={hourIndex} className="grid grid-cols-3 gap-2">
                {hour.map((event, index) => (
                    <div key={index} className="border p-2">
                        {event || ''}
                    </div>
                ))}
            </div>
        ));
    };

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        // setEndDate(date);
    };

    return (
        <div className="App pt-4">
            <h1 className="mb-4 text-2xl font-bold">React App with Google Calendar API!</h1>
            <DatePicker selected={startDate} onChange={handleDateChange} />
            <div className="flex justify-center mb-4">
                {/* <button onClick={() => setSelectedView('day')} className="px-4 py-2 border">Day</button> */}
                {/* <button onClick={() => setSelectedView('week')} className="px-4 py-2 border">Week</button>
                <button onClick={() => setSelectedView('month')} className="px-4 py-2 border">Month</button> */}
            </div>
            <div className="grid-container">{renderEvents()}</div>
        </div>
    );
};

export default App;
