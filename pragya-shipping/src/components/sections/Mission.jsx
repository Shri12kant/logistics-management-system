import shipCargo from "../../assets/Ship cargo.jpg";

function Mission() {
    const projectCargoFeatures = [
        {
            title: "Over-Dimensional Cargo (ODC)",
            description: "Custom solutions for oversized freight, transformers, heavy boilers, and construction modules."
        },
        {
            title: "Route Survey & Feasibility",
            description: "Pre-transit engineering surveys, bridge load assessments, and route planning for zero bottlenecks."
        },
        {
            title: "Multimodal Rail & Sea Transport",
            description: "Synchronized rail rakes, chartered vessels, and specialized hydraulic multi-axle trailers."
        },
        {
            title: "Turnkey Project Management",
            description: "End-to-end supervision from factory floor to job site with dedicated on-site logistics crew."
        }
    ];

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

                {/* Project Cargo Specialized Area */}
                <div className="bg-ink text-white p-8 md:p-14 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-signal/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="max-w-3xl">
                        <p className="text-signal text-xs font-bold tracking-[0.14em] uppercase">
                            Specialized Capability
                        </p>
                        <h3 className="font-display text-3xl md:text-4xl font-extrabold mt-3 text-white">
                            Project Cargo & Heavy Lift Logistics
                        </h3>
                        <p className="mt-4 text-white/70 text-lg leading-relaxed">
                            Complex, oversized, or high-value industrial freight requires dedicated engineering and specialized equipment. 
                            We manage entire project supply chains from factory to foundation.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {projectCargoFeatures.map((item, idx) => (
                            <div key={item.title} className="bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:border-signal/50 transition">
                                <span className="font-display text-signal font-bold text-sm">
                                    0{idx + 1}
                                </span>
                                <h4 className="font-display font-bold text-lg text-white mt-3">
                                    {item.title}
                                </h4>
                                <p className="text-white/60 text-sm mt-2.5 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <p className="font-semibold text-white">Have an oversized or industrial project consignment?</p>
                            <p className="text-white/50 text-sm mt-0.5">Talk to our Project Cargo specialists for route planning and custom quotes.</p>
                        </div>
                        <a href="#contact" className="btn-primary whitespace-nowrap">
                            Enquire for Project Cargo
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Mission;
