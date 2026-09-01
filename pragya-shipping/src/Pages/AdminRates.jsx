import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../api/axiosInstance";
import AdminLayout from "../components/layout/AdminLayout";

function AdminRates() {
    const [form, setForm] = useState({
        standardRate: 50,
        expressRate: 80,
        premiumRate: 120,
        minimumCharge: 200,
        baseDistanceKm: 100,
        extraPerKm: 1.5
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.get("/api/quote/rates");
                setForm({
                    standardRate: res.data.standardRate,
                    expressRate: res.data.expressRate,
                    premiumRate: res.data.premiumRate,
                    minimumCharge: res.data.minimumCharge,
                    baseDistanceKm: res.data.baseDistanceKm,
                    extraPerKm: res.data.extraPerKm
                });
            } catch {
                toast.error("Failed to load rates");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const save = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            const res = await api.put("/api/quote/settings", {
                standardRate: Number(form.standardRate),
                expressRate: Number(form.expressRate),
                premiumRate: Number(form.premiumRate),
                minimumCharge: Number(form.minimumCharge),
                baseDistanceKm: Number(form.baseDistanceKm),
                extraPerKm: Number(form.extraPerKm)
            });
            setForm({
                standardRate: res.data.standardRate,
                expressRate: res.data.expressRate,
                premiumRate: res.data.premiumRate,
                minimumCharge: res.data.minimumCharge,
                baseDistanceKm: res.data.baseDistanceKm,
                extraPerKm: res.data.extraPerKm
            });
            toast.success("Rates saved successfully. Website quote calculator updated.");
        } catch (err) {
            toast.error(err.response?.data?.message || "Could not save rates");
        } finally {
            setSaving(false);
        }
    };

    const field = (key, label, hint) => (
        <div>
            <label className="text-sm text-muted mb-1 block">{label}</label>
            <input
                type="number"
                min="0"
                step="0.1"
                required
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="input-field"
            />
            {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
        </div>
    );

    return (
        <AdminLayout title="Quote Rates" subtitle="Update pricing parameters for instant website calculations">
            {loading ? (
                <p className="text-muted">Loading...</p>
            ) : (
                <form onSubmit={save} className="bg-white border border-mist p-8 max-w-xl space-y-4 shadow-sm">
                    {field("standardRate", "Standard ₹ per kg", "Delivery within 3–5 days")}
                    {field("expressRate", "Express ₹ per kg", "Delivery within 1–2 days")}
                    {field("premiumRate", "Premium ₹ per kg", "Same day delivery")}
                    {field("minimumCharge", "Minimum base charge (₹)", "Minimum charge per shipment")}
                    {field("baseDistanceKm", "Free base distance (km)", "Distance covered under standard base rate")}
                    {field("extraPerKm", "Extra ₹ per km after base distance")}
                    <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                        {saving ? "Saving..." : "Save Rates"}
                    </button>
                </form>
            )}
        </AdminLayout>
    );
}

export default AdminRates;
