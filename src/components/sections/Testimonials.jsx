import React from "react";

function Testimonials() {
    const testimonials = [
        {
            name: "Shrikant Kushwaha",
            company: "ABC Traders",
            review:
                "Pragya Shipping always delivers our goods safely and on time. Their service is reliable and professional.",
        },
        {
            name: "Priya Verma",
            company: "Fresh Fruits Pvt. Ltd.",
            review:
                "Excellent transportation service with great customer support. Highly recommended for logistics solutions.",
        },
        {
            name: "Amit Singh",
            company: "Singh Enterprises",
            review:
                "We have been working with Pragya Shipping for years. Their timely delivery and safe handling are outstanding.",
        },
    ];

    return (
        <section id="testimonials" className="py-20 bg-sky-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center">
                    <h4 className="text-blue-600 uppercase font-semibold">
                        Testimonials
                    </h4>

                    <h2 className="text-4xl font-bold mt-3 text-gray-900">
                        What Our Clients Say
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Customer satisfaction is our highest priority. Here's what our
                        clients say about our transportation services.
                    </p>
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 rounded-2xl p-8 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Stars */}
                            <div className="text-yellow-500 text-2xl">
                                ⭐⭐⭐⭐⭐
                            </div>

                            {/* Review */}
                            <p className="text-gray-600 mt-6 leading-7 italic">
                                "{item.review}"
                            </p>

                            {/* Client */}
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {item.name}
                                </h3>

                                <p className="text-blue-600">
                                    {item.company}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;