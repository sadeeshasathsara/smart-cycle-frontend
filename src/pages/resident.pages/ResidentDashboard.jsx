import React, { useState } from "react";
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
} from "lucide-react";

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

const DashboardTab = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-2">
        Welcome back, {residentData.name.split(" ")[0]}!
      </h2>
      <p className="text-emerald-50 text-lg">Your waste management overview</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-emerald-100 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-emerald-600" />
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Active
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-1">Next Collection</p>
        <p className="text-2xl font-bold text-gray-900">Tomorrow</p>
        <p className="text-sm text-gray-500 mt-1">8:00 AM - General Waste</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
          <Package className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-gray-600 text-sm mb-1">Total Requests</p>
        <p className="text-2xl font-bold text-gray-900">8</p>
        <p className="text-sm text-gray-500 mt-1">2 pending, 6 completed</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
            Paid
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-1">Current Balance</p>
        <p className="text-2xl font-bold text-gray-900">$0.00</p>
        <p className="text-sm text-gray-500 mt-1">All payments up to date</p>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {notificationsData.slice(0, 3).map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Bell className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{n.title}</h4>
              <p className="text-sm text-gray-600">{n.message}</p>
              <p className="text-xs text-gray-500 mt-2">{n.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

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
            className={`p-4 rounded-lg border-l-4 ${
              n.unread
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

const RequestsTab = () => {
  const [showForm, setShowForm] = useState(false);
  const getColor = (s) => {
    if (s === "Scheduled") return "bg-blue-100 text-blue-800";
    if (s === "Resolved") return "bg-green-100 text-green-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Service Requests</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 shadow-md font-medium"
        >
          {showForm ? "View Requests" : "+ New Request"}
        </button>
      </div>
      {showForm ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Type
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option>Bulk Collection</option>
              <option>Missed Collection</option>
              <option>Special Pickup</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Subject
            </label>
            <input
              type="text"
              placeholder="Brief description"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Details"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>
          <button className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold shadow-md">
            Submit
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {requestsData.map((r) => (
            <div
              key={r.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full font-semibold">
                  {r.type}
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-semibold ${getColor(
                    r.status
                  )}`}
                >
                  {r.status}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{r.subject}</h3>
              <p className="text-sm text-gray-500">Submitted: {r.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PaymentsTab = () => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
    <div className="mb-6 p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg">
      <p className="text-sm text-emerald-50 mb-1">Current Balance</p>
      <p className="text-4xl font-bold mb-3">$0.00</p>
      <p className="text-sm text-emerald-50">
        Next payment due: November 1, 2024
      </p>
    </div>
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
          <p className="text-gray-700 font-medium">Amount: $45.00</p>
          <p className="text-sm text-gray-500">
            Paid on: {m === "October" ? "October 1" : "September 1"}, 2024
          </p>
        </div>
      ))}
    </div>
  </div>
);

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
