import React, { useState } from "react";
import {
  User,
  Bell,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Users,
  Trash2,
  Calendar,
  Package,
  DollarSign,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit2,
  Truck,
} from "lucide-react";

const adminData = {
  name: "Sarah Mitchell",
  email: "sarah.mitchell@wasteflow.com",
  role: "System Administrator",
};

const statsData = [
  {
    label: "Total Residents",
    value: "1,284",
    change: "+12%",
    icon: Users,
    color: "emerald",
  },
  {
    label: "Today's Collections",
    value: "342",
    change: "89% complete",
    icon: Trash2,
    color: "blue",
  },
  {
    label: "Pending Requests",
    value: "28",
    change: "-5 from yesterday",
    icon: FileText,
    color: "yellow",
  },
  {
    label: "Revenue (MTD)",
    value: "$57,780",
    change: "+8.2%",
    icon: DollarSign,
    color: "purple",
  },
];

const residentsData = [
  {
    id: 1,
    name: "John Anderson",
    unit: "Apt 302",
    address: "456 Oak Avenue",
    phone: "+1 (555) 123-4567",
    status: "Active",
    balance: "$0.00",
    lastCollection: "2024-10-16",
  },
  {
    id: 2,
    name: "Maria Garcia",
    unit: "Unit 105",
    address: "789 Pine Street",
    phone: "+1 (555) 234-5678",
    status: "Active",
    balance: "$45.00",
    lastCollection: "2024-10-15",
  },
  {
    id: 3,
    name: "David Chen",
    unit: "Apt 501",
    address: "123 Maple Drive",
    phone: "+1 (555) 345-6789",
    status: "Inactive",
    balance: "$90.00",
    lastCollection: "2024-10-10",
  },
];

const requestsData = [
  {
    id: 1,
    resident: "John Anderson",
    type: "Bulk Collection",
    subject: "Large furniture disposal",
    status: "Pending",
    priority: "High",
    date: "2024-10-16",
  },
  {
    id: 2,
    resident: "Maria Garcia",
    type: "Missed Collection",
    subject: "Missed pickup on Oct 15",
    status: "In Progress",
    priority: "High",
    date: "2024-10-15",
  },
  {
    id: 3,
    resident: "David Chen",
    type: "Special Pickup",
    subject: "Hazardous waste removal",
    status: "Scheduled",
    priority: "Medium",
    date: "2024-10-14",
  },
];

const collectionsData = [
  {
    id: 1,
    route: "Route A - Downtown",
    driver: "Mike Johnson",
    vehicle: "Truck #12",
    status: "In Progress",
    completed: 145,
    total: 180,
    time: "Started 6:00 AM",
  },
  {
    id: 2,
    route: "Route B - Suburbs",
    driver: "Lisa Brown",
    vehicle: "Truck #08",
    status: "Completed",
    completed: 220,
    total: 220,
    time: "Completed 11:30 AM",
  },
  {
    id: 3,
    route: "Route C - Industrial",
    driver: "Tom Davis",
    vehicle: "Truck #15",
    status: "Scheduled",
    completed: 0,
    total: 95,
    time: "Starts 1:00 PM",
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
            <Trash2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">WasteFlow</h1>
            <p className="text-xs text-gray-500">Admin Portal</p>
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
              {adminData.name}
            </p>
            <p className="text-xs text-gray-500">{adminData.role}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center font-semibold text-white shadow-md">
            {adminData.name
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
    { id: "residents", label: "Residents", icon: Users },
    { id: "collections", label: "Collections", icon: Truck },
    { id: "requests", label: "Service Requests", icon: FileText },
    { id: "routes", label: "Routes", icon: MapPin },
    { id: "reports", label: "Reports", icon: TrendingUp },
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
  const getColorClasses = (color) => {
    const colors = {
      emerald: "bg-emerald-100 text-emerald-600",
      blue: "bg-blue-100 text-blue-600",
      yellow: "bg-yellow-100 text-yellow-600",
      purple: "bg-purple-100 text-purple-600",
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">
          Welcome back, {adminData.name.split(" ")[0]}!
        </h2>
        <p className="text-emerald-50 text-lg">System overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
            >
              <div className={`p-3 rounded-lg w-fit mb-4 ${getColorClasses(stat.color)}`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Today's Collections
          </h3>
          <div className="space-y-3">
            {collectionsData.slice(0, 2).map((c) => (
              <div
                key={c.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{c.route}</span>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      c.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : c.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Driver: {c.driver} • {c.vehicle}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{c.time}</span>
                  <span className="font-medium text-gray-700">
                    {c.completed}/{c.total} stops
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Recent Requests
          </h3>
          <div className="space-y-3">
            {requestsData.slice(0, 3).map((r) => (
              <div
                key={r.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    {r.resident}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      r.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : r.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{r.type}</p>
                <p className="text-xs text-gray-500">{r.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResidentsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Residents</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search residents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 shadow-md font-medium flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Resident
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Address
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Balance
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {residentsData.map((resident) => (
              <tr key={resident.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {resident.name}
                    </p>
                    <p className="text-sm text-gray-500">{resident.unit}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {resident.address}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {resident.phone}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      resident.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {resident.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`font-semibold ${
                      resident.balance === "$0.00"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {resident.balance}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CollectionsTab = () => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Today's Collection Routes
      </h2>
      <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 shadow-md font-medium">
        Schedule New Route
      </button>
    </div>

    <div className="space-y-4">
      {collectionsData.map((collection) => (
        <div
          key={collection.id}
          className="p-5 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {collection.route}
                </h3>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    collection.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : collection.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {collection.status}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Driver:</span>{" "}
                  {collection.driver}
                </p>
                <p>
                  <span className="font-medium">Vehicle:</span>{" "}
                  {collection.vehicle}
                </p>
                <p>
                  <span className="font-medium">Progress:</span>{" "}
                  {collection.completed}/{collection.total} stops
                </p>
                <p>
                  <span className="font-medium">Time:</span> {collection.time}
                </p>
              </div>
            </div>
            <div className="lg:w-48">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full"
                  style={{
                    width: `${
                      (collection.completed / collection.total) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-center text-gray-600 font-medium">
                {Math.round((collection.completed / collection.total) * 100)}%
                Complete
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RequestsTab = () => {
  const [filterStatus, setFilterStatus] = useState("All");

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Service Requests</h2>
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Scheduled</option>
            <option>Completed</option>
          </select>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {requestsData.map((request) => (
          <div
            key={request.id}
            className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-gray-50"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {request.resident}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      request.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {request.priority} Priority
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Type:</span> {request.type}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Subject:</span>{" "}
                    {request.subject}
                  </p>
                  <p className="text-gray-500">Submitted: {request.date}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className={`px-4 py-2 text-sm rounded-lg font-semibold text-center ${
                    request.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : request.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {request.status}
                </span>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RoutesTab = () => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Collection Routes</h2>
      <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 shadow-md font-medium flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Create Route
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {["Route A - Downtown", "Route B - Suburbs", "Route C - Industrial"].map(
        (route, i) => (
          <div
            key={i}
            className="p-5 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{route}</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Stops:</span>{" "}
                {[180, 220, 95][i]}
              </p>
              <p>
                <span className="font-medium">Frequency:</span> Mon, Wed, Fri
              </p>
              <p>
                <span className="font-medium">Est. Time:</span>{" "}
                {[5, 6, 4][i]} hours
              </p>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              View Details
            </button>
          </div>
        )
      )}
    </div>
  </div>
);

const ReportsTab = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
          <h3 className="font-semibold text-gray-900 mb-4">
            Collection Efficiency
          </h3>
          <p className="text-4xl font-bold text-emerald-600 mb-2">94.2%</p>
          <p className="text-sm text-gray-600">Average completion rate</p>
        </div>
        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-4">
            Customer Satisfaction
          </h3>
          <p className="text-4xl font-bold text-blue-600 mb-2">4.7/5.0</p>
          <p className="text-sm text-gray-600">Based on 245 reviews</p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Collections</p>
          <p className="text-2xl font-bold text-gray-900">8,547</p>
          <p className="text-sm text-green-600 mt-1">+12% from last month</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Service Requests</p>
          <p className="text-2xl font-bold text-gray-900">342</p>
          <p className="text-sm text-red-600 mt-1">+5% from last month</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Revenue</p>
          <p className="text-2xl font-bold text-gray-900">$57,780</p>
          <p className="text-sm text-green-600 mt-1">+8% from last month</p>
        </div>
      </div>
    </div>
  </div>
);

const SettingsTab = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Collection Schedule
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Residential Collection</p>
                <p className="text-sm text-gray-600">Mon, Wed, Fri - 6:00 AM</p>
              </div>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm">
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Commercial Collection</p>
                <p className="text-sm text-gray-600">Tue, Thu - 5:00 AM</p>
              </div>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm">
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Settings
          </h3>
          <div className="space-y-3">
            {[
              "Email alerts for urgent requests",
              "Daily collection summaries",
              "Payment notifications",
              "System maintenance alerts",
            ].map((label, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={i < 3}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span className="text-gray-700 font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Service Pricing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Residential Monthly Fee
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  defaultValue="45.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Bulk Collection Fee
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  defaultValue="25.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
          <button className="mt-4 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold shadow-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center font-semibold text-white">
              SM
            </div>
            <div>
              <p className="font-semibold text-gray-900">{adminData.name}</p>
              <p className="text-sm text-gray-600">{adminData.email}</p>
              <p className="text-xs text-gray-500">{adminData.role}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full font-semibold">
            Active
          </span>
        </div>
        <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-emerald-500 hover:text-emerald-600 font-medium flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Add Administrator
        </button>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "residents":
        return <ResidentsTab />;
      case "collections":
        return <CollectionsTab />;
      case "requests":
        return <RequestsTab />;
      case "routes":
        return <RoutesTab />;
      case "reports":
        return <ReportsTab />;
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
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;