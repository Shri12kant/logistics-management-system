import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-ink-soft text-white pt-16 pb-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div>
                    <p className="font-display text-xl font-bold">
                        PRAGYA SHIPPING <span className="text-signal">AND LOGISTICS</span>
                    </p>
                    <p className="text-white/50 mt-3 leading-relaxed text-sm">
                        Safe, reliable transportation across India — built for growing businesses.
                    </p>
                    <div className="mt-4 space-y-2 text-xs text-white/60">
                        <p className="leading-relaxed">
                            <strong className="text-white/80">Office:</strong> Room No. 4611, Raigad Galli, Rupa Devi Pada No. 1, Rd. No. 33, Indira Nagar, Wagle Estate, Thane (W), Maharashtra - 400 604.
                        </p>
                        <p className="space-y-0.5">
                            <strong className="text-white/80">Email:</strong>{" "}
                            <a href="mailto:pragyashpng.log@gmail.com" className="hover:text-signal transition">pragyashpng.log@gmail.com</a>
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
                        <li>Road Transport</li>
                        <li>Goods Delivery</li>
                        <li>Customs Clearance</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white/40">
                        Tools
                    </h3>
                    <ul className="mt-4 space-y-2 text-white/70 text-sm">
                        <li><Link to="/track" className="hover:text-signal transition">Track Shipment</Link></li>
                        <li><Link to="/quote" className="hover:text-signal transition">Get Quote</Link></li>
                        <li><Link to="/admin/login" className="hover:text-signal transition">Admin</Link></li>
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
