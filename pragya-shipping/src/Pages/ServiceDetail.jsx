import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import { Navbar } from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function ServiceDetail() {
    const { slug } = useParams();
    const service = servicesData[slug];
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        if (service) {
            document.title = service.metaTitle;
        }
    }, [service]);

    if (!service) {
        return <Navigate to="/#services" replace />;
    }

    const allServices = Object.values(servicesData);
    const otherServices = allServices.filter((s) => s.slug !== slug);

    return (
        <div className="bg-ink text-white min-h-screen selection:bg-signal selection:text-ink">
            <Navbar />

            {/* Top Spacing for Fixed Navbar */}
            <div className="h-20 md:h-24"></div>

            {/* Breadcrumb Navigation */}
            <div className="bg-ink-soft/60 border-b border-white/5 py-3.5">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex items-center text-xs md:text-sm text-white/60 space-x-2">
                        <Link to="/" className="hover:text-signal transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/#services" className="hover:text-signal transition-colors">Services</Link>
                        <span>/</span>
                        <span className="text-signal font-medium truncate">{service.title}</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <header className="relative py-16 md:py-24 bg-gradient-to-b from-ink-soft via-ink to-ink border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff6b35_1px,transparent_1px)] [background-size:24px_24px]"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/30 text-signal text-xs font-semibold uppercase tracking-wider mb-5">
                            <span className="w-2 h-2 rounded-full bg-signal animate-pulse"></span>
                            {service.heroBadge}
                        </div>

                        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                            {service.title}
                        </h1>

                        <p className="text-signal text-base sm:text-lg md:text-xl font-semibold mt-4">
                            {service.subtitle}
                        </p>

                        <p className="text-white/70 text-base md:text-lg mt-5 leading-relaxed">
                            {service.shortDesc}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-8 pt-4">
                            <Link
                                to="/quote"
                                className="inline-flex items-center gap-2 bg-signal hover:bg-orange-600 text-ink font-bold px-6 py-3.5 rounded-lg text-sm transition-all duration-200 shadow-lg shadow-signal/20 hover:scale-[1.02]"
                            >
                                <span>Request Instant Quote</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>

                            <a
                                href="tel:+919867189821"
                                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium px-5 py-3.5 rounded-lg text-sm border border-white/10 transition-colors"
                            >
                                <svg className="w-4 h-4 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>Call Operations Desk</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* Left / Main Details Column */}
                        <div className="lg:col-span-8 space-y-16">
                            
                            {/* Detailed Overview */}
                            <section>
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-7 bg-signal rounded-full"></span>
                                    Operational Overview
                                </h2>
                                <div className="space-y-4 text-white/75 leading-relaxed text-base">
                                    {service.overview.map((paragraph, idx) => (
                                        <p key={idx}>{paragraph}</p>
                                    ))}
                                </div>
                            </section>

                            {/* Core Highlights Cards */}
                            <section>
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-7 bg-signal rounded-full"></span>
                                    Service Highlights
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {service.highlights.map((h, i) => (
                                        <div
                                            key={i}
                                            className="bg-white/[0.04] p-6 rounded-xl border border-white/10 hover:border-signal/40 transition-colors"
                                        >
                                            <h3 className="text-white font-display font-semibold text-base mb-2 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-signal"></span>
                                                {h.title}
                                            </h3>
                                            <p className="text-white/65 text-sm leading-relaxed">
                                                {h.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Key Capabilities */}
                            <section className="bg-white/[0.03] p-8 rounded-2xl border border-white/10">
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-7 bg-signal rounded-full"></span>
                                    Key Capabilities & Infrastructure
                                </h2>
                                <ul className="space-y-3.5">
                                    {service.keyCapabilities.map((cap, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white/80 text-sm md:text-base">
                                            <svg className="w-5 h-5 text-signal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{cap}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Documentation Required */}
                            <section>
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-7 bg-signal rounded-full"></span>
                                    Required Documents & Compliance
                                </h2>
                                <p className="text-white/70 text-sm mb-5">
                                    To ensure smooth customs release and prevent shipment delays, our desk manages and verifies the following statutory documentation:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {service.documentation.map((doc, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 bg-white/[0.03] px-4 py-3 rounded-lg border border-white/5 text-sm text-white/85"
                                        >
                                            <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span>{doc}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Port & Corridor Connectivity */}
                            <section>
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-7 bg-signal rounded-full"></span>
                                    Major Gateways & Connectivity
                                </h2>
                                <div className="bg-white/[0.03] p-6 rounded-xl border border-white/10 space-y-3">
                                    {service.gatewayPorts.map((port, idx) => (
                                        <div key={idx} className="flex items-start gap-3 text-sm text-white/80">
                                            <svg className="w-4 h-4 text-signal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{port}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Service FAQs */}
                            <section>
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-7 bg-signal rounded-full"></span>
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-4">
                                    {service.faqs.map((faq, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-display font-semibold text-sm md:text-base text-white hover:text-signal transition-colors"
                                            >
                                                <span>{faq.q}</span>
                                                <svg
                                                    className={`w-5 h-5 text-signal transition-transform duration-200 shrink-0 ${openFaq === idx ? "rotate-180" : ""}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {openFaq === idx && (
                                                <div className="px-6 pb-5 pt-1 text-sm text-white/70 leading-relaxed border-t border-white/5">
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            
                            {/* Sticky Instant Quote Box */}
                            <div className="sticky top-28 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
                                <h3 className="font-display text-xl font-bold text-white mb-2">
                                    Need Rates for {service.title}?
                                </h3>
                                <p className="text-white/65 text-xs mb-6 leading-relaxed">
                                    Share your origin, destination, container type, or cargo volume for transparent commercial freight pricing.
                                </p>

                                <Link
                                    to="/quote"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-signal hover:bg-orange-600 text-ink font-bold py-3.5 px-4 rounded-lg text-sm transition-all shadow-lg shadow-signal/20"
                                >
                                    <span>Get a Freight Quote</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>

                                <div className="mt-6 pt-6 border-t border-white/10 space-y-4 text-xs text-white/70">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-signal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>+91 98671 89821 / +91 80974 65675</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-signal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>exp.sales@pragyashipping.in</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-signal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        <span>Wagle Estate, Thane (W) - 400604</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Navigation to Other Services */}
                            <div className="bg-white/[0.03] p-6 rounded-xl border border-white/10">
                                <h4 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider text-white/90">
                                    All Freight Services
                                </h4>
                                <nav className="space-y-1.5">
                                    {allServices.map((item) => (
                                        <Link
                                            key={item.slug}
                                            to={`/services/${item.slug}`}
                                            className={`block px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                                                item.slug === slug
                                                    ? "bg-signal text-ink font-bold"
                                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                                            }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Callout: Explore More Services */}
            <section className="py-16 bg-ink-soft border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                        <div>
                            <p className="text-signal text-xs font-semibold uppercase tracking-wider">End-to-End Multimodal Solutions</p>
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-1">
                                Explore Other Freight Services
                            </h2>
                        </div>
                        <Link
                            to="/#services"
                            className="mt-4 md:mt-0 text-xs font-semibold text-signal hover:text-white inline-flex items-center gap-1"
                        >
                            <span>Back to Homepage Overview</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherServices.slice(0, 3).map((item) => (
                            <Link
                                key={item.slug}
                                to={`/services/${item.slug}`}
                                className="group bg-white/[0.03] p-6 rounded-xl border border-white/10 hover:border-signal/50 transition-all hover:-translate-y-1 block"
                            >
                                <p className="text-signal text-[11px] font-semibold">{item.heroBadge}</p>
                                <h3 className="font-display font-bold text-lg text-white mt-1 group-hover:text-signal transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-white/60 text-xs mt-2.5 line-clamp-2 leading-relaxed">
                                    {item.shortDesc}
                                </p>
                                <div className="mt-4 text-xs font-semibold text-signal flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    <span>Learn more</span>
                                    <span>&rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
