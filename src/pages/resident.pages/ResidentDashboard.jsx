import React, { useEffect, useState } from "react";
import {
  User,
  Bell,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  MapPin,
  Mail,
  Phone,
  Edit2,
  Save,
  Calendar,
  Trash2,
  Package,
  DollarSign,
  Truck,
} from "lucide-react";
import RequestsTab from "../../components/resident.component/request.component";
import axios from "axios";

const residentData = {
  name: "John Anderson",
  email: "john.anderson@email.com",
  phone: "+1 (555) 123-4567",
  address: {
    unit: "Apt 302",
    street: "456 Oak Avenue",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
};

const notificationsData = [
  {
    id: 1,
    title: "Collection Scheduled",
    message: "Your waste collection is scheduled for tomorrow at 8:00 AM",
    date: "2024-10-16",
    unread: true,
    type: "collection",
  },
  {
    id: 2,
    title: "Payment Confirmation",
    message: "Your October service payment has been received",
    date: "2024-10-15",
    unread: false,
    type: "payment",
  },
  {
    id: 3,
    title: "Service Update",
    message: "Holiday schedule changes - Please check the calendar",
    date: "2024-10-14",
    unread: true,
    type: "update",
  },
];

const requestsData = [
  {
    id: 1,
    type: "Bulk Collection",
    subject: "Large furniture disposal",
    status: "Scheduled",
    date: "2024-10-18",
  },
  {
    id: 2,
    type: "Missed Collection",
    subject: "Missed pickup on Oct 10",
    status: "Resolved",
    date: "2024-10-10",
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
            <p className="text-xs text-gray-500">Resident Portal</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-900">
              {residentData.name}
            </p>
            <p className="text-xs text-gray-500">Resident</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center font-semibold text-white shadow-md">
            {residentData.name
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
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "requests", label: "Service Requests", icon: FileText },
    { id: "payments", label: "Payments", icon: CreditCard },
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
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 w-64 z-40 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${activeTab === item.id
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

const DashboardTab = ({ residentData, notificationsData }) => {
  const [activeCollections, setActiveCollections] = useState([]);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [balance, setBalance] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(true);

  useEffect(() => {
    fetchActiveCollections();
    fetchBalance();
  }, []);

  const fetchActiveCollections = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/collections/status/active', {
        credentials: 'include'
      });

      if (res.status === 204) {
        setActiveCollections([]);
      } else if (res.ok) {
        const data = await res.json();
        setActiveCollections(data || []);
      }
    } catch (error) {
      console.error("Error fetching active collections:", error);
    } finally {
      setLoadingCollections(false);
    }
  };

  const fetchBalance = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/payments/balance', {
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        setBalance(data);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoadingBalance(false);
    }
  };

  const formatWasteType = (type) => {
    return type?.replace(/_/g, ' ')?.toLowerCase()?.replace(/\b\w/g, c => c.toUpperCase());
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'text-blue-600 bg-blue-50';
      case 'ASSIGNED':
        return 'text-yellow-600 bg-yellow-50';
      case 'EN_ROUTE':
        return 'text-emerald-600 bg-emerald-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'Scheduled';
      case 'ASSIGNED':
        return 'Assigned';
      case 'EN_ROUTE':
        return 'En Route';
      default:
        return status;
    }
  };

  const formatScheduledDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    if (isToday) {
      return { day: 'Today', time };
    } else if (isTomorrow) {
      return { day: 'Tomorrow', time };
    } else {
      return {
        day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time
      };
    }
  };

  const nextCollection = activeCollections.length > 0
    ? activeCollections.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))[0]
    : null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">
          Welcome back, {residentData?.name?.split(" ")[0] || "Resident"}!
        </h2>
        <p className="text-emerald-50 text-lg">Your waste management overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Collection Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          {loadingCollections ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-500 text-sm">Loading...</p>
            </div>
          ) : nextCollection ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(nextCollection.status)}`}>
                  {getStatusText(nextCollection.status)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Next Collection</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatScheduledDate(nextCollection.scheduledDate).day}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {formatScheduledDate(nextCollection.scheduledDate).time} - {formatWasteType(nextCollection.wasteType)}
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Next Collection</p>
              <p className="text-2xl font-bold text-gray-900">None Scheduled</p>
              <p className="text-sm text-gray-500 mt-1">No active collections</p>
            </>
          )}
        </div>

        {/* Total Collections Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Active Collections</p>
          <p className="text-2xl font-bold text-gray-900">{activeCollections.length}</p>
          <p className="text-sm text-gray-500 mt-1">Scheduled pickups</p>
        </div>

        {/* Current Balance Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          {loadingBalance ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-500 text-sm">Loading...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${balance?.totalOutstanding > 0
                  ? 'text-red-600 bg-red-50'
                  : 'text-green-600 bg-green-50'
                  }`}>
                  {balance?.totalOutstanding > 0 ? 'Pending' : 'Paid'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Current Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                Rs. {balance?.totalOutstanding?.toFixed(2) || '0.00'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {balance?.unpaidRequests?.length > 0
                  ? `${balance.unpaidRequests.length} unpaid request${balance.unpaidRequests.length > 1 ? 's' : ''}`
                  : 'All payments up to date'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* All Active Collections */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Active Collections</h3>
          <span className="text-sm text-gray-500">{activeCollections.length} scheduled</span>
        </div>

        {loadingCollections ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500 text-sm">Loading collections...</p>
          </div>
        ) : activeCollections.length > 0 ? (
          <div className="space-y-3">
            {activeCollections
              .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
              .map((collection) => (
                <div
                  key={collection.requestId}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Truck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {formatWasteType(collection.wasteType)}
                        </h4>
                        <span className="text-xs text-gray-500">
                          #{collection.requestId}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {formatScheduledDate(collection.scheduledDate).day} at {formatScheduledDate(collection.scheduledDate).time}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(collection.status)}`}>
                    {getStatusText(collection.status)}
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No active collections</p>
            <p className="text-sm text-gray-500 mt-1">Schedule a new collection to get started</p>
          </div>
        )}
      </div>


    </div>
  );
};

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(residentData);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Profile Information
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 shadow-md font-medium"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  alert("Profile updated!");
                }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-md font-medium"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 text-emerald-600" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-6">
          <MapPin className="w-6 h-6 text-emerald-600" />
          Service Address
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Unit Number
            </label>
            <input
              type="text"
              value={formData.address.unit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, unit: e.target.value },
                })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Street
            </label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, street: e.target.value },
                })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              City
            </label>
            <input
              type="text"
              value={formData.address.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, city: e.target.value },
                })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              State
            </label>
            <input
              type="text"
              value={formData.address.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, state: e.target.value },
                })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              ZIP
            </label>
            <input
              type="text"
              value={formData.address.zip}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, zip: e.target.value },
                })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsTab = () => {
  const getIcon = (type) => {
    if (type === "collection")
      return <Trash2 className="w-5 h-5 text-emerald-600" />;
    if (type === "payment")
      return <DollarSign className="w-5 h-5 text-blue-600" />;
    return <Bell className="w-5 h-5 text-purple-600" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
      <div className="space-y-4">
        {notificationsData.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-lg border-l-4 ${n.unread
              ? "bg-emerald-50 border-emerald-500"
              : "bg-gray-50 border-gray-300"
              }`}
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white">{getIcon(n.type)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{n.title}</h3>
                  {n.unread && (
                    <span className="px-2 py-1 bg-emerald-600 text-white text-xs rounded-full font-medium">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{n.message}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {n.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

<RequestsTab />;

const PaymentsTab = () => {
  const [paymentData, setPaymentData] = useState({
    totalOutstanding: 0,
    unpaidRequests: []
  });
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Review, 2: Card Details, 3: Confirm
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [cardErrors, setCardErrors] = useState({});

  const fetchBalance = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/payments/balance', {
        credentials: 'include'
      });
      const data = await res.json();
      setPaymentData({
        totalOutstanding: data.totalOutstanding || 0,
        unpaidRequests: data.unpaidRequests || []
      });
      setError(null);
    } catch (error) {
      console.error("Error fetching payment data:", error);
      setError("Failed to load payment data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cleaned)) {
      return 'Card number must be 16 digits';
    }
    return null;
  };

  const validateCardHolder = (name) => {
    if (!name.trim()) {
      return 'Cardholder name is required';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return 'Only letters and spaces allowed';
    }
    return null;
  };

  const validateExpiryDate = (date) => {
    if (!/^\d{2}\/\d{2}$/.test(date)) {
      return 'Format: MM/YY';
    }
    const [month, year] = date.split('/').map(Number);
    if (month < 1 || month > 12) {
      return 'Invalid month';
    }
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired';
    }
    return null;
  };

  const validateCVV = (cvv) => {
    if (!/^\d{3}$/.test(cvv)) {
      return 'CVV must be 3 digits';
    }
    return null;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    } else if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      formattedValue = formattedValue.slice(0, 5);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    } else if (field === 'cardHolder') {
      formattedValue = value.toUpperCase();
    }

    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));

    // Clear error when user starts typing
    if (cardErrors[field]) {
      setCardErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateAllFields = () => {
    const errors = {
      cardNumber: validateCardNumber(cardDetails.cardNumber),
      cardHolder: validateCardHolder(cardDetails.cardHolder),
      expiryDate: validateExpiryDate(cardDetails.expiryDate),
      cvv: validateCVV(cardDetails.cvv)
    };

    setCardErrors(errors);
    return !Object.values(errors).some(error => error !== null);
  };

  const startPayment = () => {
    if (paymentData.totalOutstanding === 0) {
      setError("No outstanding balance to pay.");
      return;
    }
    setShowPaymentModal(true);
    setPaymentStep(1);
    setCardDetails({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    });
    setCardErrors({});
    setError(null);
  };

  const handleNextStep = () => {
    if (paymentStep === 2) {
      if (validateAllFields()) {
        setPaymentStep(3);
      }
    } else {
      setPaymentStep(paymentStep + 1);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:8080/api/payments/pay', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Payment failed');
      }

      if (result.success) {
        setReceipt(result.data);
        setShowPaymentModal(false);
        setShowReceipt(true);
        await fetchBalance();
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || "Failed to process payment. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentStep(1);
    setCardDetails({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    });
    setCardErrors({});
    setError(null);
  };

  const formatWasteType = (type) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    setReceipt(null);
  };

  const getMaskedCardNumber = () => {
    const cleaned = cardDetails.cardNumber.replace(/\s/g, '');
    return '**** **** **** ' + cleaned.slice(-4);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="text-center py-8">
          <p className="text-gray-500">Loading payment information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Overview</h2>

      {error && !showPaymentModal && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="mb-6 p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg">
        <p className="text-sm text-emerald-50 mb-1">Total Outstanding Balance</p>
        <p className="text-4xl font-bold mb-3">Rs. {paymentData.totalOutstanding.toFixed(2)}</p>
        {paymentData.unpaidRequests.length > 0 && (
          <p className="text-sm text-emerald-50 mb-4">
            {paymentData.unpaidRequests.length} unpaid {paymentData.unpaidRequests.length === 1 ? 'request' : 'requests'}
          </p>
        )}

        {paymentData.totalOutstanding > 0 && (
          <button
            onClick={startPayment}
            className="w-full mt-2 bg-white text-emerald-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-emerald-50 transition-colors"
          >
            Make Payment
          </button>
        )}
      </div>

      {paymentData.unpaidRequests.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Unpaid Requests</h3>
          {paymentData.unpaidRequests.map((request) => (
            <div
              key={request.requestId}
              className="p-4 border border-orange-200 rounded-lg bg-orange-50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">
                  {formatWasteType(request.wasteType)}
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full font-semibold">
                  {request.status}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-1">
                Request ID: #{request.requestId}
              </p>
              <p className="text-gray-700 mb-1">
                Quantity: {request.quantity} items
              </p>
              <p className="text-sm text-gray-600">
                Scheduled: {formatDate(request.scheduledDate)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No unpaid requests at the moment</p>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment History</h3>
        <div className="space-y-4">
          {["October", "September"].map((m, i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">
                  {m} 2024 - Service Fee
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-semibold">
                  Paid
                </span>
              </div>
              <p className="text-gray-700 font-medium">Amount: Rs. 45.00</p>
              <p className="text-sm text-gray-500">
                Paid on: {m === "October" ? "October 1" : "September 1"}, 2024
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Process Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Payment Process</h3>
                <button
                  onClick={closePaymentModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium">Review</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div className={`h-full ${paymentStep >= 2 ? 'bg-emerald-600' : 'bg-gray-200'}`} style={{ width: paymentStep >= 2 ? '100%' : '0%', transition: 'width 0.3s' }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium">Card Details</span>
                </div>
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div className={`h-full ${paymentStep >= 3 ? 'bg-emerald-600' : 'bg-gray-200'}`} style={{ width: paymentStep >= 3 ? '100%' : '0%', transition: 'width 0.3s' }}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 3 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    3
                  </div>
                  <span className="ml-2 text-sm font-medium">Confirm</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Step 1: Review */}
              {paymentStep === 1 && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Review Payment Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="font-bold text-xl text-emerald-600">Rs. {paymentData.totalOutstanding.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-sm text-gray-600 mb-2">Requests to be paid:</p>
                      {paymentData.unpaidRequests.map((req) => (
                        <div key={req.requestId} className="text-sm text-gray-700 mb-1">
                          • Request #{req.requestId} - {formatWasteType(req.wasteType)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Card Details */}
              {paymentStep === 2 && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Enter Card Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardDetails.cardNumber}
                        onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${cardErrors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {cardErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{cardErrors.cardNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardDetails.cardHolder}
                        onChange={(e) => handleCardInputChange('cardHolder', e.target.value)}
                        placeholder="JOHN DOE"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${cardErrors.cardHolder ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {cardErrors.cardHolder && <p className="text-red-500 text-xs mt-1">{cardErrors.cardHolder}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardDetails.expiryDate}
                          onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${cardErrors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {cardErrors.expiryDate && <p className="text-red-500 text-xs mt-1">{cardErrors.expiryDate}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          value={cardDetails.cvv}
                          onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                          placeholder="123"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${cardErrors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {cardErrors.cvv && <p className="text-red-500 text-xs mt-1">{cardErrors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {paymentStep === 3 && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Confirm Payment</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-bold text-emerald-600">Rs. {paymentData.totalOutstanding.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Card</span>
                      <span className="font-mono text-sm">{getMaskedCardNumber()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cardholder</span>
                      <span className="text-sm">{cardDetails.cardHolder}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">Please review all details carefully before confirming your payment.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl flex justify-between">
              <button
                onClick={() => paymentStep === 1 ? closePaymentModal() : setPaymentStep(paymentStep - 1)}
                className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
              >
                {paymentStep === 1 ? 'Cancel' : 'Back'}
              </button>
              {paymentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Processing...' : 'Confirm Payment'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Receipt Modal */}
      {showReceipt && receipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600">Your payment has been processed</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-mono text-sm text-gray-900">{receipt.transactionId}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Amount Paid</span>
                <span className="font-bold text-green-600 text-lg">Rs. {receipt.amountPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Payment Date</span>
                <span className="text-gray-900">{formatDate(receipt.paymentDate)}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Resident</span>
                <span className="text-gray-900">{receipt.residentName}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Paid Requests</span>
                <span className="text-gray-900 text-right">
                  {receipt.paidRequestIds.map((id, index) => (
                    <span key={id}>
                      #{id}{index < receipt.paidRequestIds.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            <button
              onClick={closeReceipt}
              className="w-full bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SettingsTab = () => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
    <div className="space-y-6">
      <div>
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
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-3">
          {["Collection reminders", "Service updates", "Payment reminders"].map(
            (l, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={i < 2}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span className="text-gray-700 font-medium">{l}</span>
              </label>
            )
          )}
        </div>
      </div>
    </div>
  </div>
);

const ResidentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "profile":
        return <ProfileTab />;
      case "notifications":
        return <NotificationsTab />;
      case "requests":
        return <RequestsTab />;
      case "payments":
        return <PaymentsTab />;
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

export default ResidentDashboard;
