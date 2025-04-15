import React, { useState } from "react";

function TrackParcel() {
  const [trackingCode, setTrackingCode] = useState("");
  const [parcelStatus, setParcelStatus] = useState(null);

  const handleTrack = () => {
    // Mock fetch
    setParcelStatus({
      status: "In Transit",
      lastLocation: "Nairobi Hub",
      expectedDelivery: "2025-04-15",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📍 Track Your Parcel
      </h2>
      <div className="flex items-center space-x-3 mb-4">
        <input
          type="text"
          placeholder="Enter Tracking Code"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          className="flex-grow rounded-lg border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
        />
        <button
          onClick={handleTrack}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Track
        </button>
      </div>

      {parcelStatus && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-teal-700">Parcel Status</h3>
          <p className="text-gray-700 mt-2">
            Status: <strong>{parcelStatus.status}</strong>
          </p>
          <p className="text-gray-700">
            Last Seen At: <strong>{parcelStatus.lastLocation}</strong>
          </p>
          <p className="text-gray-700">
            Expected Delivery: <strong>{parcelStatus.expectedDelivery}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default TrackParcel;
