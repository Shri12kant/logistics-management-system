import { Link } from "react-router-dom";
import heroTruck from "../../assets/Hero-truck.jpg";

function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-[100svh] flex items-end md:items-center overflow-hidden"
        >
            <img
                src={heroTruck}
                alt="PRAGYA SHIPPING AND LOGISTICS fleet on the road"
                className="absolute inset-0 w-full h-full object-cover scale-105 animate-slide-in"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16 md:pb-24">
                <p className="font-display text-signal text-xl md:text-3xl font-bold tracking-tight animate-fade-up">
                    PRAGYA SHIPPING AND LOGISTICS
                </p>

                <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mt-3 max-w-3xl animate-fade-up-delay">
                    Goods move. Business grows.
                </h1>

                <p className="mt-5 text-lg md:text-xl text-white/75 max-w-xl leading-relaxed animate-fade-up-delay-2">
                    Fast, safe logistics across India — from pickup to doorstep, on your schedule.
                </p>

                <div className="mt-9 flex flex-wrap gap-4 animate-fade-up-delay-2">
                    <a href="#contact" className="btn-primary">
                        Request a Quick Quote
                    </a>
                    <a href="#contact" className="btn-ghost">
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Hero;
