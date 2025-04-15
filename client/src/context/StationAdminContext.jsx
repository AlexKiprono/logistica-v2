import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';

// Create the context
export const StationAdminContext = createContext();

// Now export your provider and context
export const StationAdminProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stationId, setStationId] = useState(null); // Added state for stationId
  const server_url = "http://127.0.0.1:5000";

  const fetchStationSchedules = async () => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      toast.info('Please log in to continue...');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${server_url}/station/routes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSchedules(data || []);
        if (data.station_id) {
          setStationId(data.station_id);
        }
        // console.log("Schedules Fetched:", data);
      } else {
        throw new Error('Failed to fetch schedules');
      }
    } catch (error) {
      setError(error.message);
      toast.error(`Error fetching schedules: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    fetchStationSchedules,
    schedules,
    loading,
    error,
    stationId, // Providing stationId to the context
    setSchedules,
    setError,
  };

  return (
    <StationAdminContext.Provider value={contextData}>
      {children}
    </StationAdminContext.Provider>
  );
};
