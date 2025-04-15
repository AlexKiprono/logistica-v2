import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CompanyAdminContext } from '../context/CompanyAdminContext'; 
import { AuthContext } from '../context/AuthContext';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import ConfirmDeleteModal from './confirmDelete';  

function CreateSchedule({ routeId, route, onClose }) {
    const { id } = useParams();
    const {
        setDriversWithVehicles, 
        driversWithVehicles, 
        setError, 
        setLoading, 
        loading,
        drivers_with_vehicles, 
        error,
        schedules_route,
        setSchedulesRoute,
        all_schedules_route,
        create_schedule,
        delete_schedule,
        update_schedule
    } = useContext(CompanyAdminContext); 
    
    const [selectedRoute, setSelectedRoute] = useState(route || null);
    const [date, setDate] = useState('');
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');
    const [ticket_price, setTicketPrice] = useState('');
    const [driver_id, setDriverId] = useState('');
    const [errors, setErrors] = useState([]);
    const [driverSchedules, setDriverSchedules] = useState([]); // Store driver schedules for conflict check
    const [editingScheduleId, setEditingScheduleId] = useState(null);

    const [isModalOpen, setModalOpen] = useState(false);
    const [scheduleToDelete, setScheduleToDelete] = useState(null);

    const route_id = selectedRoute?.id || id;
    const access_token = localStorage.getItem("access_token");

    // Set current date and one hour later for start time
    useEffect(() => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        
        // Set the date to today's date
        setDate(currentDate.toISOString().split('T')[0]);

        // Set the start time to 1 hour from now
        currentDate.setHours(currentHour + 1);
        currentDate.setMinutes(currentMinute); // Keep the current minute

        // Format the time as HH:mm
        const formattedStartTime = currentDate.toTimeString().substring(0, 5);
        setStartTime(formattedStartTime);
    }, []);

    // Handle Date
    const handleDateChange = (date) => {
        setDate(date.format('YYYY-MM-DD')); 
    };

    const handleStartTimeChange = (time) => {
        setStartTime(time.format('HH:mm')); 
    };
    
    const handleEndTimeChange = (time) => {
        setEndTime(time.format('HH:mm'));
    };

    useEffect(() => {
        if (access_token) {
            drivers_with_vehicles();
        }
    }, []); 
    
    useEffect(() => {
        if (routeId && access_token) {
            all_schedules_route(routeId);
        }
    }, []); 

    useEffect(() => {
        // Store the fetched schedules for the driver conflict check
        if (schedules_route) {
            setDriverSchedules(schedules_route);
        }
    }, []);

    // Update existing schedule logic
    useEffect(() => {
        if (editingScheduleId) {
            const scheduleToEdit = schedules_route.find(schedule => schedule.id === editingScheduleId);
            if (scheduleToEdit) {
                setDate(scheduleToEdit.date);
                setStartTime(scheduleToEdit.start_time);
                setEndTime(scheduleToEdit.end_time);
                setTicketPrice(scheduleToEdit.ticket_price);
                setDriverId(scheduleToEdit.driver_id);
            }
        }
    }, [editingScheduleId, schedules_route]);

    const validateForm = () => {
        const newErrors = {};
        if (!date) newErrors.date = 'Date is required';
        if (!start_time) newErrors.start_time = 'Start Time is required';
        if (!end_time) newErrors.end_time = 'End Time is required';
        if (!ticket_price) newErrors.ticket_price = 'Ticket Price is required';
        if (!driver_id) newErrors.driver_id = 'Driver is required';
        if (start_time >= end_time) newErrors.time = 'End time must be after start time';

        // Check for driver schedule conflict
        const driverScheduleConflict = driverSchedules.some((schedule) => {
            const scheduleStart = new Date(`${date}T${schedule.start_time}`);
            const scheduleEnd = new Date(`${date}T${schedule.end_time}`);
            const selectedStart = new Date(`${date}T${start_time}`);
            const selectedEnd = new Date(`${date}T${end_time}`);
            
            return (selectedStart < scheduleEnd && selectedEnd > scheduleStart); // Check overlap
        });

        if (driverScheduleConflict) {
            newErrors.driver_schedule = 'The driver is already scheduled during this time.';
            toast.error('Conflict detected: The driver is already scheduled during this time.');
        }

        return newErrors;
    };

    // Disable past dates including yesterday
    const isValidDate = (current) => {
        // Ensure `current` is a valid moment object
        return current.isAfter(moment().startOf('day'));
    };

    // Handle schedule creation
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!route_id) {
            toast.error('Route ID is missing. Please select a route.');
            return;
        }

        try {
            if (editingScheduleId) {
                await update_schedule(editingScheduleId, route_id, date, start_time, end_time, ticket_price, driver_id);
                toast.success('Schedule updated successfully!');
            } else {
                await create_schedule(route_id, date, start_time, end_time, ticket_price, driver_id);
                toast.success('Schedule added successfully!');
            }

            // Clear the form
            setDate('');
            setStartTime('');
            setEndTime('');
            setTicketPrice('');
            setDriverId('');
            setEditingScheduleId(null);
        } catch (error) {
            toast.error('Error saving schedule');
            setError(error);
        }
    };

    const handleDeleteSchedule = (id) => {
        setScheduleToDelete(id);
        setModalOpen(true);
      };

    const confirmDelete = async () => {
        await delete_schedule(scheduleToDelete);
        const updatedSchedules = schedules_route.filter(schedule => schedule.schedule && schedule.schedule.id !== scheduleToDelete);
        setSchedulesRoute(updatedSchedules);
        setModalOpen(false);
        setScheduleToDelete(null);
    };
    
      const cancelDelete = () => {
        setModalOpen(false);
        setScheduleToDelete(null);
      };
    

    
    return (
        <div>
            <div className="fixed inset-0 bg-gray-100 bg-opacity-20 border flex items-center justify-center z-50 backdrop-blur-md">
                <div className="bg-white border border-indigo-200 w-full max-w-7xl h-[70%] mx-auto rounded-xl p-12 shadow-xl transition-all">
                    <div className="header bg-white h-16 px-10 py-4 border-b-2 border-gray-200 flex items-center justify-between rounded-t-xl">
                        <h3 className="text-3xl font-bold text-dark-800">
                            {selectedRoute ? `${selectedRoute.departure_county_name} -- ${selectedRoute.arrival_county_name}` : "Loading Route..."}
                        </h3>
                        <p
                        className="rounded-full p-1 border text-dark hover:text-red-500 cursor-pointer"
                        onClick={onClose}
                        >
                        <svg
                            className="w-6 h-6 text-dark"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18 17.94 6M18 18 6.06 6"
                            />
                        </svg>
                        </p>



                    </div>

                    <div className="header my-4 h-14 px-10 flex items-center justify-between">
                        <h1 className="font-semibold text-xl text-dark-700">
                            {editingScheduleId ? 'Edit Schedule' : 'Add Schedule'}
                        </h1>
                    </div>

                    <div className="flex flex-col mx-3 mt-3 lg:flex-row">
                        <div className="w-full lg:w-1/3 rounded-l border border-indigo-200 m-1">
                            <form onSubmit={handleSubmit} className="w-full bg-white shadow-lg p-8 rounded-l">
                                {/* Date Input */}
                                <div className="w-full px-1 mb-2">
                                    <label className="block uppercase text-gray-700 text-sm font-semibold mb-2" htmlFor="date">Date</label>
                                    <DateTime
                                    id= "date"
                                    value={date}
                                    onChange={handleDateChange}
                                    isValidDate={isValidDate}
                                    dateFormat="YYYY-MM-DD"
                                    timeFormat={false}  // Disable time to just allow date picking
                                    inputProps={{
                                         className: "appearance-none block w-full bg-gray-50 text-gray-900 font-medium border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-dark-500 transition duration-200",
                                    }}
                                    />
                                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                                </div>

                                {/* Start Time Input */}
                                <div className="w-full px-1 mb-2">
                                <label className="block uppercase text-gray-700 text-sm font-semibold mb-2" htmlFor="start_time">Departure Time</label>
                                <DateTime
                                id= "start_time"
                                value={start_time}
                                onChange={handleStartTimeChange}
                                dateFormat={false}
                                timeFormat="HH:mm"   // Disable time to just allow date picking
                                inputProps={{
                                    className: "appearance-none block w-full bg-gray-50 text-gray-900 font-medium border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-dark-500 transition duration-200",
                                }}
                                />
                                {errors.start_time && <p className="text-red-500 text-xs mt-1">{errors.start_time}</p>}
                                </div>

                                {/* End Time Input */}
                                <div className="w-full px-1 mb-2">
                                <label className="block uppercase text-gray-700 text-sm font-semibold mb-2" htmlFor="end_time">Arrival Time</label>
                                <DateTime
                                id= "end_time"
                                value={end_time}
                                onChange={handleEndTimeChange}
                                dateFormat={false}  // Disable date picking
                                timeFormat="HH:mm"  // 24-hour format
                                inputProps={{
                                    className: "appearance-none block w-full bg-gray-50 text-gray-900 font-medium border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-dark-500 transition duration-200",
                                }}
                                />
                                {errors.end_time && <p className="text-red-500 text-xs mt-1">{errors.end_time}</p>}
                                </div>


                                {/* Ticket Price Input */}
                                <div className="w-full px-1 mb-2">
                                    <label className="block uppercase text-gray-700 text-sm font-semibold mb-2" htmlFor="ticket_price">Ticket Price</label>
                                    <input
                                        className="appearance-none block w-full bg-gray-50 text-gray-900 font-medium border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-dark-500 transition duration-200"
                                        type="text"
                                        id="ticket_price"
                                        value={ticket_price}
                                        onChange={(e) => setTicketPrice(e.target.value)}
                                        placeholder="2000 KES"
                                        required
                                    />
                                    {errors.ticket_price && <p className="text-red-500 text-xs mt-1">{errors.ticket_price}</p>}
                                </div>

                                {/* Driver Selection */}
                                <div className="w-full px-1 mb-2">
                                    <label className="block uppercase text-gray-700 text-sm font-semibold mb-2" htmlFor="driver_id">Driver</label>
                                    <select
                                        name="driver_id"
                                        value={driver_id}
                                        onChange={(e) => setDriverId(e.target.value)}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">Select Driver</option>
                                        {driversWithVehicles.length > 0 ? (
                                            driversWithVehicles.map(driver => (
                                                <option key={driver.id} value={driver.id}>
                                                    {driver.first_name} {driver.last_name} - {driver.assigned_vehicle}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No drivers with vehicles available</option>
                                        )}
                                    </select>
                                    {errors.driver_id && <p className="text-red-500 text-xs mt-1">{errors.driver_id}</p>}
                                    {errors.driver_schedule && <span className="text-red-500 text-xs mt-1">{errors.driver_schedule}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-dark-600 hover:bg-green-500 hover:text-white rounded-l border border-indigo-200 text-indigo-400 py-2 px-6 rounded-full mt-4 w-full transition duration-200"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving Schedule...' : (editingScheduleId ? 'Update Schedule' : 'Add Schedule')}
                                </button>
                            </form>
                        </div>

                        {/* Schedule Table */}
                        <div className="w-full lg:w-2/3 m-1 bg-white shadow-sm text-sm rounded-l border border-indigo-200">
                            <div className="overflow-x-auto rounded-lg p-5">
                                <h2 className="text-2xl text-dark-700 font-semibold mb-4">Schedule Table</h2>
                                <table className="table-auto min-w-full text-left">
                                    <thead>
                                        <tr>
                                            <th className="border-b py-2 px-4 text-dark-600">Driver</th>
                                            <th className="border-b py-2 px-4 text-dark-600">Date</th>
                                            <th className="border-b py-2 px-4 text-dark-600">Time</th>
                                            <th className="border-b py-2 px-4 text-dark-600">Ticket Price</th>
                                            <th className="border-b py-2 px-4 text-dark-600">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedules_route && schedules_route.length > 0 ? (
                                            schedules_route.map((schedule) => (
                                                <tr key={schedule.id}>
                                                    <td className="border-b py-2 px-4">{schedule.driver_id}</td>
                                                    <td className="border-b py-2 px-4">{schedule.date}</td>
                                                    <td className="border-b py-2 px-4">{schedule.start_time} - {schedule.end_time}</td>
                                                    <td className="border-b py-2 px-4">{schedule.ticket_price} ksh</td>
                                                    <td className="border-b py-2 gap-2 px-4">
                                                        <button
                                                            className="text-blue-500"
                                                            onClick={() => setEditingScheduleId(schedule.id)} // Handle edit
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="text-red-500"
                                                            onClick={() => handleDeleteSchedule(schedule.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-2">No schedules available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

                  {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal 
        isOpen={isModalOpen} 
        onConfirm={confirmDelete} 
        onCancel={cancelDelete}
        scheduleId={scheduleToDelete} 
      />
        </div>
    );
}

export default CreateSchedule;
