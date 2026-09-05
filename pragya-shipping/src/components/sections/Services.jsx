function Services() {
    const services = [
        {
            title: "Road Transportation",
            description: "Reliable interstate and regional hauls with end-to-end visibility and real-time status tracking.",
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h.01M16 17h.01M3 9l1.5-4.5h15L21 9M3 9v8a1 1 0 001 1h1m16-9v8a1 1 0 01-1 1h-1M5 18a2 2 0 104 0m6 0a2 2 0 104 0" />
                </svg>
            )
        },
        {
            title: "Customs Clearance",
            description: "Seamless documentation, import-export regulatory compliance, duty assessment, and swift customs clearance across all ports.",
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            title: "Ocean Freight",
            description: "Global maritime cargo forwarding, full container (FCL) & consolidated (LCL) freight solutions across major trade lanes.",
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15l2 3h14l2-3-4-8H7L3 15zM12 3v4m0 0l-3 3m3-3l3 3M2 20c2.5 1.5 5 1.5 7.5 0s5-1.5 7.5 0 5 1.5 7.5 0" />
                </svg>
            )
        }
    ];

    return (
        <section id="services" className="py-20 md:py-28 bg-ink-soft text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="section-label">Our Services</p>
                    <h2 className="section-title">Built for real logistics needs</h2>
                    <p className="section-lead">
                        Fast, dependable transport solutions tailored to your commercial cargo requirements.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
                    {services.map((service) => (
                        <article
                            key={service.title}
                            className="group bg-white/[0.04] p-8 border border-white/10 hover:border-signal/50 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-xl backdrop-blur-sm"
                        >
                            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-white/10 text-signal group-hover:bg-signal group-hover:text-ink transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="font-display text-xl font-bold mt-6 text-white">
                                {service.title}
                            </h3>
                            <p className="text-white/60 mt-3 leading-relaxed text-sm sm:text-base">
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
