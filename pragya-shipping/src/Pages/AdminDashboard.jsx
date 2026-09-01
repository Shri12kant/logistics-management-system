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
        { title: "Total Contacts", value: dashboard.totalContacts, accent: "text-ink" },
        { title: "New Messages", value: dashboard.newContacts, accent: "text-signal" },
        { title: "Read", value: dashboard.readContacts, accent: "text-steel" },
        { title: "Resolved", value: dashboard.resolvedContacts, accent: "text-emerald-600" }
    ];

    const pct = (n) =>
        dashboard.totalContacts ? `${(n / dashboard.totalContacts) * 100}%` : "0%";

    return (
        <AdminLayout
            title="Dashboard"
            subtitle="Overview of inquiries and system activity"
            actions={
                <button type="button" onClick={fetchDashboard} className="btn-steel text-sm !py-2.5">
                    Refresh
                </button>
            }
        >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {cards.map((card) => (
                    <div key={card.title} className="bg-white border border-mist p-5 shadow-sm">
                        <p className="text-muted text-xs uppercase tracking-wider font-semibold">{card.title}</p>
                        <p className={`font-display text-4xl font-bold mt-3 ${card.accent}`}>
                            {loading ? "—" : card.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white border border-mist p-6 shadow-sm">
                    <h2 className="font-display text-xl font-bold text-ink">Contact funnel</h2>
                    <p className="text-muted text-sm mt-1">How messages move through your inbox</p>

                    <div className="mt-8 space-y-6">
                        {[
                            { label: "New", value: dashboard.newContacts, color: "bg-signal" },
                            { label: "Read", value: dashboard.readContacts, color: "bg-steel" },
                            { label: "Resolved", value: dashboard.resolvedContacts, color: "bg-emerald-500" }
                        ].map((row) => (
                            <div key={row.label}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-ink">{row.label}</span>
                                    <span className="font-bold">{loading ? "—" : row.value}</span>
                                </div>
                                <div className="h-2 bg-mist overflow-hidden">
                                    <div className={`h-full ${row.color}`} style={{ width: pct(row.value) }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-ink text-white p-6">
                        <h2 className="font-display text-lg font-bold">Quick actions</h2>
                        <div className="mt-5 space-y-2">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/shipments")}
                                className="w-full text-left px-4 py-3 bg-white/5 hover:bg-signal hover:text-ink transition text-sm font-medium"
                            >
                                Manage shipments →
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/admin/contacts")}
                                className="w-full text-left px-4 py-3 bg-white/5 hover:bg-signal hover:text-ink transition text-sm font-medium"
                            >
                                View contacts →
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/admin/admin-management")}
                                className="w-full text-left px-4 py-3 bg-white/5 hover:bg-signal hover:text-ink transition text-sm font-medium"
                            >
                                Manage admins →
                            </button>
                        </div>
                    </div>

                    <div className="bg-white border border-mist p-6 shadow-sm">
                        <h2 className="font-display text-lg font-bold text-ink">System</h2>
                        <ul className="mt-4 space-y-3 text-sm">
                            {[
                                ["API", "Online"],
                                ["Database", "Connected"],
                                ["Auth", "JWT Active"]
                            ].map(([k, v]) => (
                                <li key={k} className="flex justify-between">
                                    <span className="text-muted">{k}</span>
                                    <span className="font-semibold text-emerald-600">{v}</span>
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
