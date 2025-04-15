import React, { useState, useContext,useEffect } from 'react';
import { CompanyAdminContext } from '../context/CompanyAdminContext';

function CreateStations() {
  const { create_station,all_counties,counties } = useContext(CompanyAdminContext);

  // State variables for form data
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [county_id, setCountyId] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // State for error handling
  const [errors, setErrors] = useState({});
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    if (access_token) {
      all_counties();  
    }
  }, [access_token]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Station name is required';
    if (!address) newErrors.address = 'Address is required';
    if (!county_id) newErrors.county_id = 'County is required';
    if (!email) newErrors.email = 'Email is required';
    return newErrors;
  };
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Call the create_station function with form data
    create_station(name, county_id, address, first_name, last_name, email, phone_number, password);

    // Clear form after submission
    setName('');
    setAddress('');
    setCountyId('');
    setPhoneNumber('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"/>
          </svg>
          <span className="text-lg font-semibold text-gray-800 dark:text-white">Create Station</span>
        </div>

        <div className="station flex gap-8">
          <div className="mb-3 w-full">
            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">Station Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tea Room Station"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-3 w-full">
            <label htmlFor="address" className="mb-3 block text-base font-medium text-[#07074D]">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="700 Kakamega"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
        </div>

        <div className="place flex gap-8">
          <div className="mb-3 w-full">
            <label htmlFor="county_id" className="mb-3 block text-base font-medium text-[#07074D]">Select County</label>
            <select
              id="county_id"
              value={county_id}
              onChange={(e) => setCountyId(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              {counties &&
                counties.map((county) => (
                  <option key={county.id} value={county.id}>{county.name}</option>
                ))}
            </select>

            {errors.county_id && <p className="text-red-500 text-sm">{errors.county_id}</p>}
          </div>
        </div>

        {/* Admin Information Fields */}
        <div className="mb-3">
          <label htmlFor="first_name" className="mb-3 block text-base font-medium text-[#07074D]">Admin First Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Joseph"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="mb-3 block text-base font-medium text-[#07074D]">Admin Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Langat"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">Admin Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="joseph@gmail.com"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone_number" className="mb-3 block text-base font-medium text-[#07074D]">Admin Phone Number</label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+254712345678"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">Password</label>
          <span><small><i>User should change password on login</i></small></span>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-8 text-center text-base font-semibold text-white rounded-md bg-gradient-to-r from-[#6A64F1] to-[#4C3CC3] hover:from-[#4C3CC3] hover:to-[#6A64F1] focus:outline-none shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateStations;





























// import React, { useState, useContext } from 'react';
// import { toast } from 'react-toastify';
// import { CompanyAdminContext } from '../context/CompanyAdminContext';

// function CreateVehicles() {
//   const { create_vehicle } = useContext(CompanyAdminContext);

//   const [vehicles, setVehicles] = useState([{ license_plate: '', vehicle_type: '', capacity: '' }]);
//   const [errors, setErrors] = useState([]);

//   // Function to handle input changes for each vehicle form
//   const handleInputChange = (index, e) => {
//     const { name, value } = e.target;
//     const newVehicles = [...vehicles];
//     newVehicles[index][name] = value;
//     setVehicles(newVehicles);
//   };

//   // Function to add a new vehicle form
//   const addVehicleForm = () => {
//     setVehicles([...vehicles, { license_plate: '', vehicle_type: '', capacity: '' }]);
//   };

//   // Function to remove a vehicle form
//   const removeVehicleForm = (index) => {
//     const newVehicles = vehicles.filter((_, i) => i !== index);
//     setVehicles(newVehicles);
//   };

//   // Validate all forms before submitting
//   const validateForm = () => {
//     let validationErrors = [];
//     vehicles.forEach((vehicle, index) => {
//       let vehicleErrors = {};
//       if (!vehicle.license_plate) vehicleErrors.license_plate = 'License plate is required';
//       if (!vehicle.vehicle_type) vehicleErrors.vehicle_type = 'Vehicle type is required';
//       if (!vehicle.capacity) vehicleErrors.capacity = 'Capacity is required';
//       if (Object.keys(vehicleErrors).length > 0) validationErrors[index] = vehicleErrors;
//     });
//     return validationErrors;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const response = await fetch('/company/vehicles', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${auth_token}`, // Ensure auth_token is correctly managed
//         },
//         body: JSON.stringify(vehicles),
//       });

//       const res = await response.json();
//       if (!response.ok) {
//         throw new Error(res.error || 'An error occurred');
//       }
//       toast.success(res.message || 'Vehicles created successfully');
//       setVehicles([{ license_plate: '', vehicle_type: '', capacity: '' }]); // Reset form
//     } catch (error) {
//       toast.error(error.message || 'An error occurred. Please try again.');
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <h2>Create Vehicles</h2>

//         {vehicles.map((vehicle, index) => (
//           <div key={index} className="vehicle-form">
//             <div>
//               <label htmlFor={`license_plate_${index}`}>License Plate</label>
//               <input
//                 type="text"
//                 id={`license_plate_${index}`}
//                 name="license_plate"
//                 value={vehicle.license_plate}
//                 onChange={(e) => handleInputChange(index, e)}
//               />
//               {errors[index]?.license_plate && <p className="error">{errors[index].license_plate}</p>}
//             </div>
//             <div>
//               <label htmlFor={`vehicle_type_${index}`}>Vehicle Type</label>
//               <input
//                 type="text"
//                 id={`vehicle_type_${index}`}
//                 name="vehicle_type"
//                 value={vehicle.vehicle_type}
//                 onChange={(e) => handleInputChange(index, e)}
//               />
//               {errors[index]?.vehicle_type && <p className="error">{errors[index].vehicle_type}</p>}
//             </div>
//             <div>
//               <label htmlFor={`capacity_${index}`}>Capacity</label>
//               <input
//                 type="text"
//                 id={`capacity_${index}`}
//                 name="capacity"
//                 value={vehicle.capacity}
//                 onChange={(e) => handleInputChange(index, e)}
//               />
//               {errors[index]?.capacity && <p className="error">{errors[index].capacity}</p>}
//             </div>

//             <button type="button" onClick={() => removeVehicleForm(index)}>
//               Remove Vehicle
//             </button>
//           </div>
//         ))}

//         <button type="button" onClick={addVehicleForm}>
//           Add Another Vehicle
//         </button>

//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }

// export default CreateVehicles;
