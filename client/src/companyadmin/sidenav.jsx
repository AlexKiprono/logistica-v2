import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logoDark from '../assets/img/logo-ct-dark.png';
import logoLight from '../assets/img/logo-ct.png';
import CreateStations from './CreateStations';
import CreateDrivers from './CreateDrivers';
import CreateVehicles from './CreateVehicles';
import CreateRoutes from './CreateRoutes';

const Sidenav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStationModalOpen, setIsStationModalOpen] = useState(false);
  const [isDriversModalOpen, setIsDriversModalOpen] = useState(false);
  const [isVehiclesModalOpen, setIsVehiclesModalOpen] = useState(false);
  const [isRoutesModalOpen, setIsRoutesModalOpen] = useState(false);




  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle the modal visibility
  const toggleStationModal = () => {
    setIsStationModalOpen(!isStationModalOpen);
  };

  const toggleDriversModal = () => {
    setIsDriversModalOpen(!isDriversModalOpen);
  };

  const toggleVehiclesModal = () => {
    setIsVehiclesModalOpen(!isVehiclesModalOpen);
  };

  const toggleRoutesModal = () => {
    setIsRoutesModalOpen(!isRoutesModalOpen);
  };

  return (
    <div>
      <aside
        className="fixed inset-y-0 flex-wrap items-center border border-indigo-100 justify-between block w-full p-0 my-4 overflow-y-auto transition-transform duration-200 bg-white shadow-xl max-w-64 xl:ml-6 rounded-xl xl:left-0"
        role="navigation"
      >
        {/* Header with logo */}
        <div className="h-19">
          <NavLink to="/" className="block px-8 py-6 ">
            <span className="ml-1 font-semibold text-slate-700 dark:text-white">MATATU</span>
          </NavLink>
        </div>
        <hr className="my-2 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:via-white" />

        {/* Navigation Menu */}
        <div className="items-center block max-h-screen overflow-auto grow">
          <ul className="flex flex-col pl-0 mb-0">

            <div className="dashboard">
              <div className="flex items-center font-semibold justify-between">
                <MenuItem to="/companyadmin/dashboard" iconClass="ni ni-tv-2" text="Dashboard" />

              </div>
                <div className="px-4 pb-4">
                  <ul className="flex flex-col gap-4 pl-2 mt-4">
                    <li className="flex gap-2 hover:bg-indigo-200 p-3 border round-l">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#9585ff" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
                        <path d="M7 14.4375C7 13.7471 7.55964 13.1875 8.25 13.1875C8.94036 13.1875 9.5001 13.7471 9.5001 14.4375C9.5001 15.1279 8.94046 15.6875 8.2501 15.6875C7.55974 15.6875 7 15.1279 7 14.4375Z" fill="#9585ff"/>
                        <path d="M15.75 13.1875C15.0596 13.1875 14.5 13.7471 14.5 14.4375C14.5 15.1279 15.0596 15.6875 15.75 15.6875C16.4404 15.6875 17.0001 15.1279 17.0001 14.4375C17.0001 13.7471 16.4404 13.1875 15.75 13.1875Z" fill="#9585ff"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.625 2.625C5.83293 2.625 4.33446 3.88206 3.96326 5.5625H3.875C3.04657 5.5625 2.375 6.23407 2.375 7.0625V7.8125C2.375 8.22671 2.71079 8.5625 3.125 8.5625H3.875V16.625C3.875 17.3498 4.21774 17.9946 4.75 18.4061V19.875C4.75 20.7034 5.42157 21.375 6.25 21.375C7.07843 21.375 7.75 20.7034 7.75 19.875V18.875H16.25V19.875C16.25 20.7034 16.9216 21.375 17.75 21.375C18.5784 21.375 19.25 20.7034 19.25 19.875V18.4061C19.7823 17.9946 20.125 17.3498 20.125 16.625V8.5625H20.875C21.2892 8.5625 21.625 8.22671 21.625 7.8125V7.0625C21.625 6.23407 20.9534 5.5625 20.125 5.5625H20.0367C19.6655 3.88206 18.1671 2.625 16.375 2.625H7.625ZM18.625 6.375C18.625 5.13236 17.6176 4.125 16.375 4.125H7.625C6.38236 4.125 5.375 5.13236 5.375 6.375V10H18.625V6.375ZM17.875 17.375C18.2892 17.375 18.625 17.0392 18.625 16.625V11.5H5.375V16.625C5.375 17.0392 5.71079 17.375 6.125 17.375H17.875Z" fill="#9585ff"/>
                      </svg>
                      <a onClick={toggleStationModal}>Create Station</a>
                    </li>

                        <li className="flex gap-2 hover:bg-indigo-200 p-3 border rounded-l">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                          <path strokeLinecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>

                        <a onClick={toggleDriversModal}>Create Driver</a>
                        </li>

                        <li className="flex gap-2 hover:bg-indigo-200 p-3 border round-l">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                          <path strokeLinecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>

                        <a onClick={toggleVehiclesModal}>Create Vehicle</a>
                        </li>

                        <li className="flex gap-2 hover:bg-indigo-200 p-3 border round-l">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M5 14v7M5 4.971v9.541c5.6-5.538 8.4 2.64 14-.086v-9.54C13.4 7.61 10.6-.568 5 4.97Z"/>
                        </svg>
                        <a onClick={toggleRoutesModal}>Create Route</a>
                        </li>
                </ul>
                </div>
              {/* )} */}
            </div>
          </ul>
        </div>
      </aside>

      {/* Modal for Create Station */}
      {isStationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleStationModal}></div>
          <div className="mx-auto w-full max-w-[550px] bg-white z-10 rounded-lg shadow-lg p-6">
            <button onClick={toggleStationModal} className="absolute top-2 right-2 text-gray-500 text-2xl">&times;</button>
            <h2 className="text-xl font-semibold mb-4"></h2>
            <CreateStations />
          </div>
        </div>
      )}

      {isDriversModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleDriversModal}></div>
          <div className="mx-auto w-full max-w-[550px] bg-white z-10 rounded-lg shadow-lg p-6">
            <button onClick={toggleDriversModal} className="absolute top-2 right-2 text-gray-500 text-2xl">&times;</button>
            <h2 className="text-xl font-semibold mb-4"></h2>
            <CreateDrivers />
          </div>
        </div>
      )}

      {isVehiclesModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleVehiclesModal}></div>
          <div className="mx-auto w-full max-w-[550px] bg-white z-10 rounded-lg shadow-lg p-6">
            <button onClick={toggleVehiclesModal} className="absolute top-2 right-2 text-gray-500 text-2xl">&times;</button>
            <h2 className="text-xl font-semibold mb-4"></h2>
            <CreateVehicles />
          </div>
        </div>
      )}

      {isRoutesModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleRoutesModal}></div>
          <div className="mx-auto w-full max-w-[550px] bg-white z-10 rounded-lg shadow-lg p-6">
            <button onClick={toggleRoutesModal} className="absolute top-2 right-2 text-gray-500 text-2xl">&times;</button>
            <h2 className="text-xl font-semibold mb-4"></h2>
            <CreateRoutes />
          </div>
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ to, iconClass, text }) => (
  <li className="mb-2">
    <NavLink
      to={to}
      className="flex items-center px-4 py-2 text-sm font-semibold text-slate-600 p-2 hover:border-indigo-100"
    >
      <i className={iconClass}></i>
      <span className="ml-3">{text}</span>
    </NavLink>
  </li>
);

export default Sidenav;