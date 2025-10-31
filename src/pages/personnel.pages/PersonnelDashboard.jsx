import React, { useEffect, useState } from "react";
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
  Trash2,
  Weight,
  QrCode,
} from "lucide-react";
import ScheduleManagement from "../ScheduleManagement";

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
                    ${activeTab === item.id
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
const BASE_URL = 'http://localhost:8080'; // Update with your actual API URL

const ScheduleTab = () => {
  const [schedules, setSchedules] = useState([]);
  const [pickupRequests, setPickupRequests] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startingRoute, setStartingRoute] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [binTagId, setBinTagId] = useState('');
  const [actualWeight, setActualWeight] = useState('');
  const [completingPickup, setCompletingPickup] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  useEffect(() => {
    if (selectedSchedule) {
      fetchPickupRequests(selectedSchedule.id);
    }
  }, [selectedSchedule]);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/schedules`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch schedules');
      }

      const data = await response.json();
      setSchedules(data.data || data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching schedules:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPickupRequests = async (scheduleId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/schedules/${scheduleId}/requests`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pickup requests');
      }

      const data = await response.json();
      setPickupRequests(data.data || data);
    } catch (err) {
      console.error('Error fetching pickup requests:', err);
    }
  };

  const handleStartRoute = async (scheduleId) => {
    try {
      setStartingRoute(scheduleId);
      const response = await fetch(`${BASE_URL}/api/schedules/${scheduleId}/start`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to start route');
      }

      const result = await response.json();

      setSchedules(prevSchedules =>
        prevSchedules.map(schedule =>
          schedule.id === scheduleId
            ? { ...schedule, status: result.data.newStatus }
            : schedule
        )
      );

      alert(`Route started! ${result.data.updatedRequestsCount} requests are now EN_ROUTE.`);

      // Refresh pickup requests if this schedule is selected
      if (selectedSchedule?.id === scheduleId) {
        fetchPickupRequests(scheduleId);
      }
    } catch (err) {
      alert(`Error starting route: ${err.message}`);
      console.error('Error starting route:', err);
    } finally {
      setStartingRoute(null);
    }
  };

  const handleCompletePickup = async () => {
    if (!binTagId.trim()) {
      alert('Please enter a bin tag ID');
      return;
    }

    try {
      setCompletingPickup(true);
      const requestBody = {
        binTagId: binTagId.trim()
      };

      if (actualWeight) {
        requestBody.actualWeight = parseFloat(actualWeight);
      }

      const response = await fetch(`${BASE_URL}/api/collections/${selectedRequest.requestId}/complete`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to complete pickup');
      }

      const result = await response.json();

      setPickupRequests(prevRequests =>
        prevRequests.map(req =>
          req.requestId === selectedRequest.requestId
            ? { ...req, status: 'COMPLETED' }
            : req
        )
      );

      alert(`Pickup completed successfully! ${result.data?.quantity || actualWeight || 'N/A'} kg collected.`);
      closeCompleteModal();
    } catch (err) {
      alert(`Error completing pickup: ${err.message}`);
      console.error('Error completing pickup:', err);
    } finally {
      setCompletingPickup(false);
    }
  };

  const openCompleteModal = (request) => {
    setSelectedRequest(request);
    setShowCompleteModal(true);
    setBinTagId('');
    setActualWeight(request.quantity?.toString() || '');
  };

  const closeCompleteModal = () => {
    setShowCompleteModal(false);
    setSelectedRequest(null);
    setBinTagId('');
    setActualWeight('');
  };

  const formatWasteType = (type) => {
    return type?.replace(/_/g, ' ')?.toLowerCase()?.replace(/\b\w/g, c => c.toUpperCase());
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      const now = new Date();
      return {
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        display: 'Today'
      };
    }

    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      display: isToday ? 'Today' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800";
      case "ASSIGNED":
        return "bg-purple-100 text-purple-800";
      case "IN_PROGRESS":
      case "EN_ROUTE":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDisplay = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "Pending";
      case "SCHEDULED":
        return "Scheduled";
      case "ASSIGNED":
        return "Assigned";
      case "IN_PROGRESS":
        return "In Progress";
      case "EN_ROUTE":
        return "En Route";
      case "COMPLETED":
        return "Completed";
      default:
        return status;
    }
  };

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesFilter = filter === "all" ||
      schedule.status?.toLowerCase() === filter.toLowerCase();

    const matchesSearch = searchTerm === "" ||
      schedule.area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.route?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: schedules.length,
    completed: schedules.filter(s => s.status === "COMPLETED").length,
    inProgress: schedules.filter(s => s.status === "IN_PROGRESS").length,
    pending: schedules.filter(s => s.status === "PENDING").length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading schedules...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="font-semibold text-red-800">Error Loading Schedules</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
        <button
          onClick={fetchSchedules}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (selectedSchedule) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <button
            onClick={() => {
              setSelectedSchedule(null);
              setPickupRequests([]);
            }}
            className="mb-4 px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
          >
            ← Back to Schedules
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedSchedule.area || selectedSchedule.route || `Schedule #${selectedSchedule.id}`}
            </h2>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedSchedule.status)}`}>
                {getStatusDisplay(selectedSchedule.status)}
              </span>
              {pickupRequests.length > 0 && (
                <span className="text-sm text-gray-600">
                  {pickupRequests.length} pickup{pickupRequests.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {pickupRequests.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No pickup requests found</p>
              </div>
            ) : (
              pickupRequests.map((request) => {
                const dateInfo = formatDate(request.scheduledDate);
                return (
                  <div
                    key={request.requestId}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {getStatusDisplay(request.status)}
                          </span>
                          <span className="text-sm font-semibold text-purple-600">
                            {formatWasteType(request.wasteType)}
                          </span>
                          <span className="text-xs text-gray-500">
                            #{request.requestId}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          {request.residentName || `Request #${request.requestId}`}
                        </h3>
                        {request.address && (
                          <p className="text-gray-600 flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4" />
                            {request.address}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                          {request.quantity && (
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Weight className="w-4 h-4" />
                              Estimated: {request.quantity} kg
                            </p>
                          )}
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {dateInfo.display} at {dateInfo.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    {request.status === "ASSIGNED" && (
                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        <div className="flex-1 px-4 py-2 bg-purple-50 text-purple-800 rounded-lg text-center font-medium text-sm">
                          Waiting for route to start
                        </div>
                      </div>
                    )}

                    {request.status === "EN_ROUTE" && (
                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        <button
                          onClick={() => openCompleteModal(request)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Complete Pickup
                        </button>
                      </div>
                    )}

                    {request.status === "COMPLETED" && (
                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        <div className="flex-1 px-4 py-2 bg-green-50 text-green-800 rounded-lg text-center font-medium flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {showCompleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Complete Pickup</h3>
                <button
                  onClick={closeCompleteModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bin Tag ID *
                  </label>
                  <div className="relative">
                    <QrCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      value={binTagId}
                      onChange={(e) => setBinTagId(e.target.value)}
                      placeholder="Scan or enter bin tag ID"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actual Weight (kg)
                  </label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={actualWeight}
                      onChange={(e) => setActualWeight(e.target.value)}
                      placeholder="Optional"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Request ID:</span> #{selectedRequest?.requestId}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Waste Type:</span> {formatWasteType(selectedRequest?.wasteType) || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Estimated Weight:</span> {selectedRequest?.quantity || 'N/A'} kg
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeCompleteModal}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCompletePickup}
                    disabled={completingPickup}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {completingPickup ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        Completing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Complete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Schedules</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <Package className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-blue-600">{stats.pending}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Trash2 className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by area or route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={fetchSchedules}
            className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Refresh
          </button>
        </div>

        {filteredSchedules.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No schedules found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          schedule.status
                        )}`}
                      >
                        {getStatusDisplay(schedule.status)}
                      </span>
                      {schedule.routeNumber && (
                        <span className="text-sm font-semibold text-gray-700">
                          Route #{schedule.routeNumber}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {schedule.area || schedule.route || `Schedule #${schedule.id}`}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      {schedule.description || 'Collection route'}
                    </p>
                    {schedule.scheduledDate && (
                      <p className="text-sm text-gray-500 mt-1">
                        Scheduled: {new Date(schedule.scheduledDate).toLocaleDateString()} at {new Date(schedule.scheduledDate).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  {schedule.status === "PENDING" && (
                    <button
                      onClick={() => handleStartRoute(schedule.id)}
                      disabled={startingRoute === schedule.id}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {startingRoute === schedule.id ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          Starting...
                        </>
                      ) : (
                        <>
                          <Truck className="w-4 h-4" />
                          Start Route
                        </>
                      )}
                    </button>
                  )}
                  {schedule.status === "IN_PROGRESS" && (
                    <button
                      onClick={() => setSelectedSchedule(schedule)}
                      className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                    >
                      View Pickups
                    </button>
                  )}
                  {schedule.status === "COMPLETED" && (
                    <div className="flex-1 px-4 py-2 bg-green-50 text-green-800 rounded-lg text-center font-medium flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedSchedule(schedule)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Routes Tab Component
const RoutesTab = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Route Map</h2>

      <ScheduleManagement />
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
                className={`px-3 py-1 rounded-full text-sm font-medium ${request.priority === "High"
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
