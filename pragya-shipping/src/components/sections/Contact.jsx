import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "../../api/config";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        serviceType: "",
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

        if (formData.name.trim().length < 3) {
            return toast.error("Name must be at least 3 characters");
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return toast.error("Invalid Email Address");
        }

        if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
            return toast.error("Enter a valid 10 digit phone number");
        }

        if (formData.serviceType.trim() === "") {
            return toast.error("Service Type is required");
        }

        if (formData.message.trim().length < 10) {
            return toast.error("Message should be at least 10 characters");
        }

        try {

            setLoading(true);

            const response = await axios.post(
                `${API_BASE_URL}/api/contact`,
                formData
            );

            console.log(response.data);

            toast.success("Message Sent Successfully 🚚");

            setFormData({
                name: "",
                email: "",
                phoneNumber: "",
                serviceType: "",
                message: ""
            });

        } catch (error) {

            console.error(error);

            if (error.response) {
                toast.error(error.response.data.message || "Server Error");
            } else {
                toast.error("Unable to connect to server");
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
                        Contact Us
                    </p>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 leading-tight">
                        Tell us where it needs to go
                    </h2>
                    <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-md">
                        Share your requirement — we will get back with the right vehicle and timeline.
                    </p>

                    <div className="mt-10 space-y-6 text-white/80">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">Address</p>
                            <p className="mt-1">Mainpuri, Uttar Pradesh, India</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">Phone</p>
                            <p className="mt-1">+91 XXXXX XXXXX</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">Email</p>
                            <p className="mt-1">info@pragyashipping.com</p>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white/[0.04] border border-white/10 text-white p-8 md:p-10 shadow-2xl rounded-2xl backdrop-blur-md"
                >
                    <div className="space-y-4">
                        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="input-field-dark" required />
                        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="input-field-dark" required />
                        <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} maxLength={10} className="input-field-dark" required />
                        <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="input-field-dark" required>
                            <option value="">Select service</option>
                            <option value="Road Transportation">Road Transportation</option>
                            <option value="Goods Delivery">Goods Delivery</option>
                            <option value="Customs Clearance">Customs Clearance</option>
                            <option value="Other">Other</option>
                        </select>
                        <textarea rows="5" name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} className="input-field-dark resize-none" required />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-6 py-3.5 font-bold transition ${
                            loading
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "btn-primary"
                        }`}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;