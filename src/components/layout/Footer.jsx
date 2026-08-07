import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Company */}
                <div>
                    <h2 className="text-2xl font-bold">
                        Pragya Shipping
                    </h2>

                    <p className="text-gray-400 mt-4">
                        Safe, reliable, and trusted transportation solutions across India.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Quick Links
                    </h3>

                    <ul className="space-y-2 text-gray-400">
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Contact</li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Services
                    </h3>

                    <ul className="space-y-2 text-gray-400">
                        <li>Road Transport</li>
                        <li>Goods Delivery</li>
                        <li>Fruit Transport</li>
                        <li>Warehousing</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Contact
                    </h3>

                    <p className="text-gray-400">
                        📍 Mainpuri, India
                    </p>

                    <p className="text-gray-400 mt-2">
                        📞 +91 XXXXX XXXXX
                    </p>

                    <p className="text-gray-400 mt-2">
                        📧 info@pragyashipping.com
                    </p>
                </div>

            </div>

            <hr className="border-gray-700 my-8" />

            <p className="text-center text-gray-500">
                © 2026 Pragya Shipping. All Rights Reserved.
            </p>

        </footer>
    );
}

export default Footer;