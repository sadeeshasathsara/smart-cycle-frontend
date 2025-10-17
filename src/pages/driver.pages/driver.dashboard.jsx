import React, { useState } from "react";
import {
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  MapPin,
  Navigation,
  CheckCircle,
  Clock,
  Truck,
  Package,
  AlertCircle,
  Play,
  Pause,
  Flag,
  Route,
  Phone,
  MessageSquare,
  Camera,
  FileText,
  ListChecks,
} from "lucide-react";

const driverData = {
  name: "Mike Johnson",
  email: "mike.johnson@wasteflow.com",
  phone: "+1 (555) 987-6543",
  vehicle: "Truck #12",
  license: "CDL-A-123456",
};

const currentRoute = {
  name: "Route A - Downtown",
  totalStops: 180,
  completedStops: 145,
  startTime: "6:00 AM",
  estimatedEnd: "12:30 PM",
  status: "In Progress",
};

const stopsData = [
  {
    id: 1,
    address: "456 Oak Avenue, Apt 302",
    resident: "John Anderson",
    type: "Residential",
    status: "Pending",
    notes: "Leave bins by garage door",
    scheduledTime: "9:30 AM",
  },
  {
    id: 2,
    address: "789 Pine Street, Unit 105",
    resident: "Maria Garcia",
    type: "Residential",
    status: "Pending",
    notes: "Ring doorbell if bins not out",
    scheduledTime: "9:45 AM",
  },
  {
    id: 3,
    address: "123 Maple Drive, Apt 501",
    resident: "David Chen",
    type: "Residential",
    status: "Pending",
    notes: "Bulk item pickup requested",
    scheduledTime: "10:00 AM",
  },
  {
    id: 4,
    address: "321 Elm Street",
    resident: "Sarah Williams",
    type: "Residential",
    status: "Completed",
    notes: "",
    scheduledTime: "9:15 AM",
  },
  {
    id: 5,
    address: "555 Cedar Road",
    resident: "Tom Brown",
    type: "Residential",
    status: "Completed",
    notes: "",
    scheduledTime: "9:00 AM",
  },
];

const issuesData = [
  {
    id: 1,
    type: "Missed Bin",
    address: "234 Willow Lane",
    time: "8:45 AM",
    status: "Reported",
  },
  {
    id: 2,
    type: "Blocked Access",
    address: "567 Birch Avenue",
    time: "8:20 AM",
    status: "Resolved",
  },
];

const Navbar = ({ toggleSidebar }) => (
  <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-50">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg shadow-md">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">WasteFlow</h1>
            <p className="text-xs text-gray-500">Driver Portal</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-900">
              {driverData.name}
            </p>
            <p className="text-xs text-gray-500">{driverData.vehicle}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center font-semibold text-white shadow-md">
            {driverData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const Sidebar = ({ activeTab, setActiveTab, isOpen, closeSidebar }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "route", label: "Today's Route", icon: Route },
    { id: "stops", label: "Stop List", icon: ListChecks },
    { id: "issues", label: "Report Issue", icon: AlertCircle },
    { id: "history", label: "History", icon: Clock },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeSidebar}
        ></div>
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 w-64 z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 lg:hidden border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button onClick={closeSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="px-4 py-6">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    closeSidebar();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

const DashboardTab = () => {
  const progress = (currentRoute.completedStops / currentRoute.totalStops) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">
          Good morning, {driverData.name.split(" ")[0]}!
        </h2>
        <p className="text-emerald-50 text-lg">Ready for today's route</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {currentRoute.name}
          </h3>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-full font-semibold">
            {currentRoute.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <p className="text-sm font-semibold text-gray-700">Completed</p>
            </div>
            <p className="text-3xl font-bold text-emerald-600">
              {currentRoute.completedStops}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              of {currentRoute.totalStops} stops
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-semibold text-gray-700">Time</p>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {currentRoute.startTime}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Est. finish: {currentRoute.estimatedEnd}
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-purple-600" />
              <p className="text-sm font-semibold text-gray-700">Remaining</p>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {currentRoute.totalStops - currentRoute.completedStops}
            </p>
            <p className="text-sm text-gray-600 mt-1">stops to complete</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-700">
              Route Progress
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {Math.round(progress)}%
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 shadow-md font-semibold flex items-center justify-center gap-2">
            <Navigation className="w-5 h-5" />
            Start Navigation
          </button>
          <button className="px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold flex items-center justify-center gap-2">
            <Pause className="w-5 h-5" />
            Take Break
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Next Stops</h3>
        <div className="space-y-3">
          {stopsData.filter(s => s.status === "Pending").slice(0, 3).map((stop, index) => (
            <div
              key={stop.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {stop.resident}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {stop.address}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {stop.scheduledTime}
                </span>
              </div>
              {stop.notes && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-gray-700">
                  <span className="font-medium">Note:</span> {stop.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow text-left">
          <div className="bg-blue-100 p-3 rounded-lg w-fit mb-3">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <p className="font-semibold text-gray-900">Contact Dispatch</p>
          <p className="text-sm text-gray-600 mt-1">Get help or support</p>
        </button>

        <button className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow text-left">
          <div className="bg-red-100 p-3 rounded-lg w-fit mb-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <p className="font-semibold text-gray-900">Report Issue</p>
          <p className="text-sm text-gray-600 mt-1">Document problems</p>
        </button>

        <button className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow text-left">
          <div className="bg-purple-100 p-3 rounded-lg w-fit mb-3">
            <Camera className="w-6 h-6 text-purple-600" />
          </div>
          <p className="font-semibold text-gray-900">Take Photo</p>
          <p className="text-sm text-gray-600 mt-1">Document collection</p>
        </button>
      </div>
    </div>
  );
};

const RouteTab = () => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Route Map</h2>
      <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 shadow-md font-medium flex items-center gap-2">
        <Navigation className="w-4 h-4" />
        Open in Maps
      </button>
    </div>

    <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
      <div className="text-center">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 font-medium">Interactive Map View</p>
        <p className="text-sm text-gray-400">Route visualization would appear here</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
        <p className="text-sm font-semibold text-gray-700 mb-1">Total Distance</p>
        <p className="text-2xl font-bold text-emerald-600">47.3 miles</p>
      </div>
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm font-semibold text-gray-700 mb-1">Est. Duration</p>
        <p className="text-2xl font-bold text-blue-600">6.5 hours</p>
      </div>
    </div>
  </div>
);

const StopsTab = () => {
  const [selectedStop, setSelectedStop] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">All Stops</h2>
      <div className="space-y-3">
        {stopsData.map((stop, index) => (
          <div
            key={stop.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              stop.status === "Completed"
                ? "bg-green-50 border-green-200"
                : "bg-white border-gray-200 hover:border-emerald-400 hover:shadow-md"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  stop.status === "Completed"
                    ? "bg-green-600 text-white"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{stop.resident}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {stop.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        stop.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {stop.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-2">
                      {stop.scheduledTime}
                    </p>
                  </div>
                </div>
                {stop.notes && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-gray-700">
                    <span className="font-medium">Note:</span> {stop.notes}
                  </div>
                )}
                {stop.status === "Pending" && (
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Complete Stop
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm">
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IssuesTab = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Report Issue</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 shadow-md font-medium"
          >
            {showForm ? "View Reports" : "+ New Report"}
          </button>
        </div>

        {showForm ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Issue Type
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                <option>Missed Bin</option>
                <option>Blocked Access</option>
                <option>Hazardous Material</option>
                <option>Vehicle Issue</option>
                <option>Safety Concern</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Location/Address
              </label>
              <input
                type="text"
                placeholder="Enter address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Description
              </label>
              <textarea
                rows="4"
                placeholder="Describe the issue in detail..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Photo Evidence
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 cursor-pointer">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">
                  Tap to take photo or upload
                </p>
                <p className="text-sm text-gray-500 mt-1">Optional but recommended</p>
              </div>
            </div>
            <button className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold shadow-md">
              Submit Report
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {issuesData.map((issue) => (
              <div
                key={issue.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{issue.type}</p>
                      <p className="text-sm text-gray-600">{issue.address}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      issue.status === "Resolved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{issue.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const HistoryTab = () => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Collection History</h2>
    <div className="space-y-4">
      {["October 16, 2024", "October 15, 2024", "October 14, 2024"].map(
        (date, i) => (
          <div
            key={i}
            className="p-5 border border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900">Route A - Downtown</p>
                <p className="text-sm text-gray-600">{date}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-semibold">
                Completed
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Stops</p>
                <p className="font-semibold text-gray-900">180/180</p>
              </div>
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-semibold text-gray-900">6.2 hrs</p>
              </div>
              <div>
                <p className="text-gray-600">Distance</p>
                <p className="font-semibold text-gray-900">47.3 mi</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  </div>
);

const ProfileTab = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Driver Information
      </h2>
      <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center font-bold text-white text-3xl shadow-lg">
          {driverData.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{driverData.name}</h3>
          <p className="text-gray-600">{driverData.vehicle}</p>
          <p className="text-sm text-gray-500 mt-1">License: {driverData.license}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Email
          </label>
          <input
            type="email"
            value={driverData.email}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Phone
          </label>
          <input
            type="tel"
            value={driverData.phone}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Routes Completed
          </p>
          <p className="text-3xl font-bold text-emerald-600">247</p>
          <p className="text-sm text-gray-600 mt-1">This year</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            On-Time Rate
          </p>
          <p className="text-3xl font-bold text-blue-600">98.5%</p>
          <p className="text-sm text-gray-600 mt-1">Excellent performance</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Total Distance
          </p>
          <p className="text-3xl font-bold text-purple-600">11,682</p>
          <p className="text-sm text-gray-600 mt-1">Miles driven</p>
        </div>
      </div>
    </div>
  </div>
);

const SettingsTab = () => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-3">
          {[
            "Route updates",
            "New stop assignments",
            "Dispatch messages",
            "Schedule changes",
          ].map((label, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={true}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span className="text-gray-700 font-medium">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Navigation Preferences
        </h3>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Preferred Map App
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
            <option>Google Maps</option>
            <option>Apple Maps</option>
            <option>Waze</option>
          </select>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          {["Current Password", "New Password", "Confirm Password"].map(
            (l, i) => (
              <div key={i}>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  {l}
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )
          )}
          <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold shadow-md">
            Update Password
          </button>
        </div>
      </div>
    </div>
  </div>
);

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "route":
        return <RouteTab />;
      case "stops":
        return <StopsTab />;
      case "issues":
        return <IssuesTab />;
      case "history":
        return <HistoryTab />;
      case "profile":
        return <ProfileTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default DriverDashboard;