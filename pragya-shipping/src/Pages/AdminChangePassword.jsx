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
                <form onSubmit={submit} className="bg-white border border-mist p-6 md:p-8 space-y-5 shadow-sm">
                    {/* Current Password */}
                    <div>
                        <label className="text-sm font-medium text-ink mb-1.5 block">Current Password</label>
                        <div className="relative">
                            <input
                                type={showOld ? "text" : "password"}
                                required
                                value={form.oldPassword}
                                onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
                                className="input-field pr-10"
                                placeholder="Enter current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOld(!showOld)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink focus:outline-none"
                            >
                                {showOld ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-sm font-medium text-ink mb-1.5 block">New Password</label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                required
                                value={form.newPassword}
                                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                                className="input-field pr-10"
                                placeholder="Enter new strong password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink focus:outline-none"
                            >
                                {showNew ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Password strength checklist */}
                        {form.newPassword && (
                            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 text-xs space-y-1 rounded-sm">
                                <p className="font-semibold text-slate-700 mb-1">Password Requirements:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                    <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-600 font-medium" : "text-slate-500"}`}>
                                        <span>{hasMinLength ? "✓" : "○"}</span> At least 8 characters
                                    </div>
                                    <div className={`flex items-center gap-1.5 ${hasUpper ? "text-emerald-600 font-medium" : "text-slate-500"}`}>
                                        <span>{hasUpper ? "✓" : "○"}</span> 1 uppercase letter (A-Z)
                                    </div>
                                    <div className={`flex items-center gap-1.5 ${hasLower ? "text-emerald-600 font-medium" : "text-slate-500"}`}>
                                        <span>{hasLower ? "✓" : "○"}</span> 1 lowercase letter (a-z)
                                    </div>
                                    <div className={`flex items-center gap-1.5 ${hasDigit ? "text-emerald-600 font-medium" : "text-slate-500"}`}>
                                        <span>{hasDigit ? "✓" : "○"}</span> 1 number (0-9)
                                    </div>
                                    <div className={`flex items-center gap-1.5 sm:col-span-2 ${hasSpecial ? "text-emerald-600 font-medium" : "text-slate-500"}`}>
                                        <span>{hasSpecial ? "✓" : "○"}</span> 1 special symbol (@$!%*?&#)
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="text-sm font-medium text-ink mb-1.5 block">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                required
                                value={form.confirm}
                                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                className="input-field pr-10"
                                placeholder="Re-enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink focus:outline-none"
                            >
                                {showConfirm ? "Hide" : "Show"}
                            </button>
                        </div>
                        {form.confirm && form.newPassword !== form.confirm && (
                            <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                        )}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={saving || (form.newPassword ? !isPasswordStrong : false)}
                            className="btn-primary disabled:opacity-50"
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
