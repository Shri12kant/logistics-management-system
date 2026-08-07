import React from "react";
import heroTruck from "../../assets/Hero-truck.jpg";

function Hero() {
    return (
        <section id="home"className="bg-sky-200 pt-20 max-w-7xl mx-auto py-16 min-h-screen flex flex-col justify-center">

            {/* Hero Content */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10">

                {/* Left Side */}
                <div className="md:w-1/2">

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                        Reliable
                    </h1>

                    <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mt-2">
                        Transportation
                    </h1>

                    <p className="mt-6 text-lg text-gray-700 leading-8">
                        Fast, Safe and Trusted Logistics Solutions Across India.
                        We ensure your goods are delivered securely and on time.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex gap-4">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                            Get Quote
                        </button>

                        <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition">
                            Contact Us
                        </button>
                    </div>

                </div>

                {/* Right Side */}
                <div className="md:w-1/2">
                    <img
                        src={heroTruck}
                        alt="Transportation Truck"
                        className="w-full rounded-2xl shadow-2xl"
                    />
                </div>

            </div>
            {/* Statistics */}
            <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
                    <h2 className="text-3xl font-bold text-blue-600">500+</h2>
                    <p className="text-gray-600 mt-2">Deliveries</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
                    <h2 className="text-3xl font-bold text-blue-600">100+</h2>
                    <p className="text-gray-600 mt-2">Happy Clients</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
                    <h2 className="text-3xl font-bold text-blue-600">50+</h2>
                    <p className="text-gray-600 mt-2">Trucks</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
                    <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
                    <p className="text-gray-600 mt-2">Support</p>
                </div>

            </div>

        </section>
    );
}


export default Hero;