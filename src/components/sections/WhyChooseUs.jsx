import React from "react";

function WhyChooseUs() {
    const features = [
        {
            icon: "🛡️",
            title: "Safe Transportation",
            description:
                "We ensure your goods are transported safely with complete care and security.",
        },
        {
            icon: "⏰",
            title: "On-Time Delivery",
            description:
                "We value your time and always strive to deliver shipments on schedule.",
        },
        {
            icon: "🌍",
            title: "Pan India Network",
            description:
                "Our transportation services cover multiple cities and states across India.",
        },
        {
            icon: "👨‍✈️",
            title: "Experienced Drivers",
            description:
                "Our skilled drivers ensure safe and efficient transportation of your goods.",
        },
        {
            icon: "📞",
            title: "24/7 Customer Support",
            description:
                "Our support team is available around the clock to assist you anytime.",
        },
        {
            icon: "💰",
            title: "Affordable Pricing",
            description:
                "We offer cost-effective transportation solutions without compromising quality.",
        },
    ];

    return (
        <section id="why-choose-us" className="py-20 bg-sky-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center">
                    <h4 className="text-blue-600 uppercase font-semibold">
                        Why Choose Us
                    </h4>

                    <h2 className="text-4xl font-bold text-gray-900 mt-3">
                        Why Businesses Trust Pragya Shipping
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        We are committed to providing reliable, secure, and timely
                        transportation services with complete customer satisfaction.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-2xl p-8 shadow-md hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        >
                            <div className="text-5xl">{feature.icon}</div>

                            <h3 className="text-2xl font-semibold mt-5">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 mt-4 leading-7">
                                {feature.description}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default WhyChooseUs;