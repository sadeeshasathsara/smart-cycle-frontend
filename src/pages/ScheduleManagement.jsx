import React, { useState, useEffect } from 'react';
import { Calendar, Truck, User, MapPin, Clock, Plus, List, AlertCircle, CheckCircle, Loader2, Package, FileText, Weight } from 'lucide-react';

const BASE_URL = 'http://localhost:8080';

const WasteTypeLabels = {
    BULK_ITEMS: 'Bulk Items',
    HOUSEHOLD_WASTE: 'Household Waste',
    RECYCLABLE: 'Recyclable',
    ORGANIC_WASTE: 'Organic Waste',
    E_WASTE: 'E-Waste'
};

export default function ScheduleManagement() {
    const [activeTab, setActiveTab] = useState('create');
    const [schedules, setSchedules] = useState([]);
    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        collectionType: 'HOUSEHOLD_WASTE',
        location: '',
        scheduledDateTime: '',
        driverId: '',
        vehicleId: '',
        notes: '',
        bulkSize: '',
        bulkWeight: ''
    });

    useEffect(() => {
        if (activeTab === 'list') {
            fetchSchedules();
        }
    }, [activeTab]);

    const fetchAvailableResources = async () => {
        if (!formData.scheduledDateTime) {
            setError('Please select a date and time first');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `${BASE_URL}/api/resources/available?dateTime=${formData.scheduledDateTime}`,
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch available resources');
            }

            const data = await response.json();
            setAvailableDrivers(data.availableDrivers || []);
            setAvailableVehicles(data.availableVehicles || []);
            setSuccess('Resources loaded successfully');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSchedules = async () => {
        setLoading(true);
        setError('');

        try {
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
            setSchedules(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        const payload = {
            collectionType: formData.collectionType,
            location: formData.location,
            scheduledDateTime: formData.scheduledDateTime,
            driverId: parseInt(formData.driverId),
            vehicleId: parseInt(formData.vehicleId),
            notes: formData.notes || undefined
        };

        if (formData.collectionType === 'BULK_ITEMS') {
            payload.bulkDetails = {
                size: formData.bulkSize,
                estimatedWeightKg: parseFloat(formData.bulkWeight)
            };
        }

        try {
            const response = await fetch(`${BASE_URL}/api/schedules`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create schedule');
            }

            const data = await response.json();
            setSuccess('Schedule created successfully!');

            // Reset all state
            setFormData({
                collectionType: 'HOUSEHOLD_WASTE',
                location: '',
                scheduledDateTime: '',
                driverId: '',
                vehicleId: '',
                notes: '',
                bulkSize: '',
                bulkWeight: ''
            });
            setAvailableDrivers([]);
            setAvailableVehicles([]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            collectionType: 'HOUSEHOLD_WASTE',
            location: '',
            scheduledDateTime: '',
            driverId: '',
            vehicleId: '',
            notes: '',
            bulkSize: '',
            bulkWeight: ''
        });
        setAvailableDrivers([]);
        setAvailableVehicles([]);
        setError('');
        setSuccess('');
    };

    const getStatusColor = (status) => {
        const colors = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            IN_PROGRESS: 'bg-blue-100 text-blue-800',
            COMPLETED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <Calendar className="w-10 h-10" />
                            <h1 className="text-3xl font-bold">Collection Schedule Management</h1>
                        </div>
                        <p className="text-blue-100">Manage waste collection schedules efficiently</p>
                    </div>

                    <div className="flex border-b border-gray-200 bg-gray-50">
                        <button
                            onClick={() => setActiveTab('create')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === 'create'
                                ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Plus className="w-5 h-5" />
                            Create Schedule
                        </button>
                        <button
                            onClick={() => setActiveTab('list')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === 'list'
                                ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <List className="w-5 h-5" />
                            All Schedules
                        </button>
                    </div>

                    <div className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-red-800">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <p className="text-green-800">{success}</p>
                            </div>
                        )}

                        {activeTab === 'create' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Package className="w-4 h-4" />
                                            Collection Type
                                        </label>
                                        <select
                                            value={formData.collectionType}
                                            onChange={(e) => setFormData({ ...formData, collectionType: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            {Object.entries(WasteTypeLabels).map(([key, label]) => (
                                                <option key={key} value={key}>{label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Clock className="w-4 h-4" />
                                            Scheduled Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={formData.scheduledDateTime}
                                            onChange={(e) => setFormData({ ...formData, scheduledDateTime: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4" />
                                        Collection Location
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="Enter full address"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {formData.collectionType === 'BULK_ITEMS' && (
                                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                        <h3 className="font-semibold text-blue-900 mb-4">Bulk Item Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                    Size
                                                </label>
                                                <select
                                                    value={formData.bulkSize}
                                                    onChange={(e) => setFormData({ ...formData, bulkSize: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="">Select size</option>
                                                    <option value="Small">Small</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Large">Large</option>
                                                    <option value="Extra Large">Extra Large</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                    <Weight className="w-4 h-4" />
                                                    Estimated Weight (kg)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={formData.bulkWeight}
                                                    onChange={(e) => setFormData({ ...formData, bulkWeight: e.target.value })}
                                                    placeholder="0"
                                                    min="0"
                                                    step="0.1"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={fetchAvailableResources}
                                        disabled={!formData.scheduledDateTime || loading}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Loading Resources...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                Check Available Resources
                                            </>
                                        )}
                                    </button>
                                </div>

                                {(availableDrivers.length > 0 || availableVehicles.length > 0) && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                <User className="w-4 h-4" />
                                                Assign Driver
                                            </label>
                                            <select
                                                value={formData.driverId}
                                                onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Select a driver</option>
                                                {availableDrivers.map((driver) => (
                                                    <option key={driver.id} value={driver.id}>
                                                        {driver.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {availableDrivers.length} driver(s) available
                                            </p>
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                <Truck className="w-4 h-4" />
                                                Assign Vehicle
                                            </label>
                                            <select
                                                value={formData.vehicleId}
                                                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Select a vehicle</option>
                                                {availableVehicles.map((vehicle) => (
                                                    <option key={vehicle.id} value={vehicle.id}>
                                                        {vehicle.vehicleId} - {vehicle.type} ({vehicle.capacity} tons)
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {availableVehicles.length} vehicle(s) available
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <FileText className="w-4 h-4" />
                                        Notes (Optional)
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Additional instructions for the driver..."
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    />
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Reset Form
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={loading || !formData.driverId || !formData.vehicleId}
                                        className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-5 h-5" />
                                                Create Schedule
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'list' && (
                            <div>
                                {loading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                    </div>
                                ) : schedules.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 text-lg">No schedules found</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Scheduled Time</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Driver</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created By</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {schedules.map((schedule) => (
                                                    <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                            #{schedule.id}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="w-4 h-4 text-gray-400" />
                                                                {new Date(schedule.scheduledTime).toLocaleString()}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                                                                {schedule.status.replace('_', ' ')}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            <div className="flex items-center gap-2">
                                                                <User className="w-4 h-4 text-gray-400" />
                                                                {schedule.driverName}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            <div className="flex items-center gap-2">
                                                                <Truck className="w-4 h-4 text-gray-400" />
                                                                {schedule.vehicleId}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">
                                                            {schedule.createdBy}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}