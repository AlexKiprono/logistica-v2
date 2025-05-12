import React, { useState, useEffect, useContext, useCallback } from "react";
import { FaSpinner } from "react-icons/fa";
import { PassengerContext } from "../context/PassengerContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Schedules() {
  const navigate = useNavigate();
  const location = useLocation();

  const { schedules, loading, fetchAllSchedules, bookTicket, loadingBooking } =
    useContext(PassengerContext);

  const { currentUser, fetchCurrentUser } = useContext(AuthContext);

  const [searchDeparture, setSearchDeparture] = useState("");
  const [searchArrival, setSearchArrival] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userLoading, setUserLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      await fetchCurrentUser();
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setUserLoading(false);
    }
  }, [fetchCurrentUser]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchAllSchedules();
  }, []);

  useEffect(() => {
    if (selectedSchedule) {
      setTotalPrice(numberOfSeats * selectedSchedule.ticket_price);
    }
  }, [numberOfSeats, selectedSchedule]);

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.route_departure
        .toLowerCase()
        .includes(searchDeparture.toLowerCase()) &&
      schedule.route_arrival.toLowerCase().includes(searchArrival.toLowerCase())
  );

  const handleBooking = async () => {
    if (!currentUser) {
      localStorage.setItem("redirect_after_login", location.pathname);
      toast.info("You need to log in to book a ticket!");
      navigate("/auth/login");
      return;
    }

    try {
      await bookTicket(
        selectedSchedule.id,
        numberOfSeats,
        paymentMethod,
        phoneNumber
      );
      toast.success("Ticket booked successfully!");
      setShowModal(false);

      if (paymentMethod === "mpesa") {
        console.log(
          `Simulating MPesa payment for ${totalPrice} to ${phoneNumber}`
        );
      }
    } catch (error) {
      toast.error("Failed to book ticket. Please try again.");
    }
  };

  const handleOpenModal = (schedule) => {
    setSelectedSchedule(schedule);
    setNumberOfSeats(1);
    setTotalPrice(schedule.ticket_price);
    setPaymentMethod("cash");
    setPhoneNumber("");
    setShowModal(true);
  };

  if (loading || userLoading || loadingBooking) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <FaSpinner className="animate-spin text-5xl text-teal-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        🗓️ Available Schedules
      </h1>

      {/* Search Inputs */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search Departure"
          value={searchDeparture}
          onChange={(e) => setSearchDeparture(e.target.value)}
          className="flex-grow md:flex-none md:w-1/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
        <input
          type="text"
          placeholder="Search Arrival"
          value={searchArrival}
          onChange={(e) => setSearchArrival(e.target.value)}
          className="flex-grow md:flex-none md:w-1/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {/* Schedule Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg p-4 flex flex-col justify-between border border-gray-200 transition-transform hover:scale-[1.02]"
            >
              <div>
                <h2 className="text-lg font-semibold flex justify-between items-center mb-2">
                  🚐 {schedule.company_name}
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {schedule.vehicle_info.license_plate}
                  </span>
                </h2>
                <div className="border-t border-dashed my-2"></div>
                <div className="text-gray-700">
                  <p>
                    📍 {schedule.route_departure} → {schedule.route_arrival}
                  </p>
                  <p className="text-sm mt-1">
                    🕗 {schedule.start_time} → {schedule.end_time} | ⏱{" "}
                    {schedule.duration_hours}
                  </p>
                </div>
                <div className="border-t border-dashed my-2"></div>
                <div className="text-gray-700 text-sm">
                  <p>💺 Seats: {schedule.vehicle_info.capacity}</p>
                  <p>💸 Kes {schedule.ticket_price}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    🚗 {schedule.vehicle_info.vehicle_type} —{" "}
                    {schedule.driver_name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleOpenModal(schedule)}
                className="mt-4 w-full bg-teal-600 text-white rounded-lg py-2 hover:bg-teal-700 transition"
              >
                🔖 Book Ticket
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No schedules match your search.
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showModal && selectedSchedule && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-4 relative">
            <h2 className="text-2xl font-bold text-teal-700 text-center">
              🎟️ Book Your Ticket
            </h2>
            <div className="text-center text-gray-600">
              <p>
                <strong>{selectedSchedule.route_departure}</strong> →{" "}
                <strong>{selectedSchedule.route_arrival}</strong>
              </p>
              <p className="text-sm mt-1">
                {selectedSchedule.start_time} - {selectedSchedule.end_time}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Number of Seats
              </label>
              <input
                type="number"
                min="1"
                max={selectedSchedule.vehicle_info.capacity}
                value={numberOfSeats}
                onChange={(e) =>
                  setNumberOfSeats(
                    Math.min(
                      Number(e.target.value),
                      selectedSchedule.vehicle_info.capacity
                    )
                  )
                }
                className="w-full border rounded-lg p-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Payment Method
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="mr-2"
                  />
                  💵 Cash
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="mpesa"
                    checked={paymentMethod === "mpesa"}
                    onChange={() => setPaymentMethod("mpesa")}
                    className="mr-2"
                  />
                  📱 Mpesa
                </label>
              </div>
            </div>

            {paymentMethod === "mpesa" && (
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="px-6 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedules;
