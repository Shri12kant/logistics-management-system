import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../api/axiosInstance";
import AdminLayout from "../components/layout/AdminLayout";

function AdminPayments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPayments = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/payment");
            setPayments(res.data || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load payments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPayments();
    }, []);

    return (
        <AdminLayout title="Payments" subtitle="Payment transactions collected from quote and shipments">
            <div className="bg-white border border-mist overflow-hidden shadow-sm">
                {loading ? (
                    <p className="p-10 text-center text-muted">Loading...</p>
                ) : payments.length === 0 ? (
                    <p className="p-10 text-center text-muted">No payments yet. Collect from Quote page or Shipments.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-ink text-white">
                                <tr>
                                    {["Date", "Customer", "Amount", "Status", "Razorpay Reference"].map((h) => (
                                        <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p) => (
                                    <tr key={p.id} className="border-b border-mist hover:bg-fog/80">
                                        <td className="px-4 py-3 text-muted">{p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}</td>
                                        <td className="px-4 py-3">
                                            <p className="font-semibold text-ink">{p.customerName || "—"}</p>
                                            <p className="text-muted text-xs">{p.customerPhone}</p>
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-ink">₹{p.amount}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-0.5 text-xs font-bold ${
                                                p.status === "PAID" || p.status === "SUCCESS"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-yellow-50 text-yellow-700"
                                            }`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-muted">{p.razorpayPaymentId || p.razorpayOrderId || "—"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default AdminPayments;
