import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { ParcelContext } from "../context/ParcelContext";

function SendParcel() {
  const {
    fetchCompanies,
    fetchCounties,
    fetchStations,
    companies,
    counties,
    stations,
  } = useContext(ParcelContext);

  const [loading, setLoading] = useState(false);
  const [parcelData, setParcelData] = useState({
    company_id: "",
    county_id: "",
    pickup_station_id: "",
    dropoff_station_id: "",
    sender_name: "",
    receiver_name: "",
    receiver_phone: "",
    weight: "",
    delivery_fee: "",
    payment_amount: "",
  });

  const auth_token = localStorage.getItem("access_token");
  const server_url = "127.0.0.1:5000";

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    fetchCounties();
  }, []);

  useEffect(() => {
    fetchStations();
  }, []);

  const handleCompanyChange = (e) => {
    const selectedCompanyId = e.target.value;
    setParcelData((prev) => ({
      ...prev,
      company_id: selectedCompanyId,
      county_id: "",
      pickup_station_id: "",
      dropoff_station_id: "",
    }));
    if (selectedCompanyId) {
      fetchCounties(selectedCompanyId);
    }
  };

  const handleCountyChange = (e) => {
    const selectedCountyId = e.target.value;
    setParcelData((prev) => ({
      ...prev,
      county_id: selectedCountyId,
      pickup_station_id: "",
      dropoff_station_id: "",
    }));
    if (parcelData.company_id && selectedCountyId) {
      fetchStations(parcelData.company_id, selectedCountyId);
    }
  };

  const handleChange = (e) => {
    setParcelData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://${server_url}/sendparcel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify(parcelData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Parcel sent successfully!");
        setParcelData({
          company_id: "",
          county_id: "",
          pickup_station_id: "",
          dropoff_station_id: "",
          sender_name: "",
          receiver_name: "",
          receiver_phone: "",
          weight: "",
          delivery_fee: "",
          payment_amount: "",
        });
      } else {
        toast.error(result.error || "Failed to send parcel");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className=" transition-colors duration-300 min-h-screen py-10">
      <div className="container mx-auto p-4">
        <div className="bg-white border border-indigo-200 shadow rounded-lg p-6">
          <h1 className="text-xl font-semibold mb-4 text-gray-900 ">
            📦 Send a Parcel
          </h1>
          <p className="text-gray-600 dark:text-gray-700 mb-6">
            Fill the form below to send a parcel.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select
                name="company_id"
                value={parcelData.company_id}
                onChange={handleCompanyChange}
                required
                className="border hover:border-indigo-200 p-2 rounded w-full"
              >
                <option value="">-- Select Company --</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                name="county_id"
                value={parcelData.county_id}
                onChange={handleCountyChange}
                required
                className="border hover:border-indigo-200 p-2 rounded w-full"
              >
                <option value="">-- Select County --</option>
                {counties.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select
                name="pickup_station_id"
                value={parcelData.pickup_station_id}
                onChange={handleChange}
                required
                className="border hover:border-indigo-200 p-2 rounded w-full"
              >
                <option value="">-- Select Pickup Station --</option>
                {stations.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <select
                name="dropoff_station_id"
                value={parcelData.dropoff_station_id}
                onChange={handleChange}
                required
                className="border hover:border-indigo-200 p-2 rounded w-full"
              >
                <option value="">-- Select Dropoff Station --</option>
                {stations.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="sender_name"
                placeholder="Sender Name"
                value={parcelData.sender_name}
                onChange={handleChange}
                required
                className="border hover:border-indigo-200 p-2 rounded w-full"
              />
              <input
                type="text"
                name="receiver_name"
                placeholder="Receiver Name"
                value={parcelData.receiver_name}
                onChange={handleChange}
                required
                className="border hover:border-indigo-200 p-2 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="receiver_phone"
                placeholder="Receiver Phone"
                value={parcelData.receiver_phone}
                onChange={handleChange}
                required
                className="border hover:border-indigo-200 p-2 rounded w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit Parcel"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendParcel;
