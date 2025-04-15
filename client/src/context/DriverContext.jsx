import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";

export const DriverContext = createContext();
export const useDriver = () => {
  const context = useContext(DriverContext);
  if (context === undefined) {
    throw new Error('useDriver must be used within a DriverProvider');
  }
  return context;
};

export const DriverProvider = ({ children }) => {
  const [auth_token, setAuth_token] = useState(() => localStorage.getItem("access_token") || null);
  const [schedules, setSchedules] = useState(null);
  const [error, setError] = useState('');
  const server_url = "http://127.0.0.1:5000";

  // Fetch schedules data 
  const fetchSchedules = async () => {
    try {
      const response = await fetch(`${server_url}/driver/schedules`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth_token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setSchedules(data.schedules); 
      } else {
        throw new Error('Failed to fetch schedules');
      }
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleCancel = async (scheduleId) => {
    try {
      const response = await fetch(`${server_url}/driver/cancel_schedule/${scheduleId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth_token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
       
        fetchSchedules(); 
        toast.success('Schedule canceled successfully');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Error canceling schedule');
      }
    } catch (error) {
      toast.error('Error canceling schedule: ' + error.message);
    }
  };
  
  const handleActivate = async (scheduleId) => {
    try {
      const response = await fetch(`${server_url}/driver/activate_schedule/${scheduleId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth_token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
       
        fetchSchedules(); 
        toast.success('Schedule activated successfully');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Error activating schedule');
      }
    } catch (error) {
      toast.error('Error activating schedule: ' + error.message);
    }
  };
  

  const contextData = {
    auth_token,
    setAuth_token,
    fetchSchedules,
    schedules,
    setSchedules,
    handleCancel,
    error,
    handleActivate,
    setError,
  };

  return (
    <DriverContext.Provider value={contextData}>
      {children}
    </DriverContext.Provider>
  );
};
