// import React, { useState, useEffect, useContext } from 'react';
// import { CompanyAdminContext } from '../context/CompanyAdminContext';

// function CreateRoutes() {
//   const { all_counties, create_route, counties } = useContext(CompanyAdminContext); // Assuming counties are fetched and provided

//   // State variables for form fields
//   const [departure_id, setDepartureId] = useState('');
//   const [arrival_id, seArrivalId] = useState('');
//   const [distance, setDistance] = useState('');

//   // For storing errors
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const access_token = localStorage.getItem("access_token");

//   useEffect(() => {
//     if (access_token) {
//       all_counties();  
//     }
//   }, [access_token]);

  
//   const validateForm = () => {
//     const newErrors = {};
//     if (!departure_id) newErrors.departure_id = 'Start Location is required';
//     if (!arrival_id) newErrors.arrival_id = 'End Location is required';
//     if (!distance) {
//       newErrors.distance = 'Distance is required';
//     } else if (isNaN(distance) || parseFloat(distance) <= 0) {
//       newErrors.distance = 'Distance must be a positive number';
//     }
//     return newErrors;
//   };

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Validate form inputs
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setIsSubmitting(false);
//       return;
//     }

//     // Submit the Route data to the create_route function
//     try {
//       await create_route(departure_id, arrival_id, distance);
//       // Reset form fields after successful submission
//       setDepartureId('');
//       seArrivalId('');
//       setDistance('');
//       setErrors({});
//     } catch (error) {
//       // Handle errors from create_route if any
//       console.error('Error creating route:', error);
//     }

//     setIsSubmitting(false);
//   };

//   const filteredCountiesForEnd = counties.filter(
//     (county) => county.id !== departure_id 
//   );

//   const filteredCountiesForStart = counties.filter(
//     (county) => county.id !== arrival_id 
//   );

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className="flex items-center gap-6 mb-4">
//           <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"/>
//           </svg>
//           <span className="text-lg font-semibold text-gray-800 dark:text-white">Create Routes</span>
//         </div>

//         <div className="station flex gap-12">
//           {/* Start Location Dropdown */}
//           <div className="mb-3 w-full">
//             <label htmlFor="departure_id" className="mb-3 block text-base font-medium text-[#07074D]">Start Location</label>
//             <select
//               id="departure_id"
//               value={departure_id}
//               onChange={(e) => setDepartureId(e.target.value)}
//               className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//             >
//               <option value="">Select Start Location</option>
//               {filteredCountiesForStart.map((county) => (
//                 <option key={county.id} value={county.id}>
//                   {county.name}
//                 </option>
//               ))}
//             </select>
//             {errors.departure_id && <p className="text-red-500 text-sm">{errors.departure_id}</p>}
//           </div>

//           {/* End Location Dropdown */}
//           <div className="mb-3 w-full">
//             <label htmlFor="arrival_id" className="mb-3 block text-base font-medium text-[#07074D]">End Location</label>
//             <select
//               id="arrival_id"
//               value={arrival_id}
//               onChange={(e) => seArrivalId(e.target.value)}
//               className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//             >
//               <option value="">Select End Location</option>
//               {filteredCountiesForEnd.map((county) => (
//                 <option key={county.id} value={county.id}>
//                   {county.name}
//                 </option>
//               ))}
//             </select>
//             {errors.arrival_id && <p className="text-red-500 text-sm">{errors.arrival_id}</p>}
//           </div>

//           {/* Distance Input */}
//           <div className="mb-3 w-full">
//             <label htmlFor="distance" className="mb-3 block text-base font-medium text-[#07074D]">Distance</label>
//             <input
//               type="text"
//               name="distance"
//               id="distance"
//               value={distance}
//               onChange={(e) => setDistance(e.target.value)}
//               placeholder="47.52698"
//               className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//             />
//             {errors.distance && <p className="text-red-500 text-sm">{errors.distance}</p>}
//           </div>
//         </div>

//         <div>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full py-2 px-8 text-center text-base font-semibold text-white rounded-md bg-gradient-to-r from-[#6A64F1] to-[#4C3CC3] hover:from-[#4C3CC3] hover:to-[#6A64F1] focus:outline-none shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl"
//           >
//             {isSubmitting ? 'Submitting...' : 'Submit'}
//           </button>
//         </div>
//       </form>
//     </>
//   );
// }

// export default CreateRoutes;



import React, { useState, useEffect, useContext } from "react";
import { CompanyAdminContext } from "../context/CompanyAdminContext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "./RoutingMachine";

// Fix marker icons for React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function CreateRoutes() {
  const { all_counties, create_route, counties } =
    useContext(CompanyAdminContext);
  const [departure_id, setDepartureId] = useState("");
  const [arrival_id, seArrivalId] = useState("");
  const [distance, setDistance] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    if (access_token) all_counties();
  }, [access_token]);

  const departureCounty = counties.find((c) => c.id == departure_id);
  const arrivalCounty = counties.find((c) => c.id == arrival_id);

  // Calculate distance using Haversine formula
  useEffect(() => {
    if (departureCounty && arrivalCounty) {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371; // Earth radius in km
      const dLat = toRad(arrivalCounty.lat - departureCounty.lat);
      const dLon = toRad(arrivalCounty.lng - departureCounty.lng);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(departureCounty.lat)) *
          Math.cos(toRad(arrivalCounty.lat)) *
          Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      setDistance(d.toFixed(2)); // Auto-set distance
    } else {
      setDistance("");
    }
  }, [departureCounty, arrivalCounty]);

  const validateForm = () => {
    const newErrors = {};
    if (!departure_id) newErrors.departure_id = "Start Location is required";
    if (!arrival_id) newErrors.arrival_id = "End Location is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await create_route(departure_id, arrival_id, distance);
      setDepartureId("");
      seArrivalId("");
      setDistance("");
      setErrors({});
    } catch (error) {
      console.error("Error creating route:", error);
    }

    setIsSubmitting(false);
  };

  const filteredCountiesForEnd = counties.filter((c) => c.id !== departure_id);
  const filteredCountiesForStart = counties.filter((c) => c.id !== arrival_id);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-6 mb-4">
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"
            />
          </svg>
          <span className="text-lg font-semibold text-gray-800">
            Create Routes
          </span>
        </div>

        <div className="station flex gap-12">
          {/* Start Location */}
          <div className="mb-3 w-full">
            <label
              htmlFor="departure_id"
              className="block text-base font-medium text-[#07074D]"
            >
              Start Location
            </label>
            <select
              id="departure_id"
              value={departure_id}
              onChange={(e) => setDepartureId(e.target.value)}
              className="w-full rounded-md border py-2 px-6"
            >
              <option value="">Select Start Location</option>
              {filteredCountiesForStart.map((county) => (
                <option key={county.id} value={county.id}>
                  {county.name}
                </option>
              ))}
            </select>
            {errors.departure_id && (
              <p className="text-red-500 text-sm">{errors.departure_id}</p>
            )}
          </div>

          {/* End Location */}
          <div className="mb-3 w-full">
            <label
              htmlFor="arrival_id"
              className="block text-base font-medium text-[#07074D]"
            >
              End Location
            </label>
            <select
              id="arrival_id"
              value={arrival_id}
              onChange={(e) => seArrivalId(e.target.value)}
              className="w-full rounded-md border py-2 px-6"
            >
              <option value="">Select End Location</option>
              {filteredCountiesForEnd.map((county) => (
                <option key={county.id} value={county.id}>
                  {county.name}
                </option>
              ))}
            </select>
            {errors.arrival_id && (
              <p className="text-red-500 text-sm">{errors.arrival_id}</p>
            )}
          </div>

          {/* Distance */}
          <div className="mb-3 w-full">
            <label
              htmlFor="distance"
              className="block text-base font-medium text-[#07074D]"
            >
              Distance (km)
            </label>
            <input
              type="text"
              id="distance"
              value={distance}
              readOnly
              className="w-full rounded-md border py-2 px-6 bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-8 text-base font-semibold text-white bg-gradient-to-r from-[#6A64F1] to-[#4C3CC3] rounded-md hover:from-[#4C3CC3] hover:to-[#6A64F1] shadow-lg transition duration-300"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Map display */}
      {departureCounty && arrivalCounty && (
        <div className="mt-8">
          {/* <MapContainer
            center={[
              (departureCounty.lat + arrivalCounty.lat) / 2,
              (departureCounty.lng + arrivalCounty.lng) / 2,
            ]}
            zoom={6}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[departureCounty.lat, departureCounty.lng]}>
              <Popup>Start: {departureCounty.name}</Popup>
            </Marker>
            <Marker position={[arrivalCounty.lat, arrivalCounty.lng]}>
              <Popup>End: {arrivalCounty.name}</Popup>
            </Marker>
            <Polyline
              positions={[
                [departureCounty.lat, departureCounty.lng],
                [arrivalCounty.lat, arrivalCounty.lng],
              ]}
              pathOptions={{ color: "blue" }}
            />
          </MapContainer> */}

          <MapContainer
            center={[
              (departureCounty.lat + arrivalCounty.lat) / 2,
              (departureCounty.lng + arrivalCounty.lng) / 2,
            ]}
            zoom={6}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <RoutingMachine
              from={[departureCounty.lat, departureCounty.lng]}
              to={[arrivalCounty.lat, arrivalCounty.lng]}
            />
          </MapContainer>
        </div>
      )}
    </>
  );
}

export default CreateRoutes;
