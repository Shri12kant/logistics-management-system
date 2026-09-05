import { Link } from "react-router-dom";
import logoImg from "../../assets/pragya-logo.png";

function Footer() {
    return (
        <footer className="bg-ink-soft text-white pt-16 pb-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div>
                    <div className="flex items-center gap-3">
                        <img
                            src={logoImg}
                            alt="Pragya Shipping and Logistics Logo"
                            className="h-14 md:h-16 w-auto object-contain shrink-0"
                        />
                        <div className="flex flex-col leading-tight">
                            <span className="font-display text-base font-bold text-signal">
                                Pragya Shipping and Logistics
                            </span>
                            <span className="text-xs font-semibold tracking-wider text-orange-400">
                                International Freight Forwarders
                            </span>
                            <span className="text-xs font-semibold text-orange-400">
                                प्रज्ञा शिपिंग आणि लॉजिस्टिक्स
                            </span>
                        </div>
                    </div>
                    <p className="text-white/50 mt-3 leading-relaxed text-sm">
                        Safe, reliable transportation across India — built for growing businesses.
                    </p>
                    <div className="mt-4 space-y-2 text-xs text-white/60">
                        <p className="leading-relaxed">
                            <strong className="text-white/80">Office:</strong> Room No. 4611, Raigad Galli, Rupa Devi Pada No. 1, Rd. No. 33, Indira Nagar, Wagle Estate, Thane (W), Maharashtra - 400 604.
                        </p>
                        <p>
                            <strong className="text-white/80">Phone:</strong>{" "}
                            <a href="tel:+919867189827" className="hover:text-signal transition">+91 98671 89827</a>
                        </p>
                        <p>
                            <strong className="text-white/80">Email:</strong>{" "}
                            <a href="mailto:exp.sales@pragyashipping.in" className="hover:text-signal transition">exp.sales@pragyashipping.in</a>
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white/40">
                        Explore
                    </h3>
                    <ul className="mt-4 space-y-2 text-white/70 text-sm">
                        <li><a href="#home" className="hover:text-signal transition">Home</a></li>
                        <li><a href="#about" className="hover:text-signal transition">About</a></li>
                        <li><a href="#railway" className="hover:text-signal transition">Railway</a></li>
                        <li><a href="#services" className="hover:text-signal transition">Services</a></li>
                        <li><a href="#mission" className="hover:text-signal transition">Mission & Projects</a></li>
                        <li><a href="#contact" className="hover:text-signal transition">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white/40">
                        Services
                    </h3>
                    <ul className="mt-4 space-y-2 text-white/70 text-sm">
                        <li>Road Transportation</li>
                        <li>Customs Clearance</li>
                        <li>Ocean Freight</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white/40">
                        Tools & Links
                    </h3>
                    <ul className="mt-4 space-y-2 text-white/70 text-sm">
                        <li><Link to="/track" className="hover:text-signal transition">Track Shipment</Link></li>
                        <li><a href="#contact" className="hover:text-signal transition">Request A Quote</a></li>
                        <li><Link to="/admin/login" className="hover:text-signal transition">Admin Portal</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-14 pt-6 border-t border-white/10">
                <p className="text-center text-white/35 text-sm">
                    © 2026 PRAGYA SHIPPING AND LOGISTICS. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
