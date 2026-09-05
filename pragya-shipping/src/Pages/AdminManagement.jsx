import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../api/axiosInstance";
import AdminLayout from "../components/layout/AdminLayout";

function AdminManagement() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAdmin, setNewAdmin] = useState({
        username: "",
        email: "",
        password: "",
        role: "ADMIN"
    });

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const response = await api.get("/api/admin");
            setAdmins(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch admins");
        } finally {
            setLoading(false);
        }
    };

    const createAdmin = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/admin", newAdmin);
            toast.success("Admin created successfully");
            setShowAddModal(false);
            setNewAdmin({ username: "", email: "", password: "", role: "ADMIN" });
            fetchAdmins();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create admin");
        }
    };

    const deleteAdmin = async (id) => {
        if (!window.confirm("Are you sure you want to delete this admin?")) return;
        try {
            await api.delete(`/api/admin/${id}`);
            toast.success("Admin deleted");
            fetchAdmins();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete admin");
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <AdminLayout
            title="Admins"
            subtitle="Manage system administrators"
            actions={
                <button
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary !py-2 text-sm font-bold rounded-lg shadow-xs"
                >
                    + Add Admin
                </button>
            }
        >
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="font-display font-bold text-slate-900 text-lg">System Administrators</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{admins.length} authorized account(s)</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#0a1628] text-white">
                            <tr>
                                {["ID", "Admin User", "Email Address", "System Role", "Actions"].map((h) => (
                                    <th key={h} className="px-5 py-3.5 font-bold text-xs uppercase tracking-wider text-slate-200 whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-16 text-slate-500 font-medium">Loading administrators...</td>
                                </tr>
                            ) : admins.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-16 text-slate-500 font-medium">No admins found</td>
                                </tr>
                            ) : (
                                admins.map((admin) => (
                                    <tr key={admin.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition text-slate-800">
                                        <td className="px-5 py-4 font-mono text-xs text-slate-500 font-semibold">#{admin.id}</td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-[#0a1628] text-signal flex items-center justify-center font-display font-bold text-sm shadow-xs">
                                                    {admin.username?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-bold text-slate-900">{admin.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-slate-600">{admin.email}</td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <span className="bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-1 text-xs font-bold rounded">
                                                {admin.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={() => deleteAdmin(admin.id)}
                                                className="text-red-600 hover:text-red-800 font-bold text-xs bg-red-50 px-2.5 py-1.5 rounded hover:bg-red-100 transition border border-red-200"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-[#0a1628]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white text-slate-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-slate-200" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-[#0a1628] text-white px-6 py-4 flex justify-between items-center">
                            <div>
                                <h2 className="font-display text-xl font-bold text-white">Add System Admin</h2>
                                <p className="text-slate-400 text-xs mt-0.5">Create a new authorized login</p>
                            </div>
                            <button type="button" onClick={() => setShowAddModal(false)} className="text-2xl text-slate-400 hover:text-white leading-none">×</button>
                        </div>
                        <form onSubmit={createAdmin} className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Username</label>
                                <input required value={newAdmin.username} onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })} className="input-field" placeholder="e.g. john_doe" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Email Address</label>
                                <input type="email" required value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} className="input-field" placeholder="admin@example.com" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Initial Password</label>
                                <input type="password" required value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} className="input-field" placeholder="Min 8 chars with upper, lower, digit, symbol" />
                            </div>
                            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary !py-2.5 px-6 font-bold rounded-lg shadow-xs text-sm"
                                >
                                    Create Admin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default AdminManagement;
