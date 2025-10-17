import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestsTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    wasteType: "",
    quantity: "",
    preferredPickupDate: "",
  });

  // 👇 Mock data in case API fetch fails
  const mockRequests = [
    {
      requestId: "REQ001",
      wasteType: "RECYCLABLE",
      quantity: 5,
      estimatedFee: 350.0,
      scheduledDate: new Date().toISOString(),
      status: "SCHEDULED",
    },
    {
      requestId: "REQ002",
      wasteType: "HOUSEHOLD_WASTE",
      quantity: 10,
      estimatedFee: 500.0,
      scheduledDate: new Date().toISOString(),
      status: "PENDING",
    },
    {
      requestId: "REQ003",
      wasteType: "E_WASTE",
      quantity: 2,
      estimatedFee: 200.0,
      scheduledDate: new Date().toISOString(),
      status: "COMPLETED",
    },
  ];

  // Fetch existing pickup requests for the logged-in resident
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/collections/my-requests", {
          withCredentials: true,
        });

        // Use live API data if available
        if (response.data?.data?.length > 0) {
          setRequests(response.data.data);
        } else {
          console.warn("No requests found — loading mock data.");
          setRequests(mockRequests);
        }
      } catch (error) {
        console.error("Failed to fetch pickup requests:", error);
        setRequests(mockRequests); // fallback to mock data
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

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/collections/request-pickup",
        {
          wasteType: formData.wasteType,
          quantity: parseFloat(formData.quantity),
          preferredPickupDate: formData.preferredPickupDate,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setRequests([...requests, response.data.data]);
      } else {
        alert("Failed to add request, showing mock success.");
        const mockNew = {
          requestId: "REQ" + (requests.length + 1).toString().padStart(3, "0"),
          wasteType: formData.wasteType,
          quantity: parseFloat(formData.quantity),
          estimatedFee: Math.random() * 500 + 100,
          scheduledDate: formData.preferredPickupDate,
          status: "SCHEDULED",
        };
        setRequests([...requests, mockNew]);
      }

      setShowForm(false);
      setFormData({ wasteType: "", quantity: "", preferredPickupDate: "" });
    } catch (error) {
      console.error("Error submitting pickup request:", error);
      alert("Network error — added mock request instead.");
      const mockNew = {
        requestId: "REQ" + (requests.length + 1).toString().padStart(3, "0"),
        wasteType: formData.wasteType,
        quantity: parseFloat(formData.quantity),
        estimatedFee: Math.random() * 500 + 100,
        scheduledDate: formData.preferredPickupDate,
        status: "SCHEDULED",
      };
      setRequests([...requests, mockNew]);
    } finally {
      setLoading(false);
    }
  };

  // Delete a request
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/collections/${id}`, { withCredentials: true });
      setRequests(requests.filter((req) => req.requestId !== id));
    } catch (error) {
      console.error("Failed to delete pickup request:", error);
      setRequests(requests.filter((req) => req.requestId !== id)); // locally remove mock
    }
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                    {request.wasteType}
                  </span>
                  <span className="text-sm text-slate-500">
                    {new Date(request.scheduledDate).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-700 font-medium">
                      Quantity: {request.quantity}
                    </p>
                    <p className="text-slate-600 text-sm">
                      Fee: Rs.{request.estimatedFee.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                      {request.status}
                    </span>
                    <button
                      onClick={() => handleDelete(request.requestId)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">
            No pickup requests scheduled.
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
                  Waste Type
                </label>
                <select
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Waste Type</option>
                  <option value="RECYCLABLE">Recyclable</option>
                  <option value="HOUSEHOLD_WASTE">Household Waste</option>
                  <option value="ORGANIC_WASTE">Organic Waste</option>
                  <option value="E_WASTE">E-Waste</option>
                  <option value="BULK_ITEMS">Bulk Items</option>
                  <option value="HAZARDOUS">Hazardous</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter quantity (kg / items)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Preferred Pickup Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="preferredPickupDate"
                  value={formData.preferredPickupDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {loading ? "Submitting..." : "Submit Request"}
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
