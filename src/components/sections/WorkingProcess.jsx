import React from "react";

function WorkingProcess() {
    const steps = [
        {
            icon: "📞",
            title: "Book Order",
            description:
                "Contact us and book your transportation service with ease.",
        },
        {
            icon: "📦",
            title: "Pickup Goods",
            description:
                "Our team picks up your goods safely from the specified location.",
        },
        {
            icon: "🚛",
            title: "Transportation",
            description:
                "Your shipment is transported securely using our modern fleet.",
        },
        {
            icon: "✅",
            title: "Safe Delivery",
            description:
                "We deliver your goods safely and on time to the destination.",
        },
    ];

    return (
        <section id="process" className="py-20 bg-sky-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center">
                    <h4 className="text-blue-600 uppercase font-semibold">
                        Working Process
                    </h4>

                    <h2 className="text-4xl font-bold mt-3 text-gray-900">
                        How We Work
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Our transportation process is simple, efficient, and designed
                        to ensure your goods reach their destination safely.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-2xl p-8 shadow-lg text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        >
                            {/* Step Number */}
                            <div className="absolute -top-4 -right-4 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                {index + 1}
                            </div>

                            {/* Icon */}
                            <div className="text-6xl">
                                {step.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold mt-6">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mt-4 leading-7">
                                {step.description}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default WorkingProcess;