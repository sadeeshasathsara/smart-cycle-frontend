import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestsTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    wasteType: "",
    quantity: "",
    preferredPickupDate: "",
  });

  const baseURL = "http://localhost:8080";

  // Fetch existing pickup requests for the logged-in resident
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/api/collections/my-requests`, {
          withCredentials: true,
        });

        // ✅ CORRECTED: Backend returns array directly
        if (Array.isArray(response.data)) {
          setRequests(response.data);
        } else {
          console.warn("Unexpected response format:", response.data);
          setRequests([]);
        }
      } catch (error) {
        console.error("Failed to fetch pickup requests:", error);
        alert("Failed to load your requests. Please try again.");
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new request
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.wasteType || !formData.quantity || !formData.preferredPickupDate) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);

      const response = await axios.post(
        `${baseURL}/api/collections/request-pickup`,
        {
          wasteType: formData.wasteType,
          quantity: parseFloat(formData.quantity),
          preferredPickupDate: formData.preferredPickupDate,
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // ✅ CORRECTED: Handle 201 Created response
      if (response.status === 201) {
        // Refresh the requests list to include the new one
        const updatedResponse = await axios.get(`${baseURL}/api/collections/my-requests`, {
          withCredentials: true,
        });
        
        if (Array.isArray(updatedResponse.data)) {
          setRequests(updatedResponse.data);
        }
        
        setShowForm(false);
        setFormData({ wasteType: "", quantity: "", preferredPickupDate: "" });
        alert("Pickup request scheduled successfully!");
      }
    } catch (error) {
      console.error("Error submitting pickup request:", error);
      
      // ✅ CORRECTED: Handle specific error cases
      if (error.response?.status === 400) {
        if (error.response.data?.includes("slot") || error.response.data?.includes("available")) {
          alert("No available slots for the selected time. Please choose a different date/time.");
        } else {
          alert("Invalid request data. Please check your inputs.");
        }
      } else {
        alert("Failed to schedule pickup. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Cancel a request
  const handleCancel = async (requestId) => {
    if (!window.confirm("Are you sure you want to cancel this pickup request?")) {
      return;
    }

    try {
      // ✅ CORRECT: Using PATCH /cancel endpoint
      const response = await axios.patch(
        `${baseURL}/api/collections/${requestId}/cancel`, 
        {}, 
        { withCredentials: true }
      );

      // ✅ CORRECTED: Handle successful cancellation (200 OK)
      if (response.status === 200) {
        // Update the local state to reflect cancellation
        setRequests(requests.map(req => 
          req.requestId === requestId 
            ? { ...req, status: "CANCELLED" }
            : req
        ));
        alert("Request cancelled successfully!");
      }
    } catch (error) {
      console.error("Failed to cancel pickup request:", error);
      
      // ✅ CORRECTED: Handle specific error cases
      if (error.response?.status === 400) {
        alert("This request can no longer be cancelled as it's already being processed.");
      } else if (error.response?.status === 404) {
        alert("Request not found or you don't have permission to cancel it.");
      } else {
        alert("Failed to cancel request. Please try again.");
      }
    }
  };

  // Helper function to determine if a request can be cancelled
  const canCancelRequest = (request) => {
    // According to API, only requests with status SCHEDULED can be cancelled
    return request.status === "SCHEDULED";
  };

  // Format status display with appropriate colors
  const getStatusDisplay = (status) => {
    const statusConfig = {
      SCHEDULED: { color: "bg-blue-100 text-blue-800", text: "Scheduled" },
      ASSIGNED: { color: "bg-yellow-100 text-yellow-800", text: "Assigned" },
      EN_ROUTE: { color: "bg-purple-100 text-purple-800", text: "En Route" },
      COMPLETED: { color: "bg-green-100 text-green-800", text: "Completed" },
      CANCELLED: { color: "bg-red-100 text-red-800", text: "Cancelled" },
      PENDING: { color: "bg-gray-100 text-gray-800", text: "Pending" },
    };
    
    const config = statusConfig[status] || statusConfig.PENDING;
    return (
      <span className={`px-3 py-1 ${config.color} text-sm rounded-full font-medium`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="space-y-6 relative">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            My Pickup Requests
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            disabled={loading}
          >
            + Request Pickup
          </button>
        </div>

        {loading ? (
          <p className="text-center text-slate-500 animate-pulse">
            Loading your requests...
          </p>
        ) : requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.requestId}
                className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                    {request.wasteType?.replace(/_/g, ' ') || "Unknown Type"}
                  </span>
                  <span className="text-sm text-slate-500">
                    {request.scheduledDate ? new Date(request.scheduledDate).toLocaleString() : "Date not set"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-700 font-medium">
                      Quantity: {request.quantity}
                    </p>
                    {/* ✅ Only show fee if it exists in response */}
                    {request.estimatedFee && (
                      <p className="text-slate-600 text-sm">
                        Fee: Rs.{request.estimatedFee.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusDisplay(request.status)}
                    {/* ✅ Only show cancel button for cancellable requests */}
                    {canCancelRequest(request) && (
                      <button
                        onClick={() => handleCancel(request.requestId)}
                        className="text-red-500 hover:text-red-700 font-medium disabled:text-gray-400"
                        disabled={submitting}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">
            No pickup requests found.
          </p>
        )}
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-fadeIn">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Request Waste Pickup
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Waste Type *
                </label>
                <select
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Waste Type</option>
                  <option value="BULK_ITEMS">Bulk Items</option>
                  <option value="RECYCLABLE">Recyclable</option>
                  <option value="HOUSEHOLD_WASTE">Household Waste</option>
                  <option value="ORGANIC_WASTE">Organic Waste</option>
                  <option value="E_WASTE">E-Waste</option>
                  <option value="HAZARDOUS">Hazardous</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="0.1"
                  step="0.1"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter quantity"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Preferred Pickup Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="preferredPickupDate"
                  value={formData.preferredPickupDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsTab;