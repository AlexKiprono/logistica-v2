import React, { useState, useContext, useEffect } from 'react';
import { CompanyAdminContext } from '../context/CompanyAdminContext';
import { AuthContext } from '../context/AuthContext';
import ConfirmDeleteModal from './confirmDelete';  

function Viewall() {
  const { auth_token } = useContext(AuthContext);
  const { all_stations, delete_station, stations, loading, error, setStations } = useContext(CompanyAdminContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [stationToDelete, setStationToDelete] = useState(null);

  useEffect(() => {
    if (auth_token) {
      all_stations(); 
    }
  }, [auth_token]);

  const handleDeleteStation = (id) => {
    setStationToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    await delete_station(stationToDelete);
    const updatedStations = stations.filter(station => station.station.id !== stationToDelete);
    setStations(updatedStations);
    setModalOpen(false);
    setStationToDelete(null);
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setStationToDelete(null);
  };

  if (loading) {
    return <p>Loading stations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!stations.length) {
    return <p>No stations found.</p>;
  }

  return (
    <>
      <header>
        <div className="px-4 py-3 border border-indigo-100 rounded-xl mb-3 sm:px-6 bg-white">
          <h3 className="text-xl font-semibold text-gray-800">Registered stations</h3>
          <p className="mt-1 text-sm text-gray-600">
            You are viewing all registered stations.
          </p>
        </div>
      </header>

      {/* stations Table */}
      <div className="overflow-x-auto border border-indigo-100 rounded-xl">
        <table className="min-w-full bg-white shadow-lg rounded-lg divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Station
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Admin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stations.map((stationWrapper) => {
              const station = stationWrapper.station;
              return (
                <tr key={station.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://i.pravatar.cc/150?img=${station.id}`}
                          alt="Avatar"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{station.name}</div>
                        <div className="text-sm font-medium text-gray-900">{station.county} County</div>
                        <div className="text-sm text-gray-500">{station.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Rendering Admin Details */}
                    {stationWrapper.admin ? (
                      <div className="text-sm text-gray-900">
                        {stationWrapper.admin.first_name} {stationWrapper.admin.last_name}
                        <div className="text-sm text-gray-500">{stationWrapper.admin.phone_number}</div>
                        <div className="text-sm text-gray-500">{stationWrapper.admin.email}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">No Admin</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </a>
                    <button 
                      onClick={() => handleDeleteStation(station.id)} 
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal 
        isOpen={isModalOpen} 
        onConfirm={confirmDelete} 
        onCancel={cancelDelete} 
      />
    </>
  );
}

export default Viewall;
