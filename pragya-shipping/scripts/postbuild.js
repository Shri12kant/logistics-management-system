import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
    console.error("dist/index.html not found! Run build first.");
    process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, "utf8");

// List of routes to pre-create static folders for
const routes = [
    {
        path: "quote",
        title: "Request a Freight Quote | Pragya Shipping and Logistics",
        description: "Get instant commercial freight rates for ocean containers, customs clearance, road transport, and railway logistics across India."
    },
    {
        path: "services/ocean-freight",
        title: "Ocean Freight Forwarder JNPT Mumbai | FCL & LCL Container Shipping | Pragya Shipping",
        description: "Reliable ocean freight forwarding via JNPT Nhava Sheva & Mumbai Port. FCL/LCL container cargo, global shipping line contracts, Bill of Lading documentation & port handling."
    },
    {
        path: "services/customs-clearance",
        title: "Customs Clearance Agent CHA JNPT Mumbai | Import Export Broker | Pragya Shipping",
        description: "Expert Customs Clearance (CHA) services at JNPT Nhava Sheva & Mumbai Port. Fast Bill of Entry, Shipping Bill, ICEGATE filing, HSN duty assessment & cargo inspection."
    },
    {
        path: "services/road-transport",
        title: "Road Transport Services Mumbai Thane | FTL Container Trailer Fleet | Pragya Shipping",
        description: "Reliable road transportation across Maharashtra & Pan-India. Full Truck Load (FTL), dedicated port container trailers (20ft/40ft), industrial cargo transit with live tracking."
    },
    {
        path: "services/railway-freight",
        title: "Railway Freight Corridors DFC India | Container Train Logistics | Pragya Shipping",
        description: "Eco-friendly, cost-efficient railway freight logistics via Dedicated Freight Corridors (DFC). Direct port rail connectivity linking JNPT to Inland Container Depots (ICDs)."
    },
    {
        path: "services/project-cargo",
        title: "Project Cargo & ODC Heavy Lift Forwarding Mumbai | Pragya Shipping",
        description: "Specialized Project Cargo & Over-Dimensional Cargo (ODC) handling. Multi-axle hydraulic trailers, route feasibility surveys, RTO permits, factory to foundation delivery."
    }
];

// Also write _redirects for Render / Netlify
const redirectsContent = "/*    /index.html   200\n";
fs.writeFileSync(path.join(distDir, "_redirects"), redirectsContent);

for (const route of routes) {
    const targetDir = path.join(distDir, route.path);
    fs.mkdirSync(targetDir, { recursive: true });

    let routeHtml = baseHtml;
    // Replace title
    routeHtml = routeHtml.replace(
        /<title>.*?<\/title>/,
        `<title>${route.title}</title>`
    );
    // Replace meta description
    routeHtml = routeHtml.replace(
        /<meta name="description" content=".*?" \/>/,
        `<meta name="description" content="${route.description}" />`
    );
    // Replace canonical URL
    routeHtml = routeHtml.replace(
        /<link rel="canonical" href=".*?" \/>/,
        `<link rel="canonical" href="https://pragyashipping.in/${route.path}" />`
    );

    fs.writeFileSync(path.join(targetDir, "index.html"), routeHtml);
    console.log(`Generated static entry: dist/${route.path}/index.html`);
}

console.log("Post-build static routing successfully generated!");
