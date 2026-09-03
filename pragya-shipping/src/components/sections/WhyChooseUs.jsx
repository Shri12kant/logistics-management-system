function WhyChooseUs() {
    const features = [
        {
            title: "Safe Transportation",
            description: "Cargo handled with care — secured loading, monitored routes, responsible crews."
        },
        {
            title: "On-Time Delivery",
            description: "Schedules matter. We plan routes to meet your delivery windows."
        },
        {
            title: "Pan-India Reach",
            description: "Connected lanes across cities and states for growing businesses."
        },
        {
            title: "Experienced Drivers",
            description: "Skilled drivers who know the roads and respect your freight."
        },
        {
            title: "Always Reachable",
            description: "Updates and support when you need status, ETA, or coordination."
        },
        {
            title: "Fair Pricing",
            description: "Clear quotes without surprise costs — value that scales with you."
        }
    ];

    return (
        <section id="why-choose-us" className="py-20 md:py-28 bg-ink text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="text-signal text-xs font-bold tracking-[0.14em] uppercase">
                        Why Choose Us
                    </p>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 leading-tight">
                        Why businesses stay with PRAGYA SHIPPING AND LOGISTICS
                    </h2>
                    <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-xl">
                        Reliability is not a slogan here — it is how every consignment is run.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mt-16">
                    {features.map((feature, index) => (
                        <div key={feature.title} className="border-t border-white/15 pt-6">
                            <span className="font-display text-signal text-sm font-bold">
                                0{index + 1}
                            </span>
                            <h3 className="font-display text-xl font-bold mt-3">
                                {feature.title}
                            </h3>
                            <p className="text-white/55 mt-3 leading-relaxed">
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
