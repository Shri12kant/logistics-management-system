import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function TermsConditions() {
    useEffect(() => {
        document.title = "Terms & Conditions of Service | Pragya Shipping and Logistics";
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
                        <span className="text-signal font-medium">Terms & Conditions</span>
                    </nav>
                </div>
            </div>

            {/* Header */}
            <header className="py-12 md:py-16 bg-gradient-to-b from-ink-soft to-ink border-b border-white/5">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/30 text-signal text-xs font-semibold uppercase tracking-wider mb-4">
                        <span className="w-2 h-2 rounded-full bg-signal"></span>
                        Commercial Terms & Operational Conditions
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        Terms of Service & Freight Conditions
                    </h1>
                    <p className="text-white/60 text-sm md:text-base mt-3">
                        Last Updated: November 1, 2026 | Governing Freight Forwarding, CHA & Multimodal Logistics
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
                            1. Agreement & Operational Scope
                        </h2>
                        <p>
                            These Terms and Conditions govern all freight forwarding, Customs House Agent (CHA) clearance, road transportation, railway cargo handling, project cargo movement, and warehouse drayage services provided by <strong>Pragya Shipping and Logistics</strong> ("Company", "we", "us") to shippers, consignors, consignees, and commercial clients ("Customer").
                        </p>
                        <p>
                            By requesting a freight quote, submitting a booking form, tendering cargo, or utilizing our website (<a href="https://pragyashipping.in" className="text-signal hover:underline">pragyashipping.in</a>), the Customer unconditionally accepts and agrees to be bound by these Terms.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            2. Freight Quotations & Commercial Estimates
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-white/75">
                            <li>All online quote calculator estimates and preliminary quotes are based on current carrier tariffs, fuel surcharges, and customer-declared weights/dimensions.</li>
                            <li>Final billing is subject to actual physical weighment, volumetric dimensions, customs duty assessments, container demurrage/detention, and terminal handling charges (THC) incurred at ports.</li>
                            <li>Unless specified in writing, quotations exclude statutory customs duties, IGST, port storage charges, destination demurrage, inspection fees, or unexpected statutory government levies.</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            3. Customer Warranties & Prohibited Cargo
                        </h2>
                        <p>The Customer expressly warrants and confirms that:</p>
                        <ul className="list-disc pl-6 space-y-2 text-white/75">
                            <li>All goods tendered for shipment are lawfully owned, accurately declared, properly labeled, and packed in accordance with national and international transport safety standards.</li>
                            <li>The cargo does not contain any contraband, narcotics, illegal substances, undeclared hazardous materials, or goods prohibited under the Indian Customs Act, 1962, or international trade sanctions.</li>
                            <li>All statutory documentation, including valid GST E-Way Bills, Commercial Invoices, Packing Lists, and Import Export Code (IEC), are authentic and legally compliant.</li>
                            <li>The Customer indemnifies Pragya Shipping against any fines, seizures, penalties, or legal costs arising from inaccurate declarations or statutory violations by the shipper.</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            4. Customs Clearance (CHA) Representation
                        </h2>
                        <p>
                            When acting as a licensed Customs House Agent (CHA) or customs broker at JNPT, Mumbai Port, or inland container depots, Pragya Shipping acts strictly as an authorized clearing agent on behalf of the importer or exporter.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/75">
                            <li>Customs duty assessment, cargo physical examination, and Out of Charge (OOC) decisions remain at the sole discretion of Indian Customs Authorities.</li>
                            <li>The Customer remains solely responsible for the payment of all customs duties, penalties, statutory fines, or demurrage resulting from documentation discrepancies or regulatory examination holds.</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            5. Carrier Liability & Transit Insurance
                        </h2>
                        <p>
                            Our liability as an international freight forwarder and transport coordinator is governed by applicable Indian transport legislation, including the <em>Carriage by Road Act, 2007</em>, the <em>Multimodal Transportation of Goods Act, 1993</em>, and applicable maritime Bill of Lading conditions:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/75">
                            <li>We are not liable for loss, delay, or damage caused by Force Majeure events, strikes, maritime perils, severe weather, port congestion, civil unrest, or statutory customs holds.</li>
                            <li><strong>Marine & Transit Cargo Insurance:</strong> Carrier liability under Indian law is strictly limited. We strongly advise and assist all shippers to secure comprehensive All-Risk Marine Transit Cargo Insurance for the full commercial value of their consignments.</li>
                        </ul>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            6. Payment Terms & Right of Lien
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-white/75">
                            <li>All freight invoices, shipping charges, and customs disbursements must be settled in full within agreed credit periods or prior to cargo release/Bill of Lading surrender.</li>
                            <li>Pragya Shipping and Logistics reserves a general and particular legal lien over all cargo, shipping documents, and Bills of Lading in its possession until all outstanding freight dues, terminal costs, and handling charges are paid in full.</li>
                        </ul>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-3">
                        <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-signal rounded-full"></span>
                            7. Governing Law & Jurisdiction
                        </h2>
                        <p>
                            These Terms and Conditions, all logistics contracts, and any disputes arising between the parties shall be governed by and construed in accordance with the laws of the Republic of India.
                        </p>
                        <p>
                            The competent civil courts situated in <strong className="text-white">Thane / Mumbai, Maharashtra, India</strong> shall have exclusive legal jurisdiction over any dispute, legal proceedings, or claims arising out of or related to these services.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <Link to="/" className="text-signal text-sm font-semibold hover:underline">
                            ← Return to Homepage
                        </Link>
                        <Link to="/privacy-policy" className="text-white/70 text-sm hover:text-white transition">
                            Read Privacy Policy & DPDP Compliance →
                        </Link>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
