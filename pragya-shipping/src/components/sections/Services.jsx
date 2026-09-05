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
            description: "Commercial cargo handled carefully from origin to destination.",
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            title: "Customs Clearance",
            description: "Seamless documentation, compliance, and swift clearance for consignments.",
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                        Fast, dependable transport solutions tailored to your cargo requirements.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
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
