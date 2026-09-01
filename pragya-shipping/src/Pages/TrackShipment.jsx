import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../api/config";

function TrackShipment() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const trackShipment = async (e) => {
        e.preventDefault();
        if (!trackingNumber.trim()) {
            setError("Please enter a tracking number");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const response = await axios.get(
                `${API_BASE_URL}/api/shipment/track/${trackingNumber}`
            );
            setShipment(response.data);
            toast.success("Shipment found!");
        } catch (err) {
            console.error(err);
            setError("Shipment not found. Please check your tracking number.");
            setShipment(null);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-800";
            case "PICKED_UP":
            case "IN_TRANSIT":
            case "OUT_FOR_DELIVERY":
                return "bg-blue-100 text-blue-800";
            case "DELIVERED":
                return "bg-emerald-100 text-emerald-800";
            case "CANCELLED":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="min-h-screen bg-fog">
            <header className="bg-ink text-white">
                <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link to="/" className="font-display text-xl font-bold">
                        Pragya<span className="text-signal"> Shipping</span>
                    </Link>
                    <Link to="/" className="text-sm text-white/70 hover:text-white transition">
                        ← Back to Home
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
                <p className="section-label">Tracking</p>
                <h1 className="section-title">Track your shipment</h1>
                <p className="section-lead">Enter the tracking number from your booking confirmation.</p>

                <form onSubmit={trackShipment} className="mt-10 bg-white p-6 md:p-8 shadow-lg flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="e.g. PRG1234567890"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                        className="input-field flex-1 font-mono tracking-wide"
                    />
                    <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap disabled:opacity-50">
                        {loading ? "Searching..." : "Track"}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                        {error}
                    </div>
                )}

                {shipment && (
                    <div className="mt-10 bg-white shadow-lg overflow-hidden animate-fade-up">
                        <div className="bg-ink px-6 md:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="font-display text-white text-2xl font-bold">Shipment Details</h2>
                                <p className="text-white/50 mt-1 font-mono text-sm">{shipment.trackingNumber}</p>
                            </div>
                            <span className={`px-4 py-2 text-sm font-bold ${getStatusColor(shipment.status)}`}>
                                {shipment.status?.replaceAll("_", " ")}
                            </span>
                        </div>

                        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
                            <div className="bg-mist/60 p-5">
                                <h3 className="font-display font-bold text-ink mb-4">Shipment</h3>
                                <dl className="space-y-3 text-sm">
                                    <div>
                                        <dt className="text-muted">Service</dt>
                                        <dd className="font-semibold mt-0.5">{shipment.serviceType}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-muted">Weight</dt>
                                        <dd className="font-semibold mt-0.5">{shipment.weight} kg</dd>
                                    </div>
                                    <div>
                                        <dt className="text-muted">Payment</dt>
                                        <dd className="font-semibold mt-0.5">{shipment.paymentStatus || "UNPAID"}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="bg-mist/60 p-5">
                                <h3 className="font-display font-bold text-ink mb-4">Timeline</h3>
                                <p className="text-sm text-muted">Order date</p>
                                <p className="font-semibold">{shipment.createdAt ? new Date(shipment.createdAt).toLocaleDateString() : "—"}</p>
                            </div>

                            <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-muted text-sm mb-1">Pickup</p>
                                    <p className="font-medium bg-fog p-4 border border-mist">{shipment.pickupAddress}</p>
                                </div>
                                <div>
                                    <p className="text-muted text-sm mb-1">Delivery</p>
                                    <p className="font-medium bg-fog p-4 border border-mist">{shipment.deliveryAddress}</p>
                                </div>
                            </div>

                            <div className="md:col-span-2 grid sm:grid-cols-3 gap-4 pt-2">
                                <div className="bg-fog p-4">
                                    <p className="text-muted text-sm">Order Date</p>
                                    <p className="font-semibold mt-1">{new Date(shipment.createdAt).toLocaleDateString()}</p>
                                </div>
                                {shipment.estimatedDelivery && (
                                    <div className="bg-fog p-4">
                                        <p className="text-muted text-sm">Est. Delivery</p>
                                        <p className="font-semibold mt-1">{new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
                                    </div>
                                )}
                                {shipment.actualDelivery && (
                                    <div className="bg-fog p-4">
                                        <p className="text-muted text-sm">Delivered On</p>
                                        <p className="font-semibold mt-1">{new Date(shipment.actualDelivery).toLocaleDateString()}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default TrackShipment;
