import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import CalendarGrid from './calendarGrid';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchEvents();
    }
  }, [isAuthenticated, accessToken]);

  const fetchEvents = async () => {
    if (!accessToken) return;
    try {
      const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setEvents(response.data.items);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleLoginSuccess = (response: any) => {
    setAccessToken(response.credential);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setAccessToken(null);
    setIsAuthenticated(false);
    // Manually revoke the token if necessary
    if (accessToken) {
      fetch(`https://accounts.google.com/o/oauth2/revoke?token=${accessToken}`);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.error('Login failed')}
        />
      ) : (
        <div>
          <button onClick={handleLogout}>
            Logout
          </button>
          <CalendarGrid events={events} />
        </div>
      )}
    </div>
  );
};

export default function AppWrapper() {
  return (
    <GoogleOAuthProvider clientId="805933778908-b9ds0nhv2ce7navd3drsu5c8mljbjeop.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  );
}
