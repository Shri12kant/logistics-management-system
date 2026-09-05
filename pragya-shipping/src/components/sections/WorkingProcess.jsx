function WorkingProcess() {
    const steps = [
        {
            title: "Book",
            description: "Share pickup, delivery, and cargo specifications — receive a clear transit schedule."
        },
        {
            title: "Pickup",
            description: "Our verified ground crew collects your goods directly from the origin point."
        },
        {
            title: "In Transit",
            description: "Monitored multimodal transport with active milestone status tracking."
        },
        {
            title: "Delivered",
            description: "Punctual handover at your destination, inspected and signed off."
        }
    ];

    return (
        <section id="process" className="py-20 md:py-28 bg-ink text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="section-label">Working Process</p>
                    <h2 className="section-title">Four steps. Zero confusion.</h2>
                    <p className="section-lead">
                        A streamlined flow from booking to delivery — so you always know what happens next.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className="bg-white/[0.03] border border-white/10 p-7 rounded-xl relative hover:border-signal/30 transition-all duration-300"
                        >
                            <span className="font-display text-4xl md:text-5xl font-extrabold text-signal/40">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-display text-xl font-bold text-white mt-4">
                                {step.title}
                            </h3>
                            <p className="text-white/60 mt-2.5 leading-relaxed text-sm">
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
