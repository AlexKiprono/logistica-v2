import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

// Create the ParcelContext
export const ParcelContext = createContext();

export const ParcelProvider = ({ children }) => {
  const server_url = "http://127.0.0.1:5000"; // Flask server URL
  const [auth_token, setAuth_token] = useState(
    () => localStorage.getItem("access_token") || null
  );
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [counties, setCounties] = useState([]);
  const [stations, setStations] = useState([]);
  const [parcelData, setParcelData] = useState({});

  // Function to fetch all companies
  const fetchCompanies = async () => {
    try {
      const res = await fetch(`${server_url}/companies`);
      const companies = await res.json();
      setCompanies(companies);
    } catch (error) {
      // toast.error("Failed to load companies");
    }
  };

  // Function to fetch all counties for a specific company
  const fetchCounties = async (companyId) => {
    try {
      const res = await fetch(`${server_url}/companies/${companyId}/counties`);
      const counties = await res.json();
      setCounties(counties);
    } catch (error) {
      // toast.error("Failed to load counties");
    }
  };

  // Function to fetch all stations for a specific company and county
  const fetchStations = async (companyId, countyId) => {
    try {
      const res = await fetch(
        `${server_url}/companies/${companyId}/counties/${countyId}/stations`
      );
      const stations = await res.json();
      setStations(stations);
    } catch (error) {
      // toast.error("Failed to load stations");
    }
  };

  const SendParcel = async (parcelData, auth_token) => {
    try {
      const response = await fetch(`${server_url}/sendparcel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify(parcelData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.error || "An error occurred while sending the parcel.";
        toast.error(errorMessage);
        return null;
      } else {
        toast.success(data.message);
        return data;
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
      return null;
    }
  };

  const contextData = {
    fetchCompanies,
    fetchCounties,
    fetchStations,
    companies,
    counties,
    stations,
    parcelData,
    setParcelData,
    setLoading,
    loading,
    SendParcel,
    auth_token, // include auth_token for easy access
    setAuth_token, // include setAuth_token to update it in the context
  };

  return (
    <ParcelContext.Provider value={contextData}>
      {children}
    </ParcelContext.Provider>
  );
};
