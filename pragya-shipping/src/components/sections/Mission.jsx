import shipCargo from "../../assets/Ship cargo.jpg";
import cargoIndia from "../../assets/cargoIndia.jpg";

function Mission() {
    return (
        <section id="mission" className="py-20 md:py-28 bg-white border-y border-mist">
            <div className="max-w-7xl mx-auto px-6 space-y-20">
                {/* Mission Header & Core Values with Ship Cargo Image */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="section-label">Our Mission</p>
                        <h2 className="section-title">
                            Empowering commerce through resilient logistics
                        </h2>
                        <p className="section-lead">
                            At PRAGYA SHIPPING AND LOGISTICS, our mission is to build India’s most dependable multimodal network — 
                            delivering freight across Road, Rail, and Ocean with safety, regulatory precision, and predictable timelines.
                        </p>

                        <div className="mt-8 grid sm:grid-cols-2 gap-6">
                            <div className="bg-fog p-5 border-l-4 border-signal">
                                <h4 className="font-display font-bold text-ink text-lg">Safety & Integrity</h4>
                                <p className="text-muted text-sm mt-2">Zero-compromise cargo handling, vetted operators, and strict compliance.</p>
                            </div>
                            <div className="bg-fog p-5 border-l-4 border-steel">
                                <h4 className="font-display font-bold text-ink text-lg">Multimodal Agility</h4>
                                <p className="text-muted text-sm mt-2">Seamless integration across highways, rail freight corridors, and major ports.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-ink/5 rounded-3xl rotate-1" />
                        <img
                            src={shipCargo}
                            alt="Ship cargo and ocean freight logistics by PRAGYA SHIPPING AND LOGISTICS"
                            className="relative w-full rounded-2xl object-cover shadow-xl aspect-[16/10]"
                        />
                    </div>
                </div>

                {/* Project Cargo Specialized Area with cargoIndia image & text overlay */}
                <div className="bg-ink text-white shadow-2xl relative overflow-hidden rounded-2xl">
                    <div className="relative min-h-[420px] md:min-h-[480px] flex items-center">
                        {/* Background Image */}
                        <img
                            src={cargoIndia}
                            alt="Project Cargo logistics across India"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Dark Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40 md:to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />

                        {/* Text Content Over Image */}
                        <div className="relative z-10 p-8 md:p-14 max-w-2xl space-y-5">
                            <p className="text-signal text-xs font-bold tracking-[0.14em] uppercase">
                                Specialized Capability
                            </p>
                            <h3 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-tight">
                                Project Cargo
                            </h3>
                            <p className="text-white/85 text-base md:text-lg leading-relaxed">
                                Complete end-to-end management for Over-Dimensional Cargo (ODC), heavy industrial machinery, 
                                and complex infrastructure shipments. We engineer custom routes, arrange specialized hydraulic trailers, 
                                and guarantee safe delivery from factory to site foundation across India.
                            </p>

                            <div className="pt-3 flex flex-wrap gap-4">
                                <a href="#contact" className="btn-primary">
                                    Enquire for Project Cargo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Mission;
