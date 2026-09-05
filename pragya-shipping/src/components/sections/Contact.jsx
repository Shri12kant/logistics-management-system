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
        message: ""
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

        if (formData.name.trim().length < 2) {
            return toast.error("Please enter your name");
        }

        if (!formData.subject.trim()) {
            return toast.error("Please enter a subject");
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return toast.error("Please enter a valid email address");
        }

        if (formData.serviceType.trim() === "") {
            return toast.error("Please select a service type");
        }

        if (!formData.destinationPort.trim()) {
            return toast.error("Please enter destination port");
        }

        if (formData.message.trim().length < 5) {
            return toast.error("Please enter your message or shipment details");
        }

        try {
            setLoading(true);

            const combinedMessage = `[Subject: ${formData.subject.trim()}] [Destination Port: ${formData.destinationPort.trim()}]\n\n${formData.message.trim()}`;

            const payload = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phoneNumber: "+91 9999999999",
                serviceType: formData.serviceType,
                message: combinedMessage
            };

            await axios.post(
                `${API_BASE_URL}/api/contact`,
                payload
            );

            toast.success("Quick Quote Request Sent Successfully 🚚");

            setFormData({
                name: "",
                subject: "",
                email: "",
                serviceType: "",
                destinationPort: "",
                message: ""
            });

        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Unable to submit quote request. Please try again.");
            }
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
                                <a href="tel:+919867189827" className="hover:text-signal transition underline-offset-2 hover:underline">
                                    +91 98671 89827
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
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name Here"
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
                                placeholder="Subject"
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
                                placeholder="Email"
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
                                <option value="">Select Service</option>
                                <option value="Road Transportation">Road Transportation</option>
                                <option value="Ocean Freight">Ocean Freight</option>
                                <option value="Customs Clearance">Customs Clearance</option>
                                <option value="Railway Freight">Railway Freight</option>
                                <option value="Project Cargo">Project Cargo</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <input
                                type="text"
                                name="destinationPort"
                                placeholder="Destination Port"
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
                                placeholder="Your Message"
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