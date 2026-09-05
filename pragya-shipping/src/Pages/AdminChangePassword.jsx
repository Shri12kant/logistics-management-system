import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../api/axiosInstance";
import AdminLayout from "../components/layout/AdminLayout";

function AdminChangePassword() {
    const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirm: "" });
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [saving, setSaving] = useState(false);

    // Password validation rules
    const hasMinLength = form.newPassword.length >= 8;
    const hasUpper = /[A-Z]/.test(form.newPassword);
    const hasLower = /[a-z]/.test(form.newPassword);
    const hasDigit = /[0-9]/.test(form.newPassword);
    const hasSpecial = /[@$!%*?&#^()_+\-={}[\]:;"'<>,./~`]/.test(form.newPassword);
    const isPasswordStrong = hasMinLength && hasUpper && hasLower && hasDigit && hasSpecial;

    const submit = async (e) => {
        e.preventDefault();

        if (!form.oldPassword) {
            return toast.error("Current password is required");
        }

        if (!isPasswordStrong) {
            return toast.error("New password must meet all security requirements");
        }

        if (form.newPassword !== form.confirm) {
            return toast.error("New passwords do not match");
        }

        if (form.oldPassword === form.newPassword) {
            return toast.error("New password cannot be identical to the current password");
        }

        try {
            setSaving(true);
            const res = await api.post("/api/admin/change-password", {
                oldPassword: form.oldPassword,
                newPassword: form.newPassword,
            });

            toast.success(res.data?.message || "Password changed successfully!");
            setForm({ oldPassword: "", newPassword: "", confirm: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not change password");
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout title="Change Password" subtitle="Update your admin account credentials securely">
            <div className="max-w-xl">
                <form onSubmit={submit} className="bg-white border border-slate-200 p-8 rounded-xl shadow-xs space-y-5 text-slate-900">
                    <div className="border-b border-slate-100 pb-4 mb-2">
                        <h2 className="font-display text-lg font-bold text-slate-900">Security Credentials</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Ensure your password is strong and unique</p>
                    </div>

                    {/* Current Password */}
                    <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Current Password</label>
                        <div className="relative">
                            <input
                                type={showOld ? "text" : "password"}
                                required
                                value={form.oldPassword}
                                onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
                                className="input-field pr-12"
                                placeholder="Enter your current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOld(!showOld)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 px-2 py-1 rounded"
                            >
                                {showOld ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">New Password</label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                required
                                value={form.newPassword}
                                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                                className="input-field pr-12"
                                placeholder="Enter a new strong password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 px-2 py-1 rounded"
                            >
                                {showNew ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Password strength checklist */}
                        {form.newPassword && (
                            <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 text-xs space-y-1.5 rounded-lg">
                                <p className="font-bold text-slate-800 mb-1">Security Checklist:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-700 font-bold" : "text-slate-500"}`}>
                                        <span>{hasMinLength ? "✓" : "○"}</span> At least 8 characters
                                    </div>
                                    <div className={`flex items-center gap-1.5 ${hasUpper ? "text-emerald-700 font-bold" : "text-slate-500"}`}>
                                        <span>{hasUpper ? "✓" : "○"}</span> 1 uppercase (A-Z)
                                    </div>
                                    <div className={`flex items-center gap-1.5 ${hasLower ? "text-emerald-700 font-bold" : "text-slate-500"}`}>
                                        <span>{hasLower ? "✓" : "○"}</span> 1 lowercase (a-z)
                                    </div>
                                    <div className={`flex items-center gap-1.5 ${hasDigit ? "text-emerald-700 font-bold" : "text-slate-500"}`}>
                                        <span>{hasDigit ? "✓" : "○"}</span> 1 number (0-9)
                                    </div>
                                    <div className={`flex items-center gap-1.5 sm:col-span-2 ${hasSpecial ? "text-emerald-700 font-bold" : "text-slate-500"}`}>
                                        <span>{hasSpecial ? "✓" : "○"}</span> 1 special symbol (@$!%*?&#)
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                required
                                value={form.confirm}
                                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                className="input-field pr-12"
                                placeholder="Re-type new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 px-2 py-1 rounded"
                            >
                                {showConfirm ? "Hide" : "Show"}
                            </button>
                        </div>
                        {form.confirm && form.newPassword !== form.confirm && (
                            <p className="text-xs font-bold text-red-600 mt-1.5">Passwords do not match</p>
                        )}
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                        <button
                            type="submit"
                            disabled={saving || (form.newPassword ? !isPasswordStrong : false)}
                            className="btn-primary !py-3 px-8 font-bold text-sm rounded-lg shadow-xs disabled:opacity-50"
                        >
                            {saving ? "Updating Password..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

export default AdminChangePassword;
