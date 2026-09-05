import { Link } from "react-router-dom";
import aboutTruck from "../assets/About-truck.webp";

function About() {
    const points = [
        "Pan-India Road Transportation Network",
        "Door-to-Door Delivery & Last-Mile Connectivity",
        "Customs Clearance & Documentation Support",
        "GPS-Enabled Tracking & Route Monitoring",
        "Round-the-clock Customer Assistance"
    ];

    return (
        <section id="about" className="scroll-mt-24 py-20 md:py-28 bg-fog">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Visual Imagery - Clean Standalone Road Fleet Image */}
                <div className="relative">
                    <div className="absolute -inset-3 bg-steel/15 rounded-3xl -rotate-2" />
                    <img
                        src={aboutTruck}
                        alt="Road Transport Fleet by PRAGYA SHIPPING AND LOGISTICS"
                        className="relative w-full rounded-2xl object-cover shadow-xl aspect-[4/3]"
                    />
                </div>

                <div>
                    <p className="section-label">About Us</p>
                    <h2 className="section-title">
                        Your trusted logistics & road transport partner
                    </h2>
                    <p className="section-lead">
                        PRAGYA SHIPPING AND LOGISTICS provides dependable, end-to-end transportation services across India. 
                        With verified drivers, strict safety standards, and clear timelines, we ensure your commercial freight arrives on schedule every single time.
                    </p>

                    <ul className="mt-8 space-y-3.5">
                        {points.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-ink">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/20 text-steel text-xs font-bold">
                                    ✓
                                </span>
                                <span className="text-[1.05rem] font-medium">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <Link to="/quote" className="btn-steel">
                            Request a Quote
                        </Link>
                        <a href="#railway" className="btn-primary">
                            Railway Freight Services
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
