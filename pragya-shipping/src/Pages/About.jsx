import { Link } from "react-router-dom";
import aboutTruck from "../assets/About-truck.webp";

function About() {
    const points = [
        "Safe & secure transportation",
        "On-time delivery commitment",
        "Experienced drivers & crew",
        "Round-the-clock support"
    ];

    return (
        <section id="about" className="scroll-mt-24 py-20 md:py-28 bg-fog">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="relative">
                    <div className="absolute -inset-3 bg-steel/15 rounded-3xl -rotate-2" />
                    <img
                        src={aboutTruck}
                        alt="About PRAGYA SHIPPING AND LOGISTICS"
                        className="relative w-full rounded-2xl object-cover shadow-xl aspect-[4/3]"
                    />
                </div>

                <div>
                    <p className="section-label">About Us</p>
                    <h2 className="section-title">
                        Your trusted partner on every route
                    </h2>
                    <p className="section-lead">
                        PRAGYA SHIPPING AND LOGISTICS moves goods across India with care — reliable
                        fleet, clear communication, and deliveries that respect your timeline.
                    </p>

                    <ul className="mt-8 space-y-3">
                        {points.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-ink">
                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/20 text-steel text-xs font-bold">
                                    ✓
                                </span>
                                <span className="text-[1.05rem]">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <Link to="/quote" className="btn-steel mt-9">
                        Request a Quote
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default About;
