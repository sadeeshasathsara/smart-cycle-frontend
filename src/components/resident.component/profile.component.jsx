import React, { useState } from "react";
import { Edit2, Save, User, Mail, Phone, MapPin } from "lucide-react";

const ProfileTab = ({ residentData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(residentData);

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Profile Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Profile Information
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <User className="w-4 h-4" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Address Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-6">
          <MapPin className="w-6 h-6 text-blue-600" />
          Address Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700 mb-2 block">
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
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Street Address
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
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
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
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
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
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              ZIP Code
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
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
