import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../api/axiosInstance";
import AdminLayout from "../components/layout/AdminLayout";
import { startRazorpayPayment } from "../api/razorpay";

const STATUSES = ["PENDING", "PICKED_UP", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];

const emptyForm = {
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    pickupAddress: "",
    deliveryAddress: "",
    weight: "",
    serviceType: "STANDARD",
    amount: "",
    notes: "",
    estimatedDelivery: ""
};

function AdminShipments() {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(emptyForm);

    const fetchShipments = async () => {
        try {
            setLoading(true);
            const response = await api.get("/api/shipment");
            setShipments(response.data || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch shipments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    const createShipment = async (e) => {
        e.preventDefault();
        if (!form.customerName.trim() || !form.customerPhone.trim()) {
            return toast.error("Customer name and phone are required");
        }
        if (!form.pickupAddress.trim() || !form.deliveryAddress.trim()) {
            return toast.error("Pickup and delivery addresses are required");
        }
        if (!form.weight || Number(form.weight) <= 0) return toast.error("Enter a valid weight");
        if (!form.amount || Number(form.amount) < 0) return toast.error("Enter a valid amount");

        try {
            setSaving(true);
            const payload = {
                customerName: form.customerName.trim(),
                customerEmail: form.customerEmail.trim() || "na@pragyashipping.com",
                customerPhone: form.customerPhone.trim(),
                pickupAddress: form.pickupAddress.trim(),
                deliveryAddress: form.deliveryAddress.trim(),
                weight: Number(form.weight),
                serviceType: form.serviceType,
                amount: Number(form.amount),
                notes: form.notes.trim() || null,
                estimatedDelivery: form.estimatedDelivery ? `${form.estimatedDelivery}T18:00:00` : null
            };
            const response = await api.post("/api/shipment", payload);
            toast.success(`Created: ${response.data.trackingNumber}`);
            setForm(emptyForm);
            setShowModal(false);
            fetchShipments();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create shipment");
        } finally {
            setSaving(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/api/shipment/${id}/status`, { status });
            toast.success(`Status → ${status}`);
            fetchShipments();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    const deleteShipment = async (id, trackingNumber) => {
        if (!window.confirm(`Delete ${trackingNumber}?`)) return;
        try {
            await api.delete(`/api/shipment/${id}`);
            toast.success("Shipment deleted");
            fetchShipments();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete shipment");
        }
    };

    const collectPayment = async (s) => {
        try {
            await startRazorpayPayment({
                amount: Number(s.amount),
                customerName: s.customerName,
                customerEmail: s.customerEmail,
                customerPhone: s.customerPhone,
                shipmentId: s.id,
                notes: `Shipment ${s.trackingNumber}`
            });
            toast.success("Payment successful");
            fetchShipments();
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Payment failed");
        }
    };

    const getStatusColor = (status) => {
        const map = {
            PENDING: "bg-amber-50 text-amber-800 border-amber-300",
            PICKED_UP: "bg-blue-50 text-blue-800 border-blue-300",
            IN_TRANSIT: "bg-indigo-50 text-indigo-800 border-indigo-300",
            OUT_FOR_DELIVERY: "bg-orange-50 text-orange-800 border-orange-300",
            DELIVERED: "bg-emerald-50 text-emerald-800 border-emerald-300",
            CANCELLED: "bg-red-50 text-red-800 border-red-300"
        };
        return map[status] || "bg-slate-50 text-slate-800 border-slate-300";
    };

    const filtered = shipments.filter((s) => {
        const q = search.toLowerCase();
        const matchSearch =
            !q ||
            s.trackingNumber?.toLowerCase().includes(q) ||
            s.customerName?.toLowerCase().includes(q) ||
            s.customerPhone?.includes(q) ||
            s.deliveryAddress?.toLowerCase().includes(q);
        return matchSearch && (statusFilter === "ALL" || s.status === statusFilter);
    });

    const counts = {
        total: shipments.length,
        pending: shipments.filter((s) => s.status === "PENDING").length,
        inTransit: shipments.filter((s) =>
            ["IN_TRANSIT", "OUT_FOR_DELIVERY", "PICKED_UP"].includes(s.status)
        ).length,
        delivered: shipments.filter((s) => s.status === "DELIVERED").length
    };

    return (
        <AdminLayout
            title="Shipments"
            subtitle="Create, track and update consignments"
            actions={
                <>
                    <button
                        type="button"
                        onClick={fetchShipments}
                        className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-lg shadow-xs transition"
                    >
                        Refresh
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="btn-primary !py-2 text-sm font-bold rounded-lg shadow-xs"
                    >
                        + New Shipment
                    </button>
                </>
            }
        >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    ["Total Shipments", counts.total, "text-slate-900"],
                    ["Pending Pickups", counts.pending, "text-amber-600"],
                    ["In Progress", counts.inTransit, "text-blue-600"],
                    ["Delivered", counts.delivered, "text-emerald-600"]
                ].map(([label, value, color]) => (
                    <div key={label} className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
                        <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">{label}</p>
                        <p className={`font-display text-3xl font-extrabold mt-1 ${color}`}>{value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs mb-6 flex flex-col md:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Search tracking #, name, phone, address..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-field flex-1"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="input-field md:w-52"
                >
                    <option value="ALL">All Statuses</option>
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>{s.replaceAll("_", " ")}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                {loading ? (
                    <div className="p-16 text-center text-slate-500 font-medium">Loading shipments...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-16 text-center text-slate-500 font-medium">
                        No shipments found matching your criteria.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#0a1628] text-white">
                                <tr>
                                    {["Tracking #", "Customer", "Route Details", "Service", "Amount", "Payment", "Status", "Actions"].map((h) => (
                                        <th key={h} className="px-5 py-3.5 font-bold text-xs uppercase tracking-wider text-slate-200 whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((s) => (
                                    <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition text-slate-800">
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <p className="font-mono font-bold text-blue-700 text-sm">{s.trackingNumber}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "—"}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <p className="font-bold text-slate-900">{s.customerName}</p>
                                            <p className="text-slate-500 text-xs mt-0.5">{s.customerPhone}</p>
                                        </td>
                                        <td className="px-5 py-4 max-w-[220px]">
                                            <p className="truncate text-slate-700 text-xs font-medium" title={s.pickupAddress}>
                                                <span className="font-bold text-slate-500">From:</span> {s.pickupAddress}
                                            </p>
                                            <p className="truncate text-slate-700 text-xs font-medium mt-0.5" title={s.deliveryAddress}>
                                                <span className="font-bold text-slate-500">To:</span> {s.deliveryAddress}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <span className="bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded text-xs font-semibold">
                                                {s.serviceType}
                                            </span>
                                            <p className="text-slate-500 text-xs mt-1 font-medium">{s.weight} kg</p>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap font-bold text-slate-900 text-base">
                                            ₹{s.amount}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            {s.paymentStatus === "PAID" ? (
                                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-300 px-2.5 py-1 rounded text-xs font-bold">
                                                    PAID
                                                </span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => collectPayment(s)}
                                                    className="text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded text-xs font-bold transition border border-blue-200"
                                                >
                                                    Collect
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <select
                                                value={s.status}
                                                onChange={(e) => updateStatus(s.id, e.target.value)}
                                                className={`border px-2.5 py-1.5 rounded-md text-xs font-bold ${getStatusColor(s.status)}`}
                                            >
                                                {STATUSES.map((st) => (
                                                    <option key={st} value={st}>{st.replaceAll("_", " ")}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={() => deleteShipment(s.id, s.trackingNumber)}
                                                className="text-red-600 hover:text-red-800 font-bold text-xs bg-red-50 px-2.5 py-1.5 rounded hover:bg-red-100 transition border border-red-200"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-[#0a1628]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white text-slate-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-slate-200">
                        <div className="sticky top-0 bg-[#0a1628] text-white px-6 py-4 flex justify-between items-center z-10">
                            <div>
                                <h2 className="font-display text-xl font-bold text-white">New Shipment Consignment</h2>
                                <p className="text-slate-400 text-xs mt-0.5">Fill details to generate tracking and receipt</p>
                            </div>
                            <button type="button" onClick={() => setShowModal(false)} className="text-2xl text-slate-400 hover:text-white leading-none">×</button>
                        </div>
                        <form onSubmit={createShipment} className="p-6 grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Customer Name *</label>
                                <input required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="input-field" placeholder="Full name" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Customer Phone *</label>
                                <input required value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} className="input-field" placeholder="10-digit mobile" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Customer Email</label>
                                <input type="email" value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} className="input-field" placeholder="customer@example.com (optional)" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Pickup Address *</label>
                                <textarea required rows={2} value={form.pickupAddress} onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })} className="input-field" placeholder="Complete pickup location with pincode" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Delivery Address *</label>
                                <textarea required rows={2} value={form.deliveryAddress} onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })} className="input-field" placeholder="Complete delivery destination with pincode" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Weight (kg) *</label>
                                <input required type="number" min="0.1" step="0.1" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="input-field" placeholder="e.g. 15.5" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Amount (₹) *</label>
                                <input required type="number" min="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="input-field" placeholder="Total bill amount" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Service Type</label>
                                <select value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })} className="input-field">
                                    <option value="STANDARD">STANDARD (3-5 Days)</option>
                                    <option value="EXPRESS">EXPRESS (1-2 Days)</option>
                                    <option value="PREMIUM">PREMIUM (Same Day)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Est. Delivery Date</label>
                                <input type="date" value={form.estimatedDelivery} onChange={(e) => setForm({ ...form, estimatedDelivery: e.target.value })} className="input-field" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Additional Notes</label>
                                <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-field" placeholder="Handling instructions or package description..." />
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-3 pt-3 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="btn-primary !py-2.5 px-6 font-bold rounded-lg shadow-xs text-sm disabled:opacity-50"
                                >
                                    {saving ? "Creating Consignment..." : "Create Shipment"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default AdminShipments;
