import { Link } from "react-router-dom";
import trainCargo from "../../assets/traincargo.jpg";

function RailwayFreight() {
    const railHighlights = [
        {
            title: "Dedicated Freight Corridors (DFC)",
            desc: "Rapid, congestion-free rail rake movement across India's key industrial trade lanes."
        },
        {
            title: "Containerized & Bulk Goods",
            desc: "Full container rakes (FCL) and bulk breakbulk transport for raw materials and heavy commodities."
        },
        {
            title: "ICD & Port Rail Connectivity",
            desc: "Seamless rail logistics linking inland container depots directly to major maritime ports."
        },
        {
            title: "Cost-Effective & High Capacity",
            desc: "Significantly lower per-tonne freight costs and reduced carbon footprint for high-volume loads."
        }
    ];

    return (
        <section id="railway" className="scroll-mt-24 py-20 md:py-28 bg-ink text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Content */}
                <div className="order-2 lg:order-1">
                    <p className="section-label">Railway Logistics</p>
                    <h2 className="section-title">
                        Railway Freight & Bulk Cargo Transportation
                    </h2>
                    <p className="section-lead">
                        Harness the speed, high-volume capacity, and cost-efficiency of Indian Railways. 
                        We manage end-to-end railway transportation — from rake booking and terminal loading to intermodal last-mile doorstep delivery.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-5 mt-8">
                        {railHighlights.map((item) => (
                            <div key={item.title} className="bg-white/[0.04] border border-white/10 p-5 rounded-lg border-l-4 border-l-signal">
                                <h4 className="font-display font-bold text-white text-base">
                                    {item.title}
                                </h4>
                                <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <a href="#contact" className="btn-primary">
                            Enquire for Rail Freight
                        </a>
                        <a href="#contact" className="btn-ghost">
                            Request Quote
                        </a>
                    </div>
                </div>

                {/* Right Image - Clean Standalone traincargo.jpg */}
                <div className="order-1 lg:order-2 relative">
                    <div className="absolute -inset-3 bg-signal/15 rounded-3xl rotate-2" />
                    <img
                        src={trainCargo}
                        alt="Railway freight cargo transportation by PRAGYA SHIPPING AND LOGISTICS"
                        className="relative w-full rounded-2xl object-cover shadow-2xl aspect-[4/3] border border-white/10"
                    />
                </div>
            </div>
        </section>
    );
}

export default RailwayFreight;
