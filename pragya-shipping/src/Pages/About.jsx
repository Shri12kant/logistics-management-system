import { Link } from "react-router-dom";
import aboutTruck from "../assets/About-truck.webp";

function About() {
    const points = [
        "Ocean & Air Freight Forwarding",
        "Customs Clearance & Documentation Support",
        "Project Cargo & Transportation Across India"
    ];

    return (
        <section id="about" className="scroll-mt-24 py-20 md:py-28 bg-ink-soft text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Visual Imagery */}
                <div className="relative">
                    <div className="absolute -inset-3 bg-signal/10 rounded-3xl -rotate-2" />
                    <img
                        src={aboutTruck}
                        alt="PRAGYA SHIPPING AND LOGISTICS Freight Forwarding"
                        className="relative w-full rounded-2xl object-cover shadow-2xl aspect-[4/3] border border-white/10"
                    />
                </div>

                <div>
                    <p className="section-label">About Us</p>
                    <h2 className="section-title uppercase">
                        About Us
                    </h2>
                    <p className="section-lead text-white/90">
                        Pragya Shipping and Logistics Started in 2021 in Mumbai, and Pragya Shipping and Logistics is a trusted freight forwarding company in India located in Mumbai and deliver across all the major cities in India.
                    </p>
                    <p className="mt-4 text-white/75 leading-relaxed text-base">
                        The company specializes in Ocean & Air freight forwarding, custom clearance, Project Cargo and transportation. We have a reputation of delivering professional service with personalized touch. Our vast & varied experience in the freight forwarding industry enables us to cater to the specific requirements of our customers at all the times.
                    </p>

                    <ul className="mt-8 space-y-3.5">
                        {points.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-white/90">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal text-xs font-bold">
                                    ✓
                                </span>
                                <span className="text-[1.05rem] font-medium">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <a href="#contact" className="btn-primary">
                            Request a Quote
                        </a>
                        <a href="#services" className="btn-ghost">
                            Our Services
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
