import React, { useState, useContext } from 'react';
import { CompanyAdminContext } from '../context/CompanyAdminContext';
import { toast } from 'react-toastify';

function CreateVehicles() {
  const { create_vehicle } = useContext(CompanyAdminContext);

  // State variables for form fields
  const [license_plate, setLicensePlate] = useState('');
  const [vehicle_type, setVehicleType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [image, setImage] = useState(null);

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Loading state to disable the submit button
  const [isLoading, setIsLoading] = useState(false);

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    if (!license_plate) newErrors.license_plate = 'Vehicle license plate is required';
    if (!vehicle_type) newErrors.vehicle_type = 'Vehicle Type is required';
    if (!capacity) newErrors.capacity = 'Capacity is required';
    else if (isNaN(capacity) || capacity <= 0) newErrors.capacity = 'Capacity must be a valid positive number';
    if (!image) newErrors.image = 'Vehicle image is required';
    return newErrors;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true); // Start loading

    // Submit the vehicle data to the create_vehicle function
    create_vehicle(license_plate, vehicle_type, capacity, image)
      .finally(() => setIsLoading(false)); // Stop loading when done

    // Reset form fields after submission
    setLicensePlate('');
    setVehicleType('');
    setCapacity('');
    setImage(null);
    setImagePreview(null); // Clear the image preview after submission
  };

  // Handle image file change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"/>
          </svg>
          <span className="text-lg font-semibold text-gray-800 dark:text-white">Create Vehicles</span>
        </div>

        <div className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-full">
          <label htmlFor="upload" className="flex flex-col items-center gap-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 fill-white stroke-indigo-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-gray-600 font-medium">Upload Vehicle Image</span>
          </label>
          <input
            id="upload"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*" 
          />
        </div>

        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Vehicle preview" className="w-32 h-32 object-cover rounded-md" />
          </div>
        )}

        <div className="station flex gap-8">
          <div className="mb-3 w-full">
            <label htmlFor="license_plate" className="mb-3 block text-base font-medium text-[#07074D]">Licence Plate</label>
            <input
              type="text"
              name="license_plate"
              id="license_plate"
              value={license_plate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="KDS 001A"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {errors.license_plate && <p className="text-red-500 text-sm">{errors.license_plate}</p>}
          </div>

          <div className="mb-3 w-full">
            <label htmlFor="vehicle_type" className="mb-3 block text-base font-medium text-[#07074D]">Vehicle Type</label>
            <input
              type="text"
              name="vehicle_type"
              id="vehicle_type"
              value={vehicle_type}
              onChange={(e) => setVehicleType(e.target.value)}
              placeholder="Toyota Hiace"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {errors.vehicle_type && <p className="text-red-500 text-sm">{errors.vehicle_type}</p>}
          </div>
        </div>

        <div className="mb-3 w-full">
          <label htmlFor="capacity" className="mb-3 block text-base font-medium text-[#07074D]">Capacity</label>
          <input
            type="text"
            name="capacity"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="47.52698"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-8 text-center text-base font-semibold text-white rounded-md bg-gradient-to-r from-[#6A64F1] to-[#4C3CC3] hover:from-[#4C3CC3] hover:to-[#6A64F1] focus:outline-none shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl"
            disabled={Object.keys(errors).length > 0 || isLoading} // Disable submit button if there are validation errors or loading
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateVehicles;
