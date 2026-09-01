function WorkingProcess() {
    const steps = [
        {
            title: "Book",
            description: "Share pickup, delivery, and cargo details — get a clear plan."
        },
        {
            title: "Pickup",
            description: "Our team collects your goods from the location you specify."
        },
        {
            title: "In Transit",
            description: "Secure haul with status you can track when you need it."
        },
        {
            title: "Delivered",
            description: "On-time handover at destination, ready for your next move."
        }
    ];

    return (
        <section id="process" className="py-20 md:py-28 bg-mist">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="section-label">Working Process</p>
                    <h2 className="section-title">Four steps. Zero confusion.</h2>
                    <p className="section-lead">
                        A simple flow from booking to delivery — so you always know what happens next.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-0">
                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className="relative px-0 md:px-6 py-8 md:py-0 border-t md:border-t-0 md:border-l border-steel/20 first:border-l-0 first:border-t-0"
                        >
                            <span className="font-display text-5xl md:text-6xl font-extrabold text-steel/15">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-display text-xl font-bold text-ink mt-3">
                                {step.title}
                            </h3>
                            <p className="text-muted mt-3 leading-relaxed text-[0.98rem]">
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
