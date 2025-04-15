// import React, { useState, useEffect, useContext } from 'react';
// import { DriverContext } from '../context/DriverContext';
// import { AuthContext } from '../context/AuthContext';

// function Tables() {
//   const { auth_token } = useContext(AuthContext);
//   const { fetchSchedules, schedules, handleCancel, handleActivate } = useContext(DriverContext);

//   useEffect(() => {
//     fetchSchedules();
//   }, [auth_token]);

//   if (!Array.isArray(schedules) || schedules.length === 0) {
//     return <p>No schedules found.</p>;
//   }

//   return (
//     <div className="mt-6 border border-indigo-200 rounded-lg">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Route
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Vehicle
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Date
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Status
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Capacity
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Ticket Price
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {schedules.length > 0 ? (
//               schedules.map((schedule) => (
//                 <tr key={schedule.schedule_id} className="hover:bg-gray-100">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {schedule.route_start_location} - {schedule.route_end_location}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       {schedule.vehicle_type} ({schedule.vehicle_license_plate})
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{schedule.date}</div>
//                     <div className="text-sm text-gray-900">
//                       {schedule.start_time} - {schedule.end_time}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         schedule.schedule_status === 'active'
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-red-100 text-red-800'
//                       }`}
//                     >
//                       {schedule.schedule_status === 'active' ? 'Active' : 'Inactive'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {schedule.vehicle_capacity} passengers
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ${schedule.ticket_price}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     {schedule.schedule_status === 'active' ? (
//                       <button
//                         onClick={() => handleCancel(schedule.schedule_id)}
//                         className="ml-2 text-red-600 hover:text-red-900"
//                       >
//                         Cancel
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => handleActivate(schedule.schedule_id)}
//                         className="ml-2 text-green-600 hover:text-green-900"
//                       >
//                         Activate
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
//                   No schedules to display.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Tables;



import React, { useState, useEffect, useContext } from 'react';
import { DriverContext } from '../context/DriverContext';
import { AuthContext } from '../context/AuthContext';

function Tables() {
  const { auth_token } = useContext(AuthContext);
  const { fetchSchedules, schedules, handleCancel, handleActivate } = useContext(DriverContext);

  useEffect(() => {
    fetchSchedules();
  }, [auth_token]); // Fetch schedules only when auth_token changes

  if (!Array.isArray(schedules) || schedules.length === 0) {
    return <p>No schedules found.</p>;
  }

  return (
    <div className="mt-6 border border-indigo-200 rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Route
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vehicle
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Capacity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ticket Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr key={schedule.schedule_id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {schedule.route_start_location} - {schedule.route_end_location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {schedule.vehicle_type} ({schedule.vehicle_license_plate})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{schedule.date}</div>
                    <div className="text-sm text-gray-900">
                      {schedule.start_time} - {schedule.end_time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        schedule.schedule_status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {schedule.schedule_status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {schedule.vehicle_capacity} passengers
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${schedule.ticket_price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {schedule.schedule_status === 'active' ? (
                      <button
                        onClick={() => handleCancel(schedule.schedule_id)}
                        className="ml-2 text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivate(schedule.schedule_id)}
                        className="ml-2 text-green-600 hover:text-green-900"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No schedules to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tables;
