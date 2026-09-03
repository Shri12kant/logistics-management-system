import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#services", label: "Services" },
        { href: "#fleet", label: "Fleet" },
        { href: "#process", label: "Process" },
        { href: "#contact", label: "Contact" }
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-ink/95 backdrop-blur-md shadow-lg shadow-black/10"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <a
                        href="#home"
                        className="font-display text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center flex-wrap"
                    >
                        <span>PRAGYA SHIPPING</span>
                        <span className="text-signal ml-1.5 font-bold">AND LOGISTICS</span>
                    </a>

                    <div className="hidden lg:flex items-center gap-7">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-white/80 hover:text-white transition"
                            >
                                {link.label}
                            </a>
                        ))}
                        <Link
                            to="/track"
                            className="text-sm font-semibold text-white/90 hover:text-signal transition"
                        >
                            Track
                        </Link>
                        <Link to="/quote" className="btn-primary text-sm !py-2.5 !px-4">
                            Get Quote
                        </Link>
                    </div>

                    <button
                        type="button"
                        aria-label="Toggle menu"
                        onClick={() => setOpen((v) => !v)}
                        className="lg:hidden text-white p-2"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {open ? (
                                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {open && (
                <div className="lg:hidden bg-ink border-t border-white/10 px-6 py-5 space-y-4 animate-fade-up">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block text-white/90 font-medium"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        to="/track"
                        onClick={() => setOpen(false)}
                        className="block text-signal font-semibold"
                    >
                        Track Shipment
                    </Link>
                    <Link
                        to="/quote"
                        onClick={() => setOpen(false)}
                        className="btn-primary w-full"
                    >
                        Get Quote
                    </Link>
                </div>
            )}
        </nav>
    );
}
