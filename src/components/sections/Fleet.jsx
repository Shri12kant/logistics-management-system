import React from "react";
import truck1 from "../../assets/truck1.jpg";
import truck2 from "../../assets/truck2.jpg";
import truck3 from "../../assets/truck3.jpg";
import truck4 from "../../assets/truck4.jpg";
function Fleet() {
    const fleet = [
        {
            image: truck1,
            title: "Mini Truck",
            description: "Perfect for local deliveries and small shipments.",
        },
        {
            image: truck2,
            title: "Container Truck",
            description: "Designed for long-distance and bulk transportation.",
        },
        {
            image: truck3,
            title: "Refrigerated Truck",
            description: "Ideal for transporting fruits and perishable goods.",
        },
        {
            image: truck4,
            title: "Heavy Cargo Truck",
            description: "Suitable for heavy industrial and commercial cargo.",
        },
    ];

    return (
        <section id="fleet"className="py-20 bg-sky-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center">
                    <h4 className="text-blue-600 uppercase font-semibold">
                        Our Fleet
                    </h4>

                    <h2 className="text-4xl font-bold mt-3 text-gray-900">
                        Vehicles We Operate
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Our modern fleet is equipped to transport all types of goods
                        safely and efficiently across India.
                    </p>
                </div>

                {/* Fleet Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

                    {fleet.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 mt-3 leading-7">
                                    {item.description}
                                </p>

                                <button className="mt-5 text-blue-600 font-semibold hover:text-blue-800">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default Fleet;