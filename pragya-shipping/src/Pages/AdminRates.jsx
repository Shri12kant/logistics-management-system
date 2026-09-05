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
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">{label}</label>
            <input
                type="number"
                min="0"
                step="0.1"
                required
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="input-field"
            />
            {hint && <p className="text-xs text-slate-500 mt-1 font-medium">{hint}</p>}
        </div>
    );

    return (
        <AdminLayout title="Quote Rates" subtitle="Update pricing parameters for instant website calculations">
            {loading ? (
                <div className="bg-white border border-slate-200 p-12 rounded-xl text-center text-slate-500 font-medium">
                    Loading pricing configuration...
                </div>
            ) : (
                <form onSubmit={save} className="bg-white border border-slate-200 p-8 rounded-xl shadow-xs max-w-xl space-y-5 text-slate-900">
                    <div className="border-b border-slate-100 pb-4 mb-2">
                        <h2 className="font-display text-lg font-bold text-slate-900">Rate Configuration</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Adjust per-kg and distance parameters dynamically</p>
                    </div>

                    {field("standardRate", "Standard Rate (₹ per kg)", "Standard delivery within 3–5 business days")}
                    {field("expressRate", "Express Rate (₹ per kg)", "Fast delivery within 1–2 business days")}
                    {field("premiumRate", "Premium Rate (₹ per kg)", "High priority same day / next day delivery")}
                    {field("minimumCharge", "Minimum Base Charge (₹)", "Minimum floor rate charged for any consignment")}
                    {field("baseDistanceKm", "Free Base Distance (km)", "Distance covered under standard base rate without surcharge")}
                    {field("extraPerKm", "Extra Rate per km (₹)", "Surcharge per km after base distance is exceeded")}
                    
                    <div className="pt-2">
                        <button type="submit" disabled={saving} className="btn-primary !py-3 px-8 font-bold text-sm rounded-lg shadow-xs disabled:opacity-50">
                            {saving ? "Saving Changes..." : "Save Rate Settings"}
                        </button>
                    </div>
                </form>
            )}
        </AdminLayout>
    );
}

export default AdminRates;
