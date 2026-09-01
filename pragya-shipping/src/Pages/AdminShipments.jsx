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
            PENDING: "bg-yellow-50 text-yellow-800 border-yellow-200",
            PICKED_UP: "bg-blue-50 text-blue-800 border-blue-200",
            IN_TRANSIT: "bg-indigo-50 text-indigo-800 border-indigo-200",
            OUT_FOR_DELIVERY: "bg-orange-50 text-orange-800 border-orange-200",
            DELIVERED: "bg-emerald-50 text-emerald-800 border-emerald-200",
            CANCELLED: "bg-red-50 text-red-800 border-red-200"
        };
        return map[status] || "bg-gray-50 text-gray-800 border-gray-200";
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
                    <button type="button" onClick={fetchShipments} className="px-4 py-2.5 border border-mist bg-white text-sm font-semibold hover:bg-mist/50">
                        Refresh
                    </button>
                    <button type="button" onClick={() => setShowModal(true)} className="btn-primary text-sm !py-2.5">
                        + New Shipment
                    </button>
                </>
            }
        >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    ["Total", counts.total, "text-ink"],
                    ["Pending", counts.pending, "text-yellow-600"],
                    ["In Progress", counts.inTransit, "text-steel"],
                    ["Delivered", counts.delivered, "text-emerald-600"]
                ].map(([label, value, color]) => (
                    <div key={label} className="bg-white border border-mist p-4">
                        <p className="text-muted text-xs uppercase tracking-wider font-semibold">{label}</p>
                        <p className={`font-display text-3xl font-bold mt-1 ${color}`}>{value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-mist p-4 mb-6 flex flex-col md:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Search tracking, name, phone, address..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-field flex-1"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="input-field md:w-48"
                >
                    <option value="ALL">All Status</option>
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>{s.replaceAll("_", " ")}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white border border-mist overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-12 text-center text-muted">Loading shipments...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center text-muted">
                        No shipments found. Create one with <strong>+ New Shipment</strong>.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-ink text-white">
                                <tr>
                                    {["Tracking", "Customer", "Route", "Service", "Amount", "Pay", "Status", ""].map((h) => (
                                        <th key={h || "a"} className="px-4 py-3 font-semibold">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((s) => (
                                    <tr key={s.id} className="border-b border-mist hover:bg-fog/80">
                                        <td className="px-4 py-3">
                                            <p className="font-mono font-bold text-steel">{s.trackingNumber}</p>
                                            <p className="text-xs text-muted mt-0.5">
                                                {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "—"}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-semibold text-ink">{s.customerName}</p>
                                            <p className="text-muted">{s.customerPhone}</p>
                                        </td>
                                        <td className="px-4 py-3 max-w-[200px]">
                                            <p className="truncate text-muted" title={s.pickupAddress}>From: {s.pickupAddress}</p>
                                            <p className="truncate text-muted" title={s.deliveryAddress}>To: {s.deliveryAddress}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p>{s.serviceType}</p>
                                            <p className="text-muted">{s.weight} kg</p>
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-ink">₹{s.amount}</td>
                                        <td className="px-4 py-3">
                                            {s.paymentStatus === "PAID" ? (
                                                <span className="text-emerald-700 text-xs font-bold">PAID</span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => collectPayment(s)}
                                                    className="text-steel text-xs font-semibold hover:underline"
                                                >
                                                    Collect
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={s.status}
                                                onChange={(e) => updateStatus(s.id, e.target.value)}
                                                className={`border px-2 py-1.5 text-xs font-semibold ${getStatusColor(s.status)}`}
                                            >
                                                {STATUSES.map((st) => (
                                                    <option key={st} value={st}>{st.replaceAll("_", " ")}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                type="button"
                                                onClick={() => deleteShipment(s.id, s.trackingNumber)}
                                                className="text-red-600 hover:underline text-xs font-semibold"
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
                <div className="fixed inset-0 bg-ink/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-ink text-white px-6 py-4 flex justify-between items-center">
                            <h2 className="font-display text-xl font-bold">New Shipment</h2>
                            <button type="button" onClick={() => setShowModal(false)} className="text-2xl leading-none text-white/70 hover:text-white">×</button>
                        </div>
                        <form onSubmit={createShipment} className="p-6 grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-muted mb-1 block">Customer Name *</label>
                                <input required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="input-field" />
                            </div>
                            <div>
                                <label className="text-sm text-muted mb-1 block">Phone *</label>
                                <input required value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} className="input-field" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm text-muted mb-1 block">Email</label>
                                <input type="email" value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} className="input-field" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm text-muted mb-1 block">Pickup *</label>
                                <textarea required rows={2} value={form.pickupAddress} onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })} className="input-field" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm text-muted mb-1 block">Delivery *</label>
                                <textarea required rows={2} value={form.deliveryAddress} onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })} className="input-field" />
                            </div>
                            <div>
                                <label className="text-sm text-muted mb-1 block">Weight (kg) *</label>
                                <input required type="number" min="0.1" step="0.1" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="input-field" />
                            </div>
                            <div>
                                <label className="text-sm text-muted mb-1 block">Amount (₹) *</label>
                                <input required type="number" min="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="input-field" />
                            </div>
                            <div>
                                <label className="text-sm text-muted mb-1 block">Service</label>
                                <select value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })} className="input-field">
                                    <option value="STANDARD">STANDARD</option>
                                    <option value="EXPRESS">EXPRESS</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-muted mb-1 block">Est. Delivery</label>
                                <input type="date" value={form.estimatedDelivery} onChange={(e) => setForm({ ...form, estimatedDelivery: e.target.value })} className="input-field" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm text-muted mb-1 block">Notes</label>
                                <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-field" />
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-mist font-semibold">Cancel</button>
                                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                                    {saving ? "Creating..." : "Create Shipment"}
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
