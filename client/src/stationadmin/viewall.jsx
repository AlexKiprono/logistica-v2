import React, { useEffect, useContext } from 'react';
import { StationAdminContext } from '../context/StationAdminContext';

function Viewall() {
  const { fetchStationSchedules, schedules, loading, error, stationId } = useContext(StationAdminContext);

  useEffect(() => {
    fetchStationSchedules();
  }, [stationId]);

  useEffect(() => {
    console.log("Schedules fetched:",schedules);
  });
    

  if (loading) {
    return <p>Loading schedules...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!schedules.length) {
    return <p>No schedules found.</p>;
  }

  return (
    <>
      <header>
        <div className="px-4 py-3 border border-indigo-100 rounded-lg mb-3 sm:px-6 bg-white">
          <h3 className="text-xl font-semibold text-gray-800">Schedules</h3>
          <p className="mt-1 text-sm text-gray-600">
            You are viewing schedules for this station.
          </p>
        </div>
      </header>

      {/* Departure Station Schedules Table */}
      <div className="overflow-x-auto border border-indigo-100 rounded-lg mb-6">
        <table className="min-w-full bg-white shadow-lg rounded-lg divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Ticket Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Driver</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schedules.map((schedule) => (
              <tr key={schedule.schedule.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className='text-blue-500'>{schedule.route.departure}</span> → <span className='text-green-500'>{schedule.route.arrival}</span>
                </td>
                
                {/* Start Time with Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {schedule.schedule.date} <br /> {schedule.schedule.start_time}
                </td>

                {/* End Time with Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {schedule.schedule.date} <br /> {schedule.schedule.end_time}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">{schedule.schedule.ticket_price} KES</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {schedule.driver ? `${schedule.driver.first_name} ${schedule.driver.last_name}` : 'No Driver Assigned'} 
                  <br />
                  {schedule.driver.vehicle_license_plate}
                </td>
              </tr>


            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Viewall;
