function Services() {
    const services = [
        {
            title: "Road Transportation",
            description: "Reliable interstate and regional hauls with end-to-end visibility.",
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h.01M16 17h.01M3 9l1.5-4.5h15L21 9M3 9v8a1 1 0 001 1h1m16-9v8a1 1 0 01-1 1h-1M5 18a2 2 0 104 0m6 0a2 2 0 104 0" />
                </svg>
            )
        },
        {
            title: "Goods Delivery",
            description: "Commercial cargo handled carefully from warehouse to destination.",
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            title: "Fruit Transport",
            description: "Time-sensitive produce moved with care to protect freshness.",
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.5 2.5 2 4 4 4-1 3-3.5 5-7 5s-6-2-7-5c2 0 3.5-1.5 4-4 1 1.5 3 2.5 6 0zM5 17c2 2 5 3 7 3s5-1 7-3" />
                </svg>
            )
        },
        {
            title: "Full Truck Load",
            description: "Dedicated vehicles for bulk consignments and exclusive routes.",
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v10H3V7zm11 3h4l3 3v4h-7v-7zM7 20a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
            )
        },
        {
            title: "Warehousing",
            description: "Secure storage support when your supply chain needs buffer space.",
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V9l8-5 8 5v12M8 21v-6h8v6" />
                </svg>
            )
        },
        {
            title: "24/7 Support",
            description: "A team ready to assist with bookings, updates, and coordination.",
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.5l1.5 4-2 1.5a12 12 0 005.5 5.5L14 12.5l4 1.5V18a2 2 0 01-2 2A15 15 0 013 5z" />
                </svg>
            )
        }
    ];

    return (
        <section id="services" className="py-20 md:py-28 bg-mist">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="section-label">Our Services</p>
                    <h2 className="section-title">Built for real logistics needs</h2>
                    <p className="section-lead">
                        From local drops to long-haul FTLs — choose the service that fits your cargo.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
                    {services.map((service) => (
                        <article
                            key={service.title}
                            className="group bg-white p-8 border border-transparent hover:border-steel/20 transition-all duration-300 hover:-translate-y-1 shadow-[0_12px_40px_-20px_rgba(10,22,40,0.35)]"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-ink text-signal group-hover:bg-steel transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="font-display text-xl font-bold mt-6 text-ink">
                                {service.title}
                            </h3>
                            <p className="text-muted mt-3 leading-relaxed">
                                {service.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;
