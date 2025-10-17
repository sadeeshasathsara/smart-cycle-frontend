import React, { useState } from "react";
import {
  Truck,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  Home,
  List,
  BarChart3,
  User,
  Settings,
  LogOut,
  Navigation,
  Package,
  Filter,
  Search,
  Bell,
} from "lucide-react";

// Mock data
const personnelData = {
  name: "Mike Johnson",
  id: "CP-001",
  vehicle: "Truck #12",
  zone: "Zone A - North District",
};

const scheduleData = [
  {
    id: 1,
    address: "123 Main St, Apt 5B",
    resident: "Sarah Williams",
    phone: "+1 (555) 123-4567",
    timeSlot: "08:00 - 09:00",
    date: "2024-10-18",
    type: "Regular Collection",
    status: "Scheduled",
    priority: "Normal",
    items: ["Recyclables", "General Waste"],
  },
  {
    id: 2,
    address: "456 Oak Ave, Unit 12",
    resident: "John Anderson",
    phone: "+1 (555) 234-5678",
    timeSlot: "09:30 - 10:30",
    date: "2024-10-18",
    type: "Special Request",
    status: "In Progress",
    priority: "High",
    items: ["Bulk Items", "E-Waste"],
  },
  {
    id: 3,
    address: "789 Pine Rd, House",
    resident: "Emily Chen",
    phone: "+1 (555) 345-6789",
    timeSlot: "11:00 - 12:00",
    date: "2024-10-18",
    type: "Regular Collection",
    status: "Scheduled",
    priority: "Normal",
    items: ["General Waste"],
  },
];

const completedCollections = [
  {
    id: 101,
    address: "321 Elm St",
    resident: "David Brown",
    completedAt: "2024-10-17 14:30",
    items: ["Recyclables", "General Waste"],
    notes: "All items collected successfully",
  },
  {
    id: 102,
    address: "654 Maple Dr",
    resident: "Lisa Taylor",
    completedAt: "2024-10-17 13:15",
    items: ["Bulk Items"],
    notes: "Required assistance for heavy items",
  },
];

// Navbar Component
const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gradient-to-r from-green-900 to-green-800 text-white px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AssetPro</h1>
              <p className="text-xs text-green-200">Collection Portal</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-green-700 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">{personnelData.name}</p>
              <p className="text-xs text-green-200">{personnelData.vehicle}</p>
            </div>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-semibold">
              {personnelData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, isOpen, closeSidebar }) => {
  const menuItems = [
    { id: "schedule", label: "Today's Schedule", icon: Calendar },
    { id: "routes", label: "Route Map", icon: Navigation },
    { id: "requests", label: "All Requests", icon: List },
    { id: "completed", label: "Completed", icon: CheckCircle },
    { id: "statistics", label: "Statistics", icon: BarChart3 },
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
        className={`
        fixed lg:sticky top-0 left-0 h-screen bg-green-900 text-white w-64 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between p-6 lg:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={closeSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="px-4 py-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    closeSidebar();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${
                      activeTab === item.id
                        ? "bg-green-600 text-white shadow-lg"
                        : "text-green-100 hover:bg-green-800"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-8">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-green-800 rounded-lg transition-all">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

// Schedule Tab Component
const ScheduleTab = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState("all");

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Normal":
        return "text-blue-600";
      case "Low":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredSchedule =
    filter === "all"
      ? scheduleData
      : scheduleData.filter((item) =>
          item.status.toLowerCase().includes(filter)
        );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Today's Collections</p>
              <p className="text-3xl font-bold text-green-600">12</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-3xl font-bold text-blue-600">7</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Remaining</p>
              <p className="text-3xl font-bold text-yellow-600">5</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by address or resident..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="progress">In Progress</option>
          </select>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedRequest(item)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                    <span
                      className={`text-sm font-semibold ${getPriorityColor(
                        item.priority
                      )}`}
                    >
                      {item.priority} Priority
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.resident}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4" />
                    {item.address}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <Clock className="w-4 h-4" />
                    {item.timeSlot}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {item.items.map((itemName, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {itemName}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-200">
                {item.status === "Scheduled" && (
                  <>
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Start Collection
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      View Map
                    </button>
                  </>
                )}
                {item.status === "In Progress" && (
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Routes Tab Component
const RoutesTab = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Route Map</h2>

      <div className="mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Navigation className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">
              Today's Route - Zone A
            </h3>
          </div>
          <p className="text-gray-700">
            Total Distance: 15.3 km | Estimated Time: 4 hours
          </p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Map View</p>
          <p className="text-sm text-gray-500 mt-2">
            Interactive route map would be displayed here
          </p>
          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Open in Maps
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold text-gray-900">Route Stops</h3>
        {scheduleData.map((stop, idx) => (
          <div
            key={stop.id}
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
          >
            <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
              {idx + 1}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{stop.address}</p>
              <p className="text-sm text-gray-600">{stop.timeSlot}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                stop.status === "Scheduled"
                  ? "bg-blue-100 text-blue-800"
                  : stop.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {stop.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// All Requests Tab Component
const RequestsTab = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Requests</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {scheduleData.map((request) => (
          <div
            key={request.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {request.resident}
                </h3>
                <p className="text-sm text-gray-600">{request.address}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {request.date} | {request.timeSlot}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  request.priority === "High"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {request.priority}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4" />
              <span>{request.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Completed Tab Component
const CompletedTab = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Completed Collections
      </h2>

      <div className="space-y-4">
        {completedCollections.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 bg-green-50"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">
                    {item.resident}
                  </h3>
                </div>
                <p className="text-gray-700">{item.address}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Completed: {item.completedAt}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {item.items.map((itemName, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-gray-200"
                >
                  {itemName}
                </span>
              ))}
            </div>

            {item.notes && (
              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Notes:</span> {item.notes}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Statistics Tab Component
const StatisticsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Performance Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">This Week</p>
            <p className="text-3xl font-bold text-green-600 mb-1">45</p>
            <p className="text-sm text-gray-600">Collections Completed</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">This Month</p>
            <p className="text-3xl font-bold text-blue-600 mb-1">187</p>
            <p className="text-sm text-gray-600">Collections Completed</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Average Time</p>
            <p className="text-3xl font-bold text-purple-600 mb-1">18 min</p>
            <p className="text-sm text-gray-600">Per Collection</p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Efficiency Rate</p>
            <p className="text-3xl font-bold text-yellow-600 mb-1">96%</p>
            <p className="text-sm text-gray-600">On-Time Completion</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Performance Chart</p>
            <p className="text-sm text-gray-500">
              Detailed statistics visualization
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Personnel Profile
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Name
          </label>
          <input
            type="text"
            value={personnelData.name}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Personnel ID
          </label>
          <input
            type="text"
            value={personnelData.id}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Assigned Vehicle
          </label>
          <input
            type="text"
            value={personnelData.vehicle}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Zone Assignment
          </label>
          <input
            type="text"
            value={personnelData.zone}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

// Settings Tab Component
const SettingsTab = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Settings
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-gray-700">New request notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-gray-700">Route updates</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-gray-700">Schedule changes</span>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Change Password
          </h3>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const CollectionPersonnelDashboard = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "schedule":
        return <ScheduleTab />;
      case "routes":
        return <RoutesTab />;
      case "requests":
        return <RequestsTab />;
      case "completed":
        return <CompletedTab />;
      case "statistics":
        return <StatisticsTab />;
      case "profile":
        return <ProfileTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <ScheduleTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default CollectionPersonnelDashboard;
