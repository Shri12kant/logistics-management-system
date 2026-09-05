import { Link } from "react-router-dom";
import trainCargo from "../assets/traincargo.jpg";
import aboutTruck from "../assets/About-truck.webp";

function About() {
    const points = [
        "Railway Transportation & Bulk Freight Corridors",
        "Ocean Shipping & Port-to-Port Container Handling",
        "Customs Clearance, Documentation & Regulatory Compliance",
        "Safe & Reliable Pan-India Road Transportation",
        "Round-the-clock Operational Tracking & Support"
    ];

    return (
        <section id="about" className="scroll-mt-24 py-20 md:py-28 bg-fog">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Visual Imagery - Railway & Road Freight */}
                <div className="relative">
                    <div className="absolute -inset-3 bg-steel/15 rounded-3xl -rotate-2" />
                    <img
                        src={trainCargo}
                        alt="Railway Cargo and Multimodal Logistics by PRAGYA SHIPPING AND LOGISTICS"
                        className="relative w-full rounded-2xl object-cover shadow-xl aspect-[4/3]"
                    />
                    <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-white p-3.5 shadow-2xl rounded-xl border border-mist max-w-xs">
                        <img
                            src={aboutTruck}
                            alt="Road transport fleet"
                            className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div>
                            <p className="text-xs font-bold text-ink uppercase tracking-wider">Rail & Road Sync</p>
                            <p className="text-[11px] text-muted">Door-to-door multimodal freight</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="section-label">About Us</p>
                    <h2 className="section-title">
                        Multimodal Logistics & Freight Solutions
                    </h2>
                    <p className="section-lead">
                        PRAGYA SHIPPING AND LOGISTICS provides end-to-end multimodal transport across India and beyond — 
                        seamlessly connecting Road, Rail, Ocean Shipping, and Customs Clearance to keep your supply chain moving.
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
                        <a href="#mission" className="btn-primary">
                            Our Mission & Project Cargo
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
