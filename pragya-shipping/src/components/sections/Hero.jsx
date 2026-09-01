import { Link } from "react-router-dom";
import heroTruck from "../../assets/Hero-truck.jpg";

function Hero() {
    return (
        <>
            <section
                id="home"
                className="relative min-h-[100svh] flex items-end md:items-center overflow-hidden"
            >
                <img
                    src={heroTruck}
                    alt="Pragya Shipping fleet on the road"
                    className="absolute inset-0 w-full h-full object-cover scale-105 animate-slide-in"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16 md:pb-24">
                    <p className="font-display text-signal text-2xl md:text-4xl font-bold tracking-tight animate-fade-up">
                        Pragya Shipping
                    </p>

                    <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mt-3 max-w-3xl animate-fade-up-delay">
                        Goods move. Business grows.
                    </h1>

                    <p className="mt-5 text-lg md:text-xl text-white/75 max-w-xl leading-relaxed animate-fade-up-delay-2">
                        Fast, safe logistics across India — from pickup to doorstep, on your schedule.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4 animate-fade-up-delay-2">
                        <Link to="/quote" className="btn-primary">
                            Get a Quote
                        </Link>
                        <a href="#contact" className="btn-ghost">
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-ink-soft border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { value: "500+", label: "Deliveries" },
                        { value: "100+", label: "Happy Clients" },
                        { value: "50+", label: "Trucks" },
                        { value: "24/7", label: "Support" }
                    ].map((stat) => (
                        <div key={stat.label} className="text-center md:text-left">
                            <p className="font-display text-3xl md:text-4xl font-bold text-signal">
                                {stat.value}
                            </p>
                            <p className="mt-1 text-sm text-white/55 tracking-wide uppercase">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Hero;
