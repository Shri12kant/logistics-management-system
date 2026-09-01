import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../api/config";
import { startRazorpayPayment } from "../api/razorpay";

function QuoteCalculator() {
    const [formData, setFormData] = useState({
        weight: "",
        serviceType: "STANDARD",
        distance: "",
        customerName: "",
        customerEmail: "",
        customerPhone: ""
    });
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paying, setPaying] = useState(false);
    const [rates, setRates] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/quote/rates`)
            .then((res) => setRates(res.data))
            .catch(() => {});
    }, []);

    const calculateQuote = async (e) => {
        e.preventDefault();
        if (!formData.weight || formData.weight <= 0) {
            toast.error("Please enter valid weight");
            return;
        }

        try {
            setLoading(true);
            setQuote(null);
            const response = await axios.post(`${API_BASE_URL}/api/quote/calculate`, {
                weight: parseFloat(formData.weight),
                serviceType: formData.serviceType,
                distance: formData.distance ? parseFloat(formData.distance) : null
            });
            setQuote(response.data);
            toast.success("Quote calculated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to calculate quote");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-fog">
            <header className="bg-ink text-white">
                <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link to="/" className="font-display text-xl font-bold">
                        Pragya<span className="text-signal"> Shipping</span>
                    </Link>
                    <Link to="/" className="text-sm text-white/70 hover:text-white transition">
                        ← Back to Home
                    </Link>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
                <p className="section-label">Pricing</p>
                <h1 className="section-title">Shipping quote calculator</h1>
                <p className="section-lead">Instant estimate based on weight, service type, and distance.</p>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <form onSubmit={calculateQuote} className="bg-white p-8 shadow-lg space-y-5">
                        <h2 className="font-display text-xl font-bold text-ink">Calculate</h2>

                        <div>
                            <label className="block text-sm font-medium text-muted mb-1.5">Weight (kg) *</label>
                            <input
                                type="number"
                                step="0.1"
                                required
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                className="input-field"
                                placeholder="e.g. 50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted mb-1.5">Service Type</label>
                            <select
                                value={formData.serviceType}
                                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                className="input-field"
                            >
                                <option value="STANDARD">Standard (3–5 days)</option>
                                <option value="EXPRESS">Express (1–2 days)</option>
                                <option value="PREMIUM">Premium (Same day)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted mb-1.5">Distance (km) — optional</label>
                            <input
                                type="number"
                                step="1"
                                value={formData.distance}
                                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                                className="input-field"
                                placeholder="e.g. 250"
                            />
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                            {loading ? "Calculating..." : "Calculate Quote"}
                        </button>
                    </form>

                    <div className="space-y-6">
                        {quote != null && (
                            <div className="bg-ink text-white p-8 animate-fade-up">
                                <p className="text-white/50 text-sm uppercase tracking-wider font-semibold">Your estimate</p>
                                <p className="font-display text-5xl font-extrabold text-signal mt-3">
                                    ₹{Number(quote).toFixed(2)}
                                </p>
                                <p className="text-white/55 mt-2">Estimated shipping cost</p>

                                <div className="mt-6 space-y-3 text-ink">
                                    <input
                                        className="input-field"
                                        placeholder="Your name"
                                        value={formData.customerName}
                                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                    />
                                    <input
                                        className="input-field"
                                        placeholder="Email"
                                        type="email"
                                        value={formData.customerEmail}
                                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                                    />
                                    <input
                                        className="input-field"
                                        placeholder="Phone"
                                        value={formData.customerPhone}
                                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        disabled={paying}
                                        onClick={async () => {
                                            if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
                                                toast.error("Name and phone required for payment");
                                                return;
                                            }
                                            try {
                                                setPaying(true);
                                                await startRazorpayPayment({
                                                    amount: Number(quote),
                                                    customerName: formData.customerName,
                                                    customerEmail: formData.customerEmail,
                                                    customerPhone: formData.customerPhone,
                                                    notes: `Quote ${formData.serviceType} ${formData.weight}kg`,
                                                    weight: parseFloat(formData.weight),
                                                    serviceType: formData.serviceType,
                                                    distance: formData.distance ? parseFloat(formData.distance) : null
                                                });
                                                toast.success("Payment successful");
                                            } catch (err) {
                                                toast.error(err.response?.data?.message || err.message || "Payment failed");
                                            } finally {
                                                setPaying(false);
                                            }
                                        }}
                                        className="btn-primary w-full disabled:opacity-50"
                                    >
                                        {paying ? "Opening payment..." : `Pay ₹${Number(quote).toFixed(2)}`}
                                    </button>
                                    <p className="text-white/45 text-xs">
                                        Razorpay test mode until live keys are added. UPI / card / netbanking.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="bg-white p-8 shadow-lg">
                            <h3 className="font-display text-xl font-bold text-ink mb-5">Rate guide</h3>
                            <div className="space-y-3">
                                {[
                                    { name: "Standard", detail: "3–5 days", rate: `₹${rates?.standardRate ?? 50}/kg` },
                                    { name: "Express", detail: "1–2 days", rate: `₹${rates?.expressRate ?? 80}/kg` },
                                    { name: "Premium", detail: "Same day", rate: `₹${rates?.premiumRate ?? 120}/kg` }
                                ].map((row) => (
                                    <div key={row.name} className="flex justify-between items-center py-3 border-b border-mist last:border-0">
                                        <div>
                                            <p className="font-semibold text-ink">{row.name}</p>
                                            <p className="text-sm text-muted">{row.detail}</p>
                                        </div>
                                        <span className="font-bold text-steel">{row.rate}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default QuoteCalculator;
