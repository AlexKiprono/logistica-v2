import React, { useState } from "react";

function SendParcel() {
  const [parcelData, setParcelData] = useState({
    senderName: "",
    receiverName: "",
    pickupLocation: "",
    destination: "",
    parcelDetails: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setParcelData({ ...parcelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parcel Info:", parcelData);
    // Send to backend here
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📦 Send a Parcel
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {[
          "senderName",
          "receiverName",
          "pickupLocation",
          "destination",
          "contactNumber",
        ].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              name={field}
              value={parcelData[field]}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
              required
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parcel Details
          </label>
          <textarea
            name="parcelDetails"
            value={parcelData.parcelDetails}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          Submit Parcel
        </button>
      </form>
    </div>
  );
}

export default SendParcel;
