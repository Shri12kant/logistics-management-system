import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PrivacyPolicy() {
    useEffect(() => {
        document.title = "Privacy Policy & DPDP Act Compliance | Pragya Shipping and Logistics";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-ink text-white min-h-screen selection:bg-signal selection:text-ink">
            <Navbar />

            {/* Top Spacing for Fixed Navbar */}
            <div className="h-20 md:h-24"></div>

            {/* Breadcrumb */}
            <div className="bg-ink-soft/60 border-b border-white/5 py-3.5">
                <div className="max-w-5xl mx-auto px-6">
                    <nav className="flex items-center text-xs md:text-sm text-white/60 space-x-2">
                        <Link to="/" className="hover:text-signal transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-signal font-medium">Privacy Policy</span>
                    </nav>
                </div>
            </div>

            {/* Header */}
            <header className="py-12 md:py-16 bg-gradient-to-b from-ink-soft to-ink border-b border-white/5">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/30 text-signal text-xs font-semibold uppercase tracking-wider mb-4">
                        <span className="w-2 h-2 rounded-full bg-signal"></span>
                        DPDP Act (2023) Compliant Policy
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        Privacy Policy & Data Protection Notice
                    </h1>
                    <p className="text-white/60 text-sm md:text-base mt-3">
                        Last Updated: November 1, 2026 | Compliant with the Digital Personal Data Protection Act, 2023 (India)
                    </p>
                </div>
            </header>

            {/* Content */}
            <main className="py-12 md:py-20">
                <div className="max-w-5xl mx-auto px-6 space-y-12 text-white/80 leading-relaxed text-sm md:text-base">

                    {/* Section 1 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            1. Introduction & Data Fiduciary Details
                        </h2>
                        <p>
                            <strong className="text-white">Pragya Shipping and Logistics</strong> ("we", "us", "our", or "Company") acts as a <strong>Data Fiduciary</strong> under the provisions of the Digital Personal Data Protection Act, 2023 (DPDP Act). We are committed to safeguarding the digital personal data of our website visitors, shippers, importers, exporters, and commercial partners ("Data Principals").
                        </p>
                        <p>
                            This Privacy Policy sets out how we collect, process, store, and protect digital personal data obtained through our official portal (<a href="https://pragyashipping.in" className="text-signal hover:underline">pragyashipping.in</a>), inquiry forms, rate calculators, and official customer communication channels.
                        </p>
                        <div className="bg-white/[0.03] p-4 rounded-lg border border-white/10 text-xs md:text-sm text-white/70">
                            <p><strong>Registered Office:</strong> Room No. 4611, Raigad Galli, Rupa Devi Pada No. 1, Rd. No. 33, Indira Nagar, Wagle Estate, Thane (W), Maharashtra - 400 604, India.</p>
                            <p className="mt-1"><strong>Official Contact Email:</strong> exp.sales@pragyashipping.in | <strong>Helpline:</strong> +91 98671 89821</p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            2. Personal Data We Collect
                        </h2>
                        <p>
                            In the course of providing freight forwarding, customs clearance, and multimodal transportation services, we collect only the minimum necessary digital personal data:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/75">
                            <li><strong>Identity & Contact Details:</strong> Name, business email address, telephone / mobile number, company name, and commercial billing address.</li>
                            <li><strong>Shipment & Cargo Details:</strong> Origin port, destination port, type of service requested, cargo description, container requirements, weight, and delivery addresses.</li>
                            <li><strong>Statutory / KYC Details (for clearance):</strong> GSTIN, Import Export Code (IEC), and authorized representative verification details required strictly by Indian Customs (CBIC) for Customs House Agent (CHA) clearance and Bill of Entry / Shipping Bill processing.</li>
                            <li><strong>Payment Metadata:</strong> Transaction reference IDs, invoice numbers, and payment status through authorized payment gateways (Razorpay). <em>Note: We do not store credit/debit card numbers or net-banking credentials on our servers.</em></li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            3. Lawful Purpose of Data Processing
                        </h2>
                        <p>
                            In compliance with Section 4 and Section 6 of the DPDP Act 2023, your personal data is collected and processed strictly for legitimate commercial and operational purposes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/75">
                            <li>Calculating, preparing, and sending commercial freight quotes and transport estimations.</li>
                            <li>Coordinating container port drayage, rail siding handovers, and highway transport dispatches.</li>
                            <li>Filing electronic customs documentation with ICEGATE, port authorities (JNPT, MBPT), and Container Freight Stations (CFSs).</li>
                            <li>Providing active shipment transit updates, delivery confirmation, and commercial invoices.</li>
                            <li>Responding to customer support requests and compliance inquiries.</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            4. Zero Data Selling Guarantee & Limited Disclosures
                        </h2>
                        <p className="bg-signal/10 border border-signal/30 p-4 rounded-xl text-white/90">
                            <strong>Our Strict Guarantee:</strong> Pragya Shipping and Logistics does <strong>NOT</strong> sell, rent, monetize, or trade your personal data or phone numbers to third-party telemarketers, advertising agencies, or data brokers.
                        </p>
                        <p>
                            Your data is shared strictly on a confidential need-to-know basis only with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/75">
                            <li><strong>Statutory Authorities:</strong> Indian Customs (ICEGATE/CBIC), Port Trusts (JNPT/MBPT), GST Authorities, and law enforcement when required by statutory Indian law.</li>
                            <li><strong>Operational Service Partners:</strong> Verified shipping lines, container train operators, and trailer drivers strictly for dispatching your verified cargo.</li>
                            <li><strong>Authorized Payment Gateways:</strong> PCI-DSS certified payment processors (Razorpay) for processing invoice settlements.</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            5. Data Security & Storage Safeguards
                        </h2>
                        <p>
                            To comply with Section 8(5) of the DPDP Act, we implement reasonable security safeguards to protect personal data from unauthorized access, breach, alteration, or disclosure:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/75">
                            <li><strong>TLS / SSL Encryption:</strong> All data transmitted between your browser and our server is encrypted using 256-bit Transport Layer Security.</li>
                            <li><strong>Secure Infrastructure:</strong> Passwords, authentication credentials, and database records are hashed using industry-standard cryptographic algorithms.</li>
                            <li><strong>Access Controls:</strong> Only authorized logistics personnel with verified credentials have access to operational booking records.</li>
                        </ul>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            6. Your Rights as a Data Principal (Under DPDP Act 2023)
                        </h2>
                        <p>
                            As an Indian citizen / Data Principal, you have specific statutory rights under Chapter III of the DPDP Act 2023:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/10">
                                <h3 className="font-display font-semibold text-white text-sm">Right to Access Information</h3>
                                <p className="text-white/60 text-xs mt-1">You may request a summary of the personal data we hold about you and details of third-party disclosures.</p>
                            </div>
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/10">
                                <h3 className="font-display font-semibold text-white text-sm">Right to Correction & Erasure</h3>
                                <p className="text-white/60 text-xs mt-1">You have the right to request correction of inaccurate data or deletion of your data when no longer needed.</p>
                            </div>
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/10">
                                <h3 className="font-display font-semibold text-white text-sm">Right to Withdraw Consent</h3>
                                <p className="text-white/60 text-xs mt-1">You may withdraw your consent for future communication at any time by sending an email notice.</p>
                            </div>
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/10">
                                <h3 className="font-display font-semibold text-white text-sm">Right of Grievance Redressal</h3>
                                <p className="text-white/60 text-xs mt-1">You may register any data privacy complaints directly with our appointed Grievance Officer.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            7. Data Protection & Grievance Redressal Officer
                        </h2>
                        <p>
                            In accordance with Section 8(9) and Section 13 of the DPDP Act 2023, we have designated an official <strong>Grievance Redressal Desk</strong> to address any inquiries, consent withdrawals, or data rights requests:
                        </p>
                        <div className="bg-white/[0.04] p-6 rounded-xl border border-white/10 space-y-2 text-sm">
                            <p><strong className="text-white">Designation:</strong> Data Grievance Redressal Officer</p>
                            <p><strong className="text-white">Entity:</strong> Pragya Shipping and Logistics</p>
                            <p><strong className="text-white">Office Address:</strong> Room No. 4611, Raigad Galli, Rupa Devi Pada No. 1, Rd. No. 33, Indira Nagar, Wagle Estate, Thane (W), Maharashtra - 400 604, India</p>
                            <p><strong className="text-white">Email for Privacy Requests:</strong> <a href="mailto:exp.sales@pragyashipping.in" className="text-signal hover:underline">exp.sales@pragyashipping.in</a></p>
                            <p><strong className="text-white">Telephone Helpline:</strong> +91 98671 89821</p>
                            <p className="text-white/50 text-xs pt-2">
                                We endeavor to acknowledge privacy-related inquiries within 48 business hours and resolve them within statutory timelines.
                            </p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            8. Policy Updates
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time to maintain strict compliance with evolving statutory rules under the Digital Personal Data Protection Act and Indian cyber laws. Any revisions will be published immediately on this page with an updated revision date.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <Link to="/" className="text-signal text-sm font-semibold hover:underline">
                            ← Return to Homepage
                        </Link>
                        <Link to="/terms" className="text-white/70 text-sm hover:text-white transition">
                            Read Terms & Conditions →
                        </Link>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
