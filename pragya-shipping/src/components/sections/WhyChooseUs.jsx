function WhyChooseUs() {
    const features = [
        {
            title: "Safe Transportation",
            description: "Cargo handled with care — secured loading, monitored routes, and responsible crew protocols."
        },
        {
            title: "On-Time Delivery",
            description: "Strict schedule discipline. We plan optimized routes to consistently meet your delivery windows."
        },
        {
            title: "Pan-India Reach",
            description: "Connected freight lanes across major commercial cities, states, and economic hubs."
        },
        {
            title: "Always Reachable",
            description: "Direct status updates and active coordination whenever you need milestone ETAs."
        }
    ];

    return (
        <section id="why-choose-us" className="py-20 md:py-28 bg-ink-soft text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="text-signal text-xs font-bold tracking-[0.14em] uppercase">
                        Why Choose Us
                    </p>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 leading-tight text-white">
                        Why businesses stay with PRAGYA SHIPPING AND LOGISTICS
                    </h2>
                    <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-xl">
                        Reliability is not a slogan here — it is how every single consignment is executed.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    {features.map((feature, index) => (
                        <div key={feature.title} className="bg-white/[0.04] border border-white/10 p-6 rounded-xl hover:border-signal/40 transition-all duration-300">
                            <span className="font-display text-signal text-sm font-bold">
                                0{index + 1}
                            </span>
                            <h3 className="font-display text-xl font-bold mt-3 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-white/60 mt-3 leading-relaxed text-sm">
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
