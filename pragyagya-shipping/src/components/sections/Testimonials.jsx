function Testimonials() {
    const testimonials = [
        {
            name: "Shrikant Kushwaha",
            company: "ABC Traders",
            review:
                "PRAGYA SHIPPING AND LOGISTICS delivers safely and on time. Professional team — we trust them with regular consignments."
        },
        {
            name: "Priya Verma",
            company: "Fresh Fruits Pvt. Ltd.",
            review:
                "Excellent for produce runs. Clear communication and careful handling every trip."
        },
        {
            name: "Amit Singh",
            company: "Singh Enterprises",
            review:
                "Years of reliable service. Timely delivery and safe handling keep our operations smooth."
        }
    ];

    return (
        <section id="testimonials" className="py-20 md:py-28 bg-fog">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="section-label">Testimonials</p>
                    <h2 className="section-title">Clients who move with us</h2>
                    <p className="section-lead">
                        Real feedback from businesses that depend on dependable transport.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
                    {testimonials.map((item) => (
                        <blockquote
                            key={item.name}
                            className="bg-white p-8 border-l-4 border-signal shadow-[0_12px_40px_-24px_rgba(10,22,40,0.4)]"
                        >
                            <p className="text-ink/80 leading-relaxed text-lg">
                                “{item.review}”
                            </p>
                            <footer className="mt-8">
                                <cite className="not-italic font-display font-bold text-ink text-lg">
                                    {item.name}
                                </cite>
                                <p className="text-steel text-sm mt-1 font-medium">
                                    {item.company}
                                </p>
                            </footer>
                        </blockquote>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
