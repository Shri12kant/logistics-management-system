import { Link } from "react-router-dom";

function Services() {
    const services = [
        {
            slug: "ocean-freight",
            title: "Ocean Freight Forwarding",
            subtitle: "FCL / LCL Container Cargo via JNPT & Mumbai Port",
            description: "End-to-end global maritime cargo forwarding. We provide competitive full container load (FCL) and consolidated less-than-container (LCL) freight solutions across major global trade lanes, with seamless port drayage and customs coordination.",
            tags: ["JNPT & Mumbai Port", "FCL & LCL", "Global Shipping Lines", "Bill of Lading"],
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15l2 3h14l2-3-4-8H7L3 15zM12 3v4m0 0l-3 3m3-3l3 3M2 20c2.5 1.5 5 1.5 7.5 0s5-1.5 7.5 0 5 1.5 7.5 0" />
                </svg>
            )
        },
        {
            slug: "customs-clearance",
            title: "Customs Clearance (CHA)",
            subtitle: "Fast Port Clearance & Import-Export Documentation",
            description: "Expert customs brokerage and CHA documentation services. We handle Bill of Entry, Shipping Bills, HSN classification, customs duty assessment, regulatory compliance, and swift physical examination at ports and air cargo complexes.",
            tags: ["Customs Broker", "Bill of Entry", "Duty Assessment", "Port Clearance"],
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            slug: "road-transport",
            title: "Road Transportation",
            subtitle: "Full Truck Load (FTL) & Container Trailers Across India",
            description: "High-reliability interstate and regional freight transportation with modern commercial trailers. Full Truck Load (FTL) and Part Truck Load (PTL) coverage across major industrial hubs, ports, and inland container depots.",
            tags: ["Pan-India Network", "FTL & PTL", "Container Trailers", "Doorstep Delivery"],
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h.01M16 17h.01M3 9l1.5-4.5h15L21 9M3 9v8a1 1 0 001 1h1m16-9v8a1 1 0 01-1 1h-1M5 18a2 2 0 104 0m6 0a2 2 0 104 0" />
                </svg>
            )
        },
        {
            slug: "railway-freight",
            title: "Railway Freight Corridors",
            subtitle: "Dedicated Freight Corridors (DFC) & Bulk Rakes",
            description: "High-capacity, cost-effective rail logistics moving bulk raw materials and containerized rakes. Direct port rail connectivity linking Western & Eastern Dedicated Freight Corridors to inland depots with lower freight costs.",
            tags: ["DFC Corridors", "Container Rakes", "Bulk Commodities", "ICD Linkage"],
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16M8 6v12M16 6v12" />
                </svg>
            )
        },
        {
            slug: "project-cargo",
            title: "Project Cargo & Heavy Lift",
            subtitle: "Over-Dimensional Cargo (ODC) & Industrial Machinery",
            description: "Specialized engineering logistics for heavy transformers, infrastructure machinery, and over-dimensional loads (ODC). We perform precision route feasibility surveys, arrange multi-axle hydraulic trailers, and secure RTO transit permits.",
            tags: ["ODC Heavy Lift", "Hydraulic Trailers", "Route Surveys", "Factory to Foundation"],
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            slug: "air-freight",
            title: "Air Freight Forwarding",
            subtitle: "Express International & Domestic Air Cargo",
            description: "Time-critical and high-value cargo transport via major air cargo hubs including Mumbai International Airport (BOM). Fast transit schedules, airline space booking, express customs clearance, and temperature-controlled options.",
            tags: ["Express Transit", "Airport Customs", "BOM Air Cargo", "Door-to-Airport"],
            icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            )
        }
    ];

    return (
        <section id="services" className="scroll-mt-24 py-20 md:py-28 bg-ink-soft text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl">
                    <p className="section-label">Comprehensive Freight Services</p>
                    <h2 className="section-title">End-to-End Multimodal Logistics Solutions</h2>
                    <p className="section-lead">
                        From single container export to full industrial project movements — reliable freight forwarding, customs clearance, and road-rail transportation across India and global ports.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
                    {services.map((service) => (
                        <article
                            key={service.title}
                            className="group bg-white/[0.04] p-8 border border-white/10 hover:border-signal/50 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-xl backdrop-blur-sm flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-white/10 text-signal group-hover:bg-signal group-hover:text-ink transition-colors">
                                    {service.icon}
                                </div>
                                <h3 className="font-display text-xl font-bold mt-6 text-white">
                                    {service.title}
                                </h3>
                                <p className="text-signal text-xs font-semibold mt-1">
                                    {service.subtitle}
                                </p>
                                <p className="text-white/65 mt-3.5 leading-relaxed text-sm">
                                    {service.description}
                                </p>
                            </div>

                            <div>
                                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                                    {service.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[11px] font-medium bg-white/[0.06] text-white/80 px-2.5 py-1 rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <Link
                                        to={`/services/${service.slug}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:text-white transition-colors group/link"
                                    >
                                        <span>View Details & Specifications</span>
                                        <svg
                                            className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;
