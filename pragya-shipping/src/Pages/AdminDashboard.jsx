import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../api/axiosInstance";
import AdminLayout from "../components/layout/AdminLayout";

function AdminDashboard() {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState({
        totalContacts: 0,
        newContacts: 0,
        readContacts: 0,
        resolvedContacts: 0
    });
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        try {
            const response = await api.get("/api/contact/dashboard");
            setDashboard(response.data);
        } catch (error) {
            console.error("Dashboard Error:", error);
            toast.error(error.response?.data?.message || "Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const cards = [
        { title: "Total Contacts", value: dashboard.totalContacts, accent: "text-slate-900" },
        { title: "New Messages", value: dashboard.newContacts, accent: "text-amber-600" },
        { title: "Read", value: dashboard.readContacts, accent: "text-blue-600" },
        { title: "Resolved", value: dashboard.resolvedContacts, accent: "text-emerald-600" }
    ];

    const pct = (n) =>
        dashboard.totalContacts ? `${(n / dashboard.totalContacts) * 100}%` : "0%";

    return (
        <AdminLayout
            title="Dashboard"
            subtitle="Overview of inquiries and system activity"
            actions={
                <button
                    type="button"
                    onClick={fetchDashboard}
                    className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-4 py-2 rounded-lg text-sm shadow-xs transition"
                >
                    Refresh
                </button>
            }
        >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {cards.map((card) => (
                    <div key={card.title} className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
                        <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">{card.title}</p>
                        <p className={`font-display text-4xl font-extrabold mt-3 ${card.accent}`}>
                            {loading ? "—" : card.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
                    <h2 className="font-display text-xl font-bold text-slate-900">Contact funnel</h2>
                    <p className="text-slate-500 text-sm mt-1">How messages move through your inbox</p>

                    <div className="mt-8 space-y-6">
                        {[
                            { label: "New", value: dashboard.newContacts, color: "bg-amber-500" },
                            { label: "Read", value: dashboard.readContacts, color: "bg-blue-600" },
                            { label: "Resolved", value: dashboard.resolvedContacts, color: "bg-emerald-500" }
                        ].map((row) => (
                            <div key={row.label}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-semibold text-slate-800">{row.label}</span>
                                    <span className="font-bold text-slate-900">{loading ? "—" : row.value}</span>
                                </div>
                                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${row.color}`} style={{ width: pct(row.value) }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0a1628] text-white p-6 rounded-xl shadow-xs">
                        <h2 className="font-display text-lg font-bold text-white">Quick actions</h2>
                        <div className="mt-5 space-y-2">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/shipments")}
                                className="w-full text-left px-4 py-3 bg-white/10 hover:bg-signal hover:text-[#0a1628] rounded-lg transition text-sm font-semibold text-slate-100"
                            >
                                Manage shipments →
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/admin/contacts")}
                                className="w-full text-left px-4 py-3 bg-white/10 hover:bg-signal hover:text-[#0a1628] rounded-lg transition text-sm font-semibold text-slate-100"
                            >
                                View contacts →
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/admin/admin-management")}
                                className="w-full text-left px-4 py-3 bg-white/10 hover:bg-signal hover:text-[#0a1628] rounded-lg transition text-sm font-semibold text-slate-100"
                            >
                                Manage admins →
                            </button>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
                        <h2 className="font-display text-lg font-bold text-slate-900">System</h2>
                        <ul className="mt-4 space-y-3 text-sm">
                            {[
                                ["API", "Online"],
                                ["Database", "Connected"],
                                ["Auth", "JWT Active"]
                            ].map(([k, v]) => (
                                <li key={k} className="flex justify-between items-center py-1">
                                    <span className="text-slate-600 font-medium">{k}</span>
                                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs">{v}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminDashboard;
