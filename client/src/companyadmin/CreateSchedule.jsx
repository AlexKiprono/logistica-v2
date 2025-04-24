import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CompanyAdminContext } from "../context/CompanyAdminContext";
import { AuthContext } from "../context/AuthContext";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useParams } from "react-router-dom";
import moment from "moment";
import ConfirmDeleteModal from "./confirmDelete";

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
    update_schedule,
  } = useContext(CompanyAdminContext);

  const [selectedRoute, setSelectedRoute] = useState(route || null);
  const [date, setDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [ticket_price, setTicketPrice] = useState("");
  const [driver_id, setDriverId] = useState("");
  const [errors, setErrors] = useState([]);
  const [driverSchedules, setDriverSchedules] = useState([]);
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const route_id = selectedRoute?.id || id;
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const currentDate = new Date();
    setDate(currentDate.toISOString().split("T")[0]);
    currentDate.setHours(currentDate.getHours() + 1);
    const formattedStartTime = currentDate.toTimeString().substring(0, 5);
    setStartTime(formattedStartTime);
  }, []);

  useEffect(() => {
    if (access_token) drivers_with_vehicles();
    if (routeId && access_token) all_schedules_route(routeId);
  }, [access_token, routeId]);

  useEffect(() => {
    if (schedules_route) setDriverSchedules(schedules_route);
  }, [schedules_route]);

  useEffect(() => {
    if (editingScheduleId) {
      const scheduleToEdit = schedules_route.find(
        (s) => s.id === editingScheduleId
      );
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
    if (!date) newErrors.date = "Date is required";
    if (!start_time) newErrors.start_time = "Start Time is required";
    if (!end_time) newErrors.end_time = "End Time is required";
    if (!ticket_price) newErrors.ticket_price = "Ticket Price is required";
    if (!driver_id) newErrors.driver_id = "Driver is required";
    if (start_time >= end_time)
      newErrors.time = "End time must be after start time";
    const driverConflict = driverSchedules.some((s) => {
      const start = new Date(`${date}T${s.start_time}`);
      const end = new Date(`${date}T${s.end_time}`);
      const selectedStart = new Date(`${date}T${start_time}`);
      const selectedEnd = new Date(`${date}T${end_time}`);
      return selectedStart < end && selectedEnd > start;
    });
    if (driverConflict)
      newErrors.driver_schedule =
        "The driver is already scheduled during this time.";
    return newErrors;
  };

  const isValidDate = (current) => current.isAfter(moment().startOf("day"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);
    if (!route_id) return toast.error("Route ID missing");
    try {
      editingScheduleId
        ? await update_schedule(
            editingScheduleId,
            route_id,
            date,
            start_time,
            end_time,
            ticket_price,
            driver_id
          )
        : await create_schedule(
            route_id,
            date,
            start_time,
            end_time,
            ticket_price,
            driver_id
          );
      toast.success(
        `Schedule ${editingScheduleId ? "updated" : "created"} successfully`
      );
      setDate("");
      setStartTime("");
      setEndTime("");
      setTicketPrice("");
      setDriverId("");
      setEditingScheduleId(null);
    } catch (error) {
      toast.error("Error saving schedule");
      setError(error);
    }
  };

  const handleDeleteSchedule = (id) => {
    setScheduleToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    await delete_schedule(scheduleToDelete);
    setSchedulesRoute(schedules_route.filter((s) => s.id !== scheduleToDelete));
    setModalOpen(false);
    setScheduleToDelete(null);
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setScheduleToDelete(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white w-full max-w-6xl h-[85%] rounded-xl shadow-xl p-8 overflow-hidden flex flex-col gap-4">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedRoute
              ? `${selectedRoute.departure_county_name} → ${selectedRoute.arrival_county_name}`
              : "Loading..."}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 rounded-xl p-4 space-y-4 border"
          >
            <h3 className="text-lg font-semibold">
              {editingScheduleId ? "Edit Schedule" : "Create New Schedule"}
            </h3>
            <div>
              <label className="text-sm font-medium">Date</label>
              <DateTime
                value={date}
                onChange={(date) => setDate(date.format("YYYY-MM-DD"))}
                isValidDate={isValidDate}
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                inputProps={{ className: "w-full rounded border px-3 py-2" }}
              />
              {errors.date && (
                <p className="text-red-500 text-xs">{errors.date}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Departure Time</label>
              <DateTime
                value={start_time}
                onChange={(time) => setStartTime(time.format("HH:mm"))}
                dateFormat={false}
                timeFormat="HH:mm"
                inputProps={{ className: "w-full rounded border px-3 py-2" }}
              />
              {errors.start_time && (
                <p className="text-red-500 text-xs">{errors.start_time}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Arrival Time</label>
              <DateTime
                value={end_time}
                onChange={(time) => setEndTime(time.format("HH:mm"))}
                dateFormat={false}
                timeFormat="HH:mm"
                inputProps={{ className: "w-full rounded border px-3 py-2" }}
              />
              {errors.end_time && (
                <p className="text-red-500 text-xs">{errors.end_time}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Ticket Price</label>
              <input
                type="text"
                value={ticket_price}
                onChange={(e) => setTicketPrice(e.target.value)}
                className="w-full rounded border px-3 py-2"
                placeholder="e.g. 2000"
              />
              {errors.ticket_price && (
                <p className="text-red-500 text-xs">{errors.ticket_price}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Driver</label>
              <select
                value={driver_id}
                onChange={(e) => setDriverId(e.target.value)}
                className="w-full rounded border px-3 py-2"
              >
                <option value="">Select a driver</option>
                {driversWithVehicles.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.first_name} {driver.last_name} (
                    {driver.assigned_vehicle})
                  </option>
                ))}
              </select>
              {errors.driver_id && (
                <p className="text-red-500 text-xs">{errors.driver_id}</p>
              )}
              {errors.driver_schedule && (
                <p className="text-red-500 text-xs">{errors.driver_schedule}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingScheduleId
                ? "Update Schedule"
                : "Create Schedule"}
            </button>
          </form>

          <div className="lg:col-span-2 bg-white rounded-xl border p-4 overflow-auto">
            <h3 className="text-xl font-semibold mb-4">Schedules</h3>
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Date</th>
                  <th className="p-2">Start</th>
                  <th className="p-2">End</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Driver</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {schedules_route.map((schedule) => (
                  <tr key={schedule.id} className="border-t">
                    <td className="p-2">{schedule.date}</td>
                    <td className="p-2">{schedule.start_time}</td>
                    <td className="p-2">{schedule.end_time}</td>
                    <td className="p-2">KES {schedule.ticket_price}</td>
                    <td className="p-2">{schedule.driver_name}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => setEditingScheduleId(schedule.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <ConfirmDeleteModal
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            title="Are you sure you want to delete this schedule?"
          />
        )}
      </div>
    </div>
  );
}

export default CreateSchedule;
