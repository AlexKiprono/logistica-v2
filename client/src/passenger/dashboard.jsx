import { useState } from "react";
import Schedules from "./Schedules";
import Navbar from "./navbar";
import SendParcel from "./parcelSend";
import TrackParcel from "./parcelTrack";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("schedules");
  const [activeScheduleTab, setActiveScheduleTab] = useState("upcoming");
  const [activeParcelTab, setActiveParcelTab] = useState("send parcel");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const sidebarItems = [
    { label: "📅 Schedules", value: "schedules" },
    { label: "📦 Parcels", value: "parcels" },
    { label: "🕒 Availability", value: "availability" },
    { label: "👥 Teams", value: "teams" },
    { label: "🔌 Integrations", value: "integrations" },
    { label: "⚡ Workflows", value: "workflows" },
  ];

  const scheduleTabs = [
    "upcoming",
    "pending",
    "recurring",
    "past",
    "cancelled",
  ];
  const parcelTabs = [
    "send parcel",
    "track parcel",
    "delivered",
    "returned",
    "cancelled",
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {isSidebarVisible && (
        <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <a
                href="/"
                className="font-black text-2xl text-gray-900 select-none"
              >
                LOGISTICA<span className="text-indigo-600">.</span>
              </a>
              <button
                onClick={() => setIsSidebarVisible(false)}
                className="text-gray-500 hover:text-red-600 text-lg"
                title="Hide Menu"
              >
                ✖
              </button>
            </div>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`w-full text-left p-2 rounded-xl font-medium transition ${
                    activeTab === item.value
                      ? "bg-blue-100 text-blue-600 border border-blue-500"
                      : "hover:border hover:border-blue-600 text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="border-t-2 border-b">
            <Navbar />
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          {!isSidebarVisible && (
            <button
              onClick={() => setIsSidebarVisible(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Show Menu
            </button>
          )}
        </div>

        <h1 className="text-2xl font-bold capitalize mb-4">{activeTab}</h1>

        {activeTab === "schedules" && (
          <>
            <div className="flex gap-3 border-b mb-4">
              {scheduleTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveScheduleTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize ${
                    activeScheduleTab === tab
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div>
              {activeScheduleTab === "upcoming" && <Schedules />}
              {activeScheduleTab === "pending" && (
                <div>Pending bookings here.</div>
              )}
              {activeScheduleTab === "recurring" && (
                <div>Recurring bookings here.</div>
              )}
              {activeScheduleTab === "past" && <div>Past bookings here.</div>}
              {activeScheduleTab === "cancelled" && (
                <div>Cancelled bookings here.</div>
              )}
            </div>
          </>
        )}

        {activeTab === "parcels" && (
          <>
            <div className="flex gap-3 border-b mb-4">
              {parcelTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveParcelTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize ${
                    activeParcelTab === tab
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div>
              {activeParcelTab === "send parcel" && <SendParcel />}
              {activeParcelTab === "track parcel" && <TrackParcel />}
              {activeParcelTab === "delivered" && (
                <div>Delivered parcels here.</div>
              )}
              {activeParcelTab === "returned" && (
                <div>Returned parcels here.</div>
              )}
              {activeParcelTab === "cancelled" && (
                <div>Cancelled parcels here.</div>
              )}
            </div>
          </>
        )}

        {activeTab === "availability" && <div>Set your availability here.</div>}
        {activeTab === "teams" && <div>Manage your teams here.</div>}
        {activeTab === "integrations" && (
          <div>Connect your integrations here.</div>
        )}
        {activeTab === "workflows" && (
          <div>Setup automated workflows here.</div>
        )}
      </div>
    </div>
  );
}
