import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "../../api/config";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        email: "",
        serviceType: "",
        destinationPort: "",
        message: "",
        botcheck: "" // 🍯 Honeypot anti-bot security field (invisible to humans)
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🛡️ 1. Anti-Bot Trap: If honeypot is filled by an automated bot, silently drop
        if (formData.botcheck && formData.botcheck.trim() !== "") {
            console.warn("Spam bot detected and blocked.");
            toast.success("Quick Quote Request Sent Successfully 🚚");
            return;
        }

        // 🛡️ 2. Strict Input Validation (Only genuine requests allowed)
        if (formData.name.trim().length < 2) {
            return toast.error("Please enter your genuine name (min 2 characters)");
        }

        if (formData.subject.trim().length < 2) {
            return toast.error("Please enter a valid subject");
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email.trim())) {
            return toast.error("Please enter a valid email address");
        }

        if (!formData.serviceType.trim()) {
            return toast.error("Please select the required service");
        }

        if (formData.destinationPort.trim().length < 2) {
            return toast.error("Please enter destination port");
        }

        if (formData.message.trim().length < 5) {
            return toast.error("Please enter your message or shipment details (min 5 characters)");
        }

        try {
            setLoading(true);

            const combinedMessage = `[Subject: ${formData.subject.trim()}] [Service: ${formData.serviceType.trim()}] [Destination Port: ${formData.destinationPort.trim()}]\n\n${formData.message.trim()}`;

            const payload = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phoneNumber: "+91 98671 89821",
                serviceType: formData.serviceType,
                message: combinedMessage
            };

            // 1. Save to Backend Database
            try {
                await axios.post(`${API_BASE_URL}/api/contact`, payload);
            } catch (backendErr) {
                console.warn("Backend logging:", backendErr);
            }

            // 2. Direct Email Notification via Web3Forms (Official Pragya Shipping)
            try {
                const emailResponse = await axios.post(
                    "https://api.web3forms.com/submit",
                    {
                        access_key: "59da4f5d-c41f-4383-a87c-d186b42b6627",
                        from_name: `${formData.name.trim()} (Pragya Shipping Web Inquiry)`,
                        subject: `New Quote Request: ${formData.subject.trim()} - ${formData.serviceType.trim()}`,
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        subject_title: formData.subject.trim(),
                        service_needed: formData.serviceType.trim(),
                        destination_port: formData.destinationPort.trim(),
                        message: formData.message.trim()
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    }
                );
                if (emailResponse.data?.success) {
                    console.log("Email notification dispatched successfully!");
                }
            } catch (emailErr) {
                console.warn("Email alert dispatch:", emailErr);
            }

            toast.success("Quick Quote Request Sent Successfully 🚚 We will email you back shortly!");

            setFormData({
                name: "",
                subject: "",
                email: "",
                serviceType: "",
                destinationPort: "",
                message: "",
                botcheck: ""
            });

        } catch (error) {
            console.error(error);
            toast.error("Unable to submit quote request. Please try again or email us directly at exp.sales@pragyashipping.in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 md:py-28 bg-ink text-white">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-start">
                <div>
                    <p className="text-signal text-xs font-bold tracking-[0.14em] uppercase">
                        Request A Quick Quote
                    </p>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 leading-tight">
                        Request A Quick Quote
                    </h2>
                    <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-md">
                        Tell us where your cargo needs to go. Fill the details below and our logistics experts will promptly get back to you with competitive pricing and timelines.
                    </p>

                    <div className="mt-10 space-y-6 text-white/80">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-signal font-bold">Office Address</p>
                            <p className="mt-1.5 text-sm leading-relaxed text-white/90">
                                Room No. 4611, Raigad Galli, Rupa Devi Pada No. 1, Rd. No. 33, Indira Nagar, Wagle Estate, Thane (W), Maharashtra - 400 604.
                            </p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-signal font-bold">Phone Number</p>
                            <p className="mt-1.5 text-sm text-white/90">
                                <a href="tel:+919867189821" className="hover:text-signal transition underline-offset-2 hover:underline">
                                    +91 98671 89821
                                </a>
                            </p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-signal font-bold">Email Address</p>
                            <p className="mt-1.5 text-sm text-white/90">
                                <a href="mailto:exp.sales@pragyashipping.in" className="hover:text-signal transition underline-offset-2 hover:underline">
                                    exp.sales@pragyashipping.in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white/[0.04] border border-white/10 text-white p-8 md:p-10 shadow-2xl rounded-2xl backdrop-blur-md"
                >
                    {/* 🍯 Invisible Honeypot field to trap spambots */}
                    <input
                        type="checkbox"
                        name="botcheck"
                        className="hidden"
                        style={{ display: "none" }}
                        checked={!!formData.botcheck}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name Here *"
                                value={formData.name}
                                onChange={handleChange}
                                className="input-field-dark"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject *"
                                value={formData.subject}
                                onChange={handleChange}
                                className="input-field-dark"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address *"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field-dark"
                                required
                            />
                        </div>

                        <div>
                            <select
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleChange}
                                className="input-field-dark"
                                required
                            >
                                <option value="">Select Service Needed *</option>
                                <option value="Road Transportation">Road Transportation (Full & Part Truck Load)</option>
                                <option value="Ocean Freight">Ocean Freight (FCL / LCL Container Cargo)</option>
                                <option value="Customs Clearance">Customs Clearance (CHA & Documentation)</option>
                                <option value="Railway Freight">Railway Freight & Bulk Cargo</option>
                                <option value="Project Cargo">Project Cargo & Heavy Lift</option>
                                <option value="Other Logistics Services">Other Logistics Services</option>
                            </select>
                        </div>

                        <div>
                            <input
                                type="text"
                                name="destinationPort"
                                placeholder="Destination Port *"
                                value={formData.destinationPort}
                                onChange={handleChange}
                                className="input-field-dark"
                                required
                            />
                        </div>

                        <div>
                            <textarea
                                rows="4"
                                name="message"
                                placeholder="Your Message / Cargo Details *"
                                value={formData.message}
                                onChange={handleChange}
                                className="input-field-dark resize-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-6 py-3.5 font-bold transition flex items-center justify-center gap-2 ${
                            loading
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                : "btn-primary"
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-[#0a1628]" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                <span>Sending Request...</span>
                            </>
                        ) : (
                            "Request A Quick Quote"
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;