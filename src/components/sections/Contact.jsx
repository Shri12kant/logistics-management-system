import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
                "http://localhost:8080/api/contact",
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
        <section id="contact" className="py-20 bg-sky-200">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center">

                    <h4 className="text-blue-600 uppercase font-semibold">
                        Contact Us
                    </h4>

                    <h2 className="text-4xl font-bold mt-3">
                        Get In Touch
                    </h2>

                    <p className="text-gray-600 mt-4">
                        Have questions? We'd love to hear from you.
                    </p>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-14">

                    {/* LEFT SIDE */}

                    <div>

                        <h3 className="text-2xl font-bold mb-6">
                            Contact Information
                        </h3>

                        <div className="space-y-6">

                            <div>
                                <h4 className="font-semibold">📍 Address</h4>
                                <p className="text-gray-600">
                                    Mainpuri, Uttar Pradesh, India
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold">📞 Phone</h4>
                                <p className="text-gray-600">
                                    +91 XXXXX XXXXX
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold">📧 Email</h4>
                                <p className="text-gray-600">
                                    info@pragyashipping.com
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded-2xl shadow-lg"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg mb-4"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg mb-4"
                            required
                        />

                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            maxLength={10}
                            className="w-full border p-3 rounded-lg mb-4"
                            required
                        />

                        <input
                            type="text"
                            name="serviceType"
                            placeholder="Service Type"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg mb-4"
                            required
                        />

                        <textarea
                            rows="5"
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg mb-6"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                    </form>

                </div>

            </div>

        </section>
    );
}

export default Contact;