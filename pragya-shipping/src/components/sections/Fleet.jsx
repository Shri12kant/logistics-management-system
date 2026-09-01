import truck1 from "../../assets/truck1.jpg";
import truck2 from "../../assets/truck2.jpg";
import truck3 from "../../assets/truck3.jpg";
import truck4 from "../../assets/truck4.jpg";

function Fleet() {
    const fleet = [
        {
            image: truck1,
            title: "Mini Truck",
            description: "Local deliveries and compact city consignments."
        },
        {
            image: truck2,
            title: "Container Truck",
            description: "Long-distance and high-volume freight."
        },
        {
            image: truck3,
            title: "Refrigerated Truck",
            description: "Produce and temperature-sensitive cargo."
        },
        {
            image: truck4,
            title: "Heavy Cargo Truck",
            description: "Industrial loads and oversized shipments."
        }
    ];

    return (
        <section id="fleet" className="py-20 md:py-28 bg-fog">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                    <p className="section-label">Our Fleet</p>
                    <h2 className="section-title">Vehicles ready for every load</h2>
                    <p className="section-lead">
                        A practical mix of trucks — matched to cargo size, distance, and urgency.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
                    {fleet.map((item) => (
                        <article
                            key={item.title}
                            className="group relative overflow-hidden aspect-[3/4] bg-ink"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-6">
                                <h3 className="font-display text-xl font-bold text-white">
                                    {item.title}
                                </h3>
                                <p className="text-white/70 text-sm mt-2 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Fleet;
