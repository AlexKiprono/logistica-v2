import React, { useState, useContext, useEffect } from 'react';
import { CompanyAdminContext } from '../context/CompanyAdminContext';
import { AuthContext } from '../context/AuthContext';

function CreateDrivers() {
  const { all_vehicles, create_driver,vehicles } = useContext(CompanyAdminContext);
  const {auth_token} = useContext(AuthContext); 

  // State variables for form data
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [license_number, setLicenceNumber] = useState('');
  const [license_expiry, setLicenceExpiry] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (auth_token) {
      all_vehicles(); 
    }
  }, [auth_token]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!first_name) newErrors.first_name = 'First name is required';
    if (!last_name) newErrors.last_name = 'Last name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!license_number) newErrors.license_number = 'License number is required';
    if (!license_expiry) newErrors.license_expiry = 'Licence expiry is required';

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

    create_driver(first_name, last_name, email, phone_number, license_number, license_expiry, status, password);

    // Reset form fields after submission
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setLicenceNumber('');
    setLicenceExpiry('');
    setStatus('');
    setPassword('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"/>
          </svg>
          <span className="text-lg font-semibold text-gray-800 dark:text-white">Create Drivers</span>
        </div>

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
          {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="license_number" className="mb-3 block text-base font-medium text-[#07074D]">License Number</label>
          <input
            type="text"
            name="license_number"
            id="license_number"
            value={license_number}
            onChange={(e) => setLicenceNumber(e.target.value)}
            placeholder="ABC1234"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {errors.license_number && <p className="text-red-500 text-sm">{errors.license_number}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="license_expiry" className="mb-3 block text-base font-medium text-[#07074D]">License Expiry</label>
          <input
            type="text"
            name="license_expiry"
            id="license_expiry"
            value={license_expiry}
            onChange={(e) => setLicenceExpiry(e.target.value)}
            placeholder="2024-12-31"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {errors.license_expiry && <p className="text-red-500 text-sm">{errors.license_expiry}</p>}
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

export default CreateDrivers;
