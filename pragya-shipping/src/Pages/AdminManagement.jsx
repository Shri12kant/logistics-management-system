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
                <button type="button" onClick={() => setShowAddModal(true)} className="btn-primary text-sm !py-2.5">
                    + Add Admin
                </button>
            }
        >
            <div className="bg-white border border-mist overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-mist flex justify-between items-center">
                    <div>
                        <h3 className="font-display font-bold text-ink">Administrators</h3>
                        <p className="text-sm text-muted">{admins.length} account(s)</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-ink text-white">
                            <tr>
                                {["ID", "User", "Email", "Role", ""].map((h) => (
                                    <th key={h || "x"} className="px-5 py-3 font-semibold">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-16 text-muted">Loading...</td>
                                </tr>
                            ) : admins.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-16 text-muted">No admins found</td>
                                </tr>
                            ) : (
                                admins.map((admin) => (
                                    <tr key={admin.id} className="border-b border-mist hover:bg-fog/80">
                                        <td className="px-5 py-4 text-muted">#{admin.id}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-ink text-signal flex items-center justify-center font-display font-bold">
                                                    {admin.username?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-ink">{admin.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-muted">{admin.email}</td>
                                        <td className="px-5 py-4">
                                            <span className="bg-mist text-steel px-2.5 py-1 text-xs font-bold">
                                                {admin.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <button
                                                type="button"
                                                onClick={() => deleteAdmin(admin.id)}
                                                className="text-red-600 text-xs font-semibold hover:underline"
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
                <div className="fixed inset-0 bg-ink/60 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-ink text-white px-6 py-4 flex justify-between items-center">
                            <h2 className="font-display text-xl font-bold">Add Admin</h2>
                            <button type="button" onClick={() => setShowAddModal(false)} className="text-2xl text-white/70 hover:text-white">×</button>
                        </div>
                        <form onSubmit={createAdmin} className="p-6 space-y-4">
                            <div>
                                <label className="text-sm text-muted mb-1 block">Username</label>
                                <input required value={newAdmin.username} onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })} className="input-field" placeholder="e.g. john_doe" />
                            </div>
                            <div>
                                <label className="text-sm text-muted mb-1 block">Email</label>
                                <input type="email" required value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} className="input-field" placeholder="admin@example.com" />
                            </div>
                            <div>
                                <label className="text-sm text-muted mb-1 block">Password</label>
                                <input type="password" required value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} className="input-field" placeholder="Min 8 chars with uppercase, lowercase, number, symbol" />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2.5 border border-mist font-semibold">Cancel</button>
                                <button type="submit" className="btn-primary">Create Admin</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default AdminManagement;
