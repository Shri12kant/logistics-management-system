import React from "react";

function Services() {
    const services = [
        {
            title: "Road Transportation",
            description: "Safe and reliable transportation services across India.",
            icon: "🚛",
        },
        {
            title: "Goods Delivery",
            description: "Fast delivery of commercial goods with complete safety.",
            icon: "📦",
        },
        {
            title: "Fruit Transportation",
            description: "Special transportation for fruits and perishable products.",
            icon: "🍌",
        },
        {
            title: "Full Truck Load",
            description: "Dedicated trucks for large shipments and bulk transport.",
            icon: "🚚",
        },
        {
            title: "Warehousing",
            description: "Secure storage and warehouse management solutions.",
            icon: "🏢",
        },
        {
            title: "24/7 Support",
            description: "Our support team is available anytime to assist you.",
            icon: "📞",
        },
    ];

    return (
        <section id="services" className="py-20 bg-sky-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center">
                    <h4 className="text-blue-600 font-semibold uppercase">
                        Our Services
                    </h4>

                    <h2 className="text-4xl font-bold mt-3">
                        What We Offer
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        We provide reliable transportation and logistics solutions with
                        safety, speed, and customer satisfaction as our top priorities.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        >
                            <div className="text-5xl">{service.icon}</div>

                            <h3 className="text-2xl font-semibold mt-5">
                                {service.title}
                            </h3>

                            <p className="text-gray-600 mt-3">
                                {service.description}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}

export default Services;