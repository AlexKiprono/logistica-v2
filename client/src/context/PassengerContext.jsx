import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

// Create the PassengerContext
export const PassengerContext = createContext();

// Custom hook to use the Passenger context
export const usePassenger = () => {
  const context = useContext(PassengerContext);
  if (context === undefined) {
    throw new Error("usePassenger must be used within a PassengerProvider");
  }
  return context;
};

export const PassengerProvider = ({ children }) => {
  const server_url = "http://127.0.0.1:5000"; // Flask server URL
  const [auth_token, setAuth_token] = useState(() => localStorage.getItem("access_token") || null);
  const [schedules, setAllSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Function to fetch all schedules
  const fetchAllSchedules = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${server_url}/schedules`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.message || "An error occurred while fetching schedules";
        setError(errorMessage);
        return;
      }

      const data = await response.json();
      setAllSchedules(data.schedules || []);
    } catch (err) {
      const errorMessage = err.message || "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to book a ticket
  const bookTicket = async (scheduleId, numberOfSeats, paymentMethod, phoneNumber = "") => {
    setLoadingBooking(true);
    setError(null);
    setSuccessMessage("");

    const bodyData = {
      number_of_seats: numberOfSeats,
      payment_method: paymentMethod, // 'cash' or 'mpesa'
    };

    if (paymentMethod === "mpesa" && phoneNumber) {
      bodyData.phone_number = phoneNumber;
    }

    try {
      const access_token = localStorage.getItem("access_token");

      if (!access_token) {
        toast.info("Login to continue...");
      }

      const response = await fetch(`${server_url}/book_ticket/${scheduleId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "An error occurred while booking the ticket.";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setSuccessMessage(data.message);
        toast.success(data.message);

        // If payment method is M-Pesa, initiate M-Pesa payment
        if (paymentMethod === "mpesa") {
          const ticketIds = data.tickets;
          const totalPrice = data.total_price;
          initiateMpesaPayment(ticketIds, phoneNumber, totalPrice);
        }
      }
    } catch (error) {
      const errorMessage = error.message || "An error occurred while booking the ticket.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingBooking(false);
    }
  };

  // Function to initiate M-Pesa payment
  const initiateMpesaPayment = async (ticketIds, phoneNumber, totalPrice) => {
    try {
      const response = await fetch(`${server_url}/mpesa-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
          phone: phoneNumber,
          ticket_ids: ticketIds,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "M-Pesa payment initiation failed.");
      }

      return data;
    } catch (error) {
      console.error("Error during M-Pesa payment initiation:", error);
      return null; // Payment initiation failed
    }
  };

  const contextData = {
    fetchAllSchedules,
    setAllSchedules,
    schedules,
    loading,
    loadingBooking,
    error,
    successMessage,
    bookTicket,
    initiateMpesaPayment,
  };

  return (
    <PassengerContext.Provider value={contextData}>
      {children}
    </PassengerContext.Provider>
  );
};
