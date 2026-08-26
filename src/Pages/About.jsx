import React from "react";
import aboutTruck from "../assets/About-truck.webp";

function About() {
    return (
        <section id="about"className="scroll-mt-24 py-20 bg-sky-200">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                {/* Left Side Image */}
                <div className="md:w-1/2">
                    <img
                        src={aboutTruck}
                        alt="About Pragya Shipping"
                        className="w-full rounded-2xl shadow-xl"
                    />
                </div>

                {/* Right Side Content */}
                <div className="md:w-1/2">

                    <h4 className="text-blue-600 font-semibold uppercase tracking-wider">
                        About Us
                    </h4>

                    <h2 className="text-4xl font-bold text-gray-900 mt-3">
                        Your Trusted Transportation Partner
                    </h2>

                    <p className="text-gray-600 mt-6 leading-8">
                        Pragya Shipping provides safe, reliable, and efficient
                        transportation services across India. Our mission is to deliver
                        goods on time while maintaining the highest standards of safety
                        and customer satisfaction.
                    </p>

                    {/* Features */}
                    <div className="mt-8 space-y-4">

                        <div className="flex items-center gap-3">
                            <span className="text-green-500 text-xl">✔</span>
                            <p className="text-gray-700">Safe & Secure Transportation</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-500 text-xl">✔</span>
                            <p className="text-gray-700">On-Time Delivery</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-500 text-xl">✔</span>
                            <p className="text-gray-700">Experienced Drivers & Team</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-500 text-xl">✔</span>
                            <p className="text-gray-700">24/7 Customer Support</p>
                        </div>

                    </div>

                    {/* Button */}
                    <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        Learn More
                    </button>

                </div>

            </div>
        </section>
    );
}

export default About;