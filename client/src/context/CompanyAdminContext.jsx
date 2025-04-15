import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";

export const CompanyAdminContext = createContext();
export const useUser = () => {
  const context = useContext(CompanyAdminContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a CompanyAdminProvider');
  }
  return context;
};

export const CompanyAdminProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [auth_token, setAuth_token] = useState(() => localStorage.getItem("access_token") || null);
  const [stations, setStations] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [driversWithVehicles, setDriversWithVehicles] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [schedules_route, setSchedulesRoute] = useState([]);
  const [counties, setCounty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const access_token = localStorage.getItem("access_token")

  const server_url = "http://127.0.0.1:5000";

  // Fetch all stations
  const all_stations = async () => {
    setLoading(true);
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(`${server_url}/admin/company/stations`, {
        // method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });
  
      const res = await response.json();
      // console.log('Response:', res);  
  
      if (response.ok) {
        setStations(res || []); 
      } else {
        setError(res.message || 'An error occurred');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Create station
  const create_station = async (name, county_id, address, first_name, last_name, email, phone_number, password) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(`${server_url}/station/create`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          county_id,
          address,
          first_name,
          last_name,
          email,
          phone_number,
          password
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });

      const res = await response.json();
      
      if (!response.ok) {
        throw new Error(res.error || 'An error occurred'); 
      }
      toast.success(res.message || 'Station registered successfully');
      all_stations();  // Re-fetch stations after creation
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during registration:', error);
    }
  };

  // Delete station
  const delete_station = async (id) => {
    const access_token = localStorage.getItem('access_token')
    try {
      // Optimistically update UI before server response
      const updatedStations = stations.filter(station => station.id !== id);
      setStations(updatedStations); 

      const response = await fetch(`${server_url}/company/station/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });
      
      const res = await response.json();
      
      if (!response.ok) {
        throw new Error(res.message || 'An error occurred');
      }
      toast.success(res.message || 'Station deleted successfully');
      all_stations();  // Re-fetch stations after deletion
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during deletion:', error);
    }
  };

  // Create driver
  const create_driver = async (first_name, last_name, email, phone_number, license_number, license_expiry, status, password) => {
    const access_token = localStorage.getItem('access_token');

    try {
      const response = await fetch(`${server_url}/company/create_driver`, {
        method: 'POST',
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          phone_number,
          license_number,
          license_expiry,
          status,
          password
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });

      const res = await response.json();
      
      if (!response.ok) {
        throw new Error(res.error || 'An error occurred'); 
      }
      toast.success(res.message || 'Driver registered successfully');
      all_drivers()
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during registration:', error);
    }
  };

  //View all drivers
  const all_drivers = async () => {
    setLoading(true);
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(`${server_url}/company/drivers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });
  
      const res = await response.json();
      const data = res.drivers;
      // console.log('Server Response:', res);  
      // console.log('Data:', data);
  
      if (response.ok) {
        setDrivers(data || []); 
      } else {
        setError(res.message || 'An error occurred');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Delete driver
  const delete_driver = async (id) => {
    const access_token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`${server_url}/company/driver/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });

      const res = await response.json();
      
      if (!response.ok) {
        throw new Error(res.error || 'An error occurred');
      }
      toast.success(res.message || 'Driver deleted successfully');
      // Optionally re-fetch drivers here if needed
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during deletion:', error);
    }
  };

  // Update driver
  const update_driver = async (id, first_name, last_name, email, phone_number, license_number, license_expiry, status) => {
    const access_token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`${server_url}/company/driver/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          phone_number,
          license_number,
          license_expiry,
          status
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });

      const res = await response.json();
      
      if (!response.ok) {
        throw new Error(res.error || 'An error occurred');
      }
      toast.success(res.message || 'Driver updated successfully');
      all_drivers();
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during update:', error);
    }
  };

// Create vehicle
  const create_vehicle = async (license_plate, vehicle_type, capacity, image) => {
    const access_token = localStorage.getItem("access_token");
    try {
      const formData = new FormData();
      formData.append("license_plate", license_plate);
      formData.append("vehicle_type", vehicle_type);
      formData.append("capacity", capacity);
      
      // Only append image if it's not null
      if (image) {
        formData.append("image", image);
      }
  
      const response = await fetch(`${server_url}/company/vehicles`, {
        method: 'POST',
        body: formData, 
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      });
  
      const res = await response.json();
      console.log(res);
  
      if (!response.ok) {
        throw new Error(res.error || 'An error occurred');
      }
  
      toast.success(res.message || 'Vehicle(s) registered successfully');
      all_vehicles();
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during registration:', error);
    }
  };
  

// get all vehicles
  const all_vehicles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${server_url}/company/vehicles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });
  
      const res = await response.json();
      const data = res.vehicles;
      console.log('Response:', res);  
  
      if (response.ok) {
        setVehicles(data || []); 
      } else {
        setError(res.message || 'An error occurred');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Delete vehicle
  const delete_vehicle = async (id) => {
    const access_token = localStorage.getItem("access_token")
    try {
      const response = await fetch(`${server_url}/company/vehicle/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });

      const res = await response.json();
      
      if (!response.ok) {
        throw new Error(res.error || 'An error occurred');
      }
      toast.success(res.message || 'Vehicle deleted successfully');
      // Optionally re-fetch vehicles here if needed
      all_vehicles()
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during deletion:', error);
    }
  };

  // Update vehicle
  const update_vehicle = async (id, license_plate, vehicle_type, capacity) => {
    const access_token = localStorage.getItem("access_token")

    try {
      const response = await fetch(`${server_url}/company/vehicle/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          license_plate,
          vehicle_type,
          capacity
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });

      const res = await response.json();
      
      if (!response.ok) {
        throw new Error(res.error || 'An error occurred');
      }
      toast.success(res.message || 'Vehicle updated successfully');
      all_vehicles();
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during update:', error);
    }
  };

  const assignVehicleToDriver = async (driverId, vehicleId) => {
    const access_token = localStorage.getItem("access_token")
    try {
        const response = await fetch(`http://localhost:5000/company/assign_driver_to_vehicle/${driverId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`, 
            },
            body: JSON.stringify({ vehicle_id: vehicleId }),
        });

        if (!response.ok) {
           
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to assign vehicle');
        }

        setDrivers((prevDrivers) =>
            prevDrivers.map((driver) =>
                driver.id === driverId ? { ...driver, assigned_vehicle_id: vehicleId } : driver
            )
        );

        closeModal();
        setSelectedDriver(null);
        setSelectedVehicle(null);

        toast.success('Vehicle assigned successfully');
        
    } catch (err) {
        setError(err.message || 'Failed to assign vehicle');
        toast.error(err.message || 'Failed to assign vehicle');
    }
};

// fetch drivers with vehicle assigned


const handleRemoveVehicle = async (driverId) => {
  const access_token = localStorage.getItem("access_token")

  try {
      const response = await fetch(`${server_url}/company/remove_vehicle_from_driver/${driverId}`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json',
          },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Vehicle successfully removed');
          
          setDrivers(prevDrivers => 
              prevDrivers.map(driver => 
                  driver.id === driverId ? { ...driver, assigned_vehicle: null } : driver
              )
          );
      } else {
        toast.error(result.message || 'Error removing vehicle');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to remove vehicle');
  }
};

// create route
const create_route = async (departure_id, arrival_id, distance) => {
  try {
    const routesData = {
      departure_id,
      arrival_id,
      distance
    };

    const access_token = localStorage.getItem('access_token');
    const response = await fetch(`${server_url}/company/routes`, {
      method: 'POST',
      body: JSON.stringify(routesData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    });

    const res = await response.json();

    if (!response.ok) {
      if (res.message === 'A route already exists from A to B') {
        toast.error('Route already exists.');
      } else if (res.message === 'Route created successfully from A to B (inverse route exists)') {
        toast.success('Route created successfully)');
      } else {
        toast.error(res.message || 'An error occurred');
      }
      throw new Error(res.message || 'An error occurred');
    }

    toast.success(res.message || 'Route(s) registered successfully');
    all_routes();
  } catch (error) {
    toast.error(error.message || 'An error occurred. Please try again.');
    console.error('Error during registration:', error);
  }
};




// get all routes
const all_routes = async () => {
  setLoading(true);
  const access_token = localStorage.getItem('access_token');
  try {
    const response = await fetch(`${server_url}/company/routes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
    });

    const res = await response.json();
    const data = res.routes;
    // console.log('Response:', data);  

    if (response.ok) {
      setRoutes(data || []); 
    } else {
      setError(res.message || 'An error occurred');
    }
  } catch (err) {
    setError(err.message || 'An error occurred');
  } finally {
    setLoading(false);
  }
};

  // Delete route
  const delete_route = async (id) => {
    const access_token = localStorage.getItem('access_token');

  
    try {

      const updatedRoutes = routes.filter(route => route.id !== id);
      setRoutes(updatedRoutes); 

      const response = await fetch(`${server_url}/company/route/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });
  
      const res = await response.json();
      
      if (!response.ok) {
        throw new Error(res.message || 'An error occurred');
      }
      toast.success(res.message || 'Route deleted successfully');
      all_routes();
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during deletion:', error);
    }
  };
  

  // Update route
  const update_route = async (id, start_location, end_location, distance) => {
    const access_token = localStorage.getItem('access_token'); 
    try {
      const response = await fetch(`${server_url}/company/route/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          start_location,
          end_location,
          distance
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });

      const res = await response.json();
      
      if (!response.ok) {
        throw new Error(res.error || 'An error occurred');
      }
      toast.success(res.message || 'Route updated successfully');
      all_routes();
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during update:', error);
    }
  };

  const create_schedule = async ( routeId, date, start_time, end_time, ticket_price, driver_id) => {
    const access_token = localStorage.getItem('access_token');  // Get the access token from local storage
    try {

      if (!routeId) {
        throw new Error('Route ID is required.');
      }
      if (!date || !start_time || !end_time) {
        throw new Error('Date and time required.');
      }
      if (!ticket_price || ticket_price < 0) {
        throw new Error('A valid ticket price is required.');
      }
      if (!driver_id) {
        throw new Error('Driver ID is required.');
      }
  
      const formattedDate = date; 
      const formattedStartTime = start_time; 
      const formattedEndTime = end_time; // Already in HH:mm format
      
      const response = await fetch(`${server_url}/company/routes/${routeId}/schedule`, {
        method: 'POST',
        body: JSON.stringify({
          date: formattedDate,
          start_time: formattedStartTime,
          end_time: formattedEndTime,
          ticket_price,
          driver_id
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
      
      const res = await response.json();
      console.log('schedule creation', res);
      
      if (!response.ok) {
        throw new Error(res.message || res.error || 'An error occurred');
      }
      
      toast.success(res.message || 'Schedule created successfully');
      all_schedules_route(routeId);  // Refresh the schedule list or handle the UI update
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during schedule creation:', error);
    }
  };

  // fetch all counties
  const all_counties = async () => {
    setLoading(true);
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch('http://127.0.0.1:5000/county', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });
  
      if (response.ok) {
        const res = await response.json();
        const data = res || [];
        // console.log('Fetched counties:', data);
        setCounty(data);
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.message || 'An error occurred');
      }
    } catch (error) {
      setError('Failed to fetch counties: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  // drivers with vehicles
  const drivers_with_vehicles = async () => {
    setLoading(true);
    try {
      const access_token = localStorage.getItem("access_token")
      const response = await fetch(`${server_url}/company/drivers_with_vehicles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });

      const res = await response.json();
      const data = res.drivers;
      // console.log('Response Drivers with Vehicles:', data);  

      if (response.ok) {
        setDriversWithVehicles(data || []); 
      } else {
        setError(res.message || 'An error occurred');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // view all schedules for driver  
  const all_schedules_driver = async (driver_id) => {
    setLoading(true);
    const access_token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`${server_url}/company/schedules/${driver_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });

      const res = await response.json();
      const data = res.schedules;
      // console.log('Response:', data);  

      if (response.ok) {
        setSchedules(data || []); 
      } else {
        setError(res.message || 'An error occurred');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // view all schedules for vehicle
  const all_schedules_vehicle = async (vehicle_id) => {
    setLoading(true);
    const access_token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`${server_url}/company/schedules/${vehicle_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });

      const res = await response.json();
      const data = res.schedules;
      // console.log('Response:', data);  

      if (response.ok) {
        setSchedules(data || []); 
      } else {
        setError(res.message || 'An error occurred');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // view all schedules for route
  const all_schedules_route = async (routeId) => {
    setLoading(true);
    const access_token = localStorage.getItem('access_token');
    try {
        const response = await fetch(`${server_url}/company/routes/${routeId}/schedule`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        });

        const res = await response.json();
        console.log('API Response:', res);  

        if (response.ok) {
            const data = res.schedules || []; 
            console.log('Route Schedules data:', data); 
            setSchedulesRoute(data); 
        } else {
           
            setError(res.message || 'An error occurred while fetching schedules');
        }
    } catch (err) {
        setError(err.message || 'An error occurred while fetching schedules');
    } finally {
        setLoading(false);  
    }
};


  // view all schedules
  const all_schedules = async () => {
    setLoading(true);
    const access_token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`${server_url}/company/schedules`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });

      const res = await response.json();
      const data = res.schedules;
      // console.log('Response:', data);  

      if (response.ok) {
        setSchedules(data || []); 
      } else {
        setError(res.message || 'An error occurred');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };


  // Update schedule
  const update_schedule = async (id, date, routeId, start_time, end_time, ticket_price) => {
    try {
      const requestData = {
        date,
        routeId,
        start_time,
        end_time,
        ticket_price
      };

      const response = await fetch(`${server_url}/company/schedule/${id}`, {
        method: 'PUT',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
  
      const res = await response.json();
      
      if (!response.ok) {
        throw new Error(res.error || 'An error occurred');
      }
      toast.success(res.message || 'Schedule updated successfully');
      all_schedules(routeId);
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error during schedule update:', error);
    }
  };
  

  // Delete schedule
  const delete_schedule = async (id, routeId) => {
    try {
        const response = await fetch(`${server_url}/company/schedule/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        });

        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            // If not, throw an error with the message from the server or default message
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'An error occurred while deleting the schedule.');
        }

        // Parse the response
        const res = await response.json();
        
        // Success message and update schedule list
        toast.success(res.message || 'Schedule deleted successfully');
        all_schedules(routeId);  // Ensure that the schedule list is refreshed with the correct routeId
    } catch (error) {
        // Log the error and show an error message to the user
        console.error('Delete Schedule Error:', error);
        toast.error(error.message || 'An error occurred. Please try again.');
    }
};


  

  // Book a ticket






  const contextData = {
    auth_token,
    currentUser,
    setCurrentUser,
    create_station,
    all_stations,
    delete_station,
    create_driver,
    all_drivers,
    delete_driver,
    update_driver,
    drivers_with_vehicles,
    setAuth_token,
    create_vehicle,
    all_vehicles,
    delete_vehicle,
    update_vehicle,
    assignVehicleToDriver,
    handleRemoveVehicle,
    all_routes,
    create_route,
    delete_route,
    update_route,
    create_schedule,
    all_schedules,
    all_schedules_route,
    all_schedules_vehicle,
    all_schedules_driver,
    schedules_route,
    setSchedulesRoute,
    update_schedule,
    delete_schedule,
    driversWithVehicles,
    setDriversWithVehicles,
    schedules,
    setSchedules,
    vehicles,
    setVehicles,
    stations,
    setStations,
    drivers,
    setDrivers,
    routes,
    setRoutes,
    all_counties,
    setCounty,
    counties,
    loading,
    error,
    loading,
    error,
  };

  return (
    <CompanyAdminContext.Provider value={contextData}>
      {children}
    </CompanyAdminContext.Provider>
  );
};
