import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CompanyAdminContext } from '../context/CompanyAdminContext';
import { toast } from "react-toastify";

function AssignVehicleModal({ isModalOpen, closeModal, driverId }) {
  const { auth_token } = useContext(AuthContext);
  const { all_vehicles, vehicles, loading, error } = useContext(CompanyAdminContext);

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const server_url = "http://127.0.0.1:5000";



  useEffect(() => {
    if (isModalOpen && auth_token && !hasFetched) {
      all_vehicles(); 
      setHasFetched(true);
    }
  }, [isModalOpen, auth_token, hasFetched, all_vehicles]);

  useEffect(() => {
    if (!isModalOpen) {
      setHasFetched(false);
      setSelectedVehicle(null);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (driverId && vehicles) {
      setSelectedDriver({ id: driverId });
    }
  }, [driverId, vehicles]);

  const confirmAssignVehicle = async () => {
    if (selectedDriver && selectedVehicle) {
      try {
        const response = await fetch(`${server_url}/company/assign_driver_to_vehicle/${selectedDriver.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`,
          },
          body: JSON.stringify({ vehicle_id: selectedVehicle.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to assign vehicle');
        }

        closeModal();
        setSelectedDriver(null);
        setSelectedVehicle(null);
        toast.success('Vehicle successfully assigned to driver!');
      } catch (err) {
        console.error(err);
        toast.info('vehicle asigned to another driver');
      }
    }
  };

  const cancelAssignVehicle = () => {
    closeModal(); 
    setSelectedDriver(null);
    setSelectedVehicle(null);
  };


  if (loading) return <p>Loading vehicles...</p>;
  if (error) return <p>{error}</p>;
  if (!Array.isArray(vehicles) || vehicles.length === 0) return <p>No vehicles found.</p>;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-700 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex justify-center">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Assign Vehicle to Driver</h3>

              {/* Show driver information (driver is automatically selected) */}
              {selectedDriver && (
                <div className="mb-4">
                  <p className="text-sm text-gray-700">
                    Driver: {selectedDriver.id}
                  </p>
                </div>
              )}

              {/* Select Vehicle */}
              <div className="mb-4">
                <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">Select Vehicle</label>
                <select
                  id="vehicle"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedVehicle?.id || ''}
                  onChange={(e) => setSelectedVehicle(vehicles.find(vehicle => vehicle.id === parseInt(e.target.value)))}
                >
                  <option value="">Select a Vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.vehicle_type} ({vehicle.license_plate})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 sm:mt-4 sm:flex justify-center sm:flex-row-reverse">
            <button
              onClick={confirmAssignVehicle}
              disabled={!selectedVehicle}
              className={`inline-flex justify-center w-auto rounded-md border border-transparent p-2 ${selectedVehicle ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-500'} text-base leading-6 font-medium shadow-sm focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5`}
            >
              Assign Vehicle
            </button>

            <button
              onClick={cancelAssignVehicle}
              className="mt-3 sm:mt-0 inline-flex justify-center w-auto rounded-md border border-transparent p-2 bg-red-600 text-white text-base leading-6 font-medium shadow-sm focus:outline-none focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignVehicleModal;
