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
        <AdminLayout
            title="Payments"
            subtitle="Payment transactions collected from quote and shipments"
            actions={
                <button
                    type="button"
                    onClick={loadPayments}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-lg shadow-xs transition"
                >
                    Refresh
                </button>
            }
        >
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                {loading ? (
                    <p className="p-16 text-center text-slate-500 font-medium">Loading payments...</p>
                ) : payments.length === 0 ? (
                    <p className="p-16 text-center text-slate-500 font-medium">No payments yet. Collect from Quote page or Shipments.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#0a1628] text-white">
                                <tr>
                                    {["Date & Time", "Customer Details", "Amount", "Status", "Razorpay Transaction Reference"].map((h) => (
                                        <th key={h} className="px-5 py-3.5 font-bold text-xs uppercase tracking-wider text-slate-200 whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p) => (
                                    <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition text-slate-800">
                                        <td className="px-5 py-4 whitespace-nowrap text-slate-500 text-xs font-medium">
                                            {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <p className="font-bold text-slate-900">{p.customerName || "—"}</p>
                                            <p className="text-slate-500 text-xs mt-0.5">{p.customerPhone}</p>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap font-bold text-slate-900 text-base">
                                            ₹{p.amount}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 text-xs font-bold rounded border ${
                                                p.status === "PAID" || p.status === "SUCCESS"
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                                    : "bg-amber-50 text-amber-800 border-amber-300"
                                            }`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <span className="font-mono text-xs text-slate-700 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                                                {p.razorpayPaymentId || p.razorpayOrderId || "—"}
                                            </span>
                                        </td>
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
