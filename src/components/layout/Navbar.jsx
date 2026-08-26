import React from "react";
import WorkingProcess from "../sections/WorkingProcess.jsx";

export function Navbar() {
    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full bg-sky-200 shadow-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <a href="#" className="text-xl font-bold text-blue-600">
                                Pragya-Shipping
                            </a>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <a href="#home" className="text-gray-700 hover:text-blue-600">
                                Home
                            </a>
                            <a href="#about" className="text-gray-700 hover:text-blue-600">
                                About
                            </a>
                            <a href="#services" className="text-gray-700 hover:text-blue-600">
                                Services
                            </a>
                            <a href="#why-choose-us" className="text-gray-700 hover:text-blue-600">
                                WhyChooseUs
                            </a>
                            <a href="#fleet" className="text-gray-700 hover:text-blue-600">
                                Fleet
                            </a>
                            <a href="#process" className="text-gray-700 hover:text-blue-600">
                                WorkingProcess
                            </a>
                            <a href="#testimonials" className="text-gray-700 hover:text-blue-600">
                                Testimonials
                            </a>
                            <a href="#contact" className="text-gray-700 hover:text-blue-600">
                                Contact
                            </a>

                        </div>

                    </div>
                </div>
            </nav>
        </>
    );
}