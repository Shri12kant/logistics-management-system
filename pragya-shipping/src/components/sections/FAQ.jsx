import { useState } from "react";

function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "What logistics and freight forwarding services do you provide in Mumbai & Thane?",
            answer: "Pragya Shipping and Logistics provides comprehensive multimodal logistics solutions across India. Our core services include Ocean Freight (FCL and LCL container cargo via JNPT / Mumbai port), Customs Clearance & CHA documentation, Road Transportation (Full Truck Load & Part Truck Load), Railway Freight via Dedicated Freight Corridors (DFC), Air Freight, and specialized Project Cargo (ODC heavy lift)."
        },
        {
            question: "Do you handle customs clearance and container movements at JNPT (Nhava Sheva) & Mumbai Port?",
            answer: "Yes. We offer complete customs clearance and port logistics at JNPT (Nhava Sheva) and Mumbai Port. Our experienced team handles Bill of Entry, Shipping Bill documentation, duty assessment, customs inspection, port drayage, and seamless last-mile trailer delivery across Maharashtra and pan-India."
        },
        {
            question: "How can I request a freight shipping quote or rates?",
            answer: "You can request an instant quote by filling out our online 'Request a Quick Quote' form with your cargo details, weight, and destination port. Alternatively, you can email your shipment specifications directly to exp.sales@pragyashipping.in or call our operations desk at +91 98671 89821."
        },
        {
            question: "What documents are required for customs clearance and freight forwarding?",
            answer: "Standard commercial shipping documents include Commercial Invoice, Packing List, Bill of Lading (BL) or Air Waybill (AWB), Import Export Code (IEC), and Shipping Bill or Bill of Entry. Our experienced customs clearance team assists clients with full document verification, HSN classification, and regulatory compliance at ports and air cargo terminals."
        },
        {
            question: "What capabilities do you offer for Project Cargo and Over-Dimensional Cargo (ODC)?",
            answer: "For heavy industrial machinery, transformers, and infrastructure project shipments, we provide custom route surveys, arrange specialized multi-axle hydraulic trailers, secure necessary road transit permissions, and ensure safe end-to-end transport from factory floor to job site foundation."
        },
        {
            question: "Which industries and cities across India do you cater to?",
            answer: "Headquartered in Mumbai & Thane (Maharashtra), we operate freight lanes linking major industrial corridors, Inland Container Depots (ICDs), and ports across Gujarat, Delhi-NCR, Maharashtra, Tamil Nadu, West Bengal, and Uttar Pradesh. We serve manufacturing, engineering, consumer goods, raw materials, and international trading businesses."
        }
    ];

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? -1 : idx);
    };

    return (
        <section id="faq" className="scroll-mt-24 py-20 md:py-28 bg-ink text-white border-t border-white/5">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="section-label">Frequently Asked Questions</p>
                    <h2 className="section-title">
                        Everything you need to know about our logistics services
                    </h2>
                    <p className="section-lead mx-auto">
                        Clear answers on shipping procedures, customs clearance, JNPT container movements, and freight timelines.
                    </p>
                </div>

                <div className="mt-14 space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={faq.question}
                                className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden transition-colors hover:border-signal/40"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggle(index)}
                                    className="w-full text-left p-6 flex justify-between items-center gap-4 focus:outline-none"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-display text-lg md:text-xl font-bold text-white">
                                        {faq.question}
                                    </span>
                                    <span
                                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-signal font-bold text-lg transition-transform duration-300 ${
                                            isOpen ? "rotate-45 bg-signal text-ink" : ""
                                        }`}
                                    >
                                        +
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-6 pb-6 text-white/75 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4 animate-fade-in">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                    <h3 className="font-display text-xl font-bold text-white">
                        Have a specific cargo or custom clearance requirement?
                    </h3>
                    <p className="text-white/60 text-sm mt-2 max-w-xl mx-auto">
                        Speak directly with our freight forwarding specialists for immediate assistance and customized route planning.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <a href="#contact" className="btn-primary">
                            Request Custom Quote
                        </a>
                        <a href="tel:+919867189821" className="btn-ghost">
                            Call +91 98671 89821
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
