import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/contacts", label: "Contacts" },
    { path: "/admin/shipments", label: "Shipments" },
    { path: "/admin/payments", label: "Payments" },
    { path: "/admin/rates", label: "Rates" },
    { path: "/admin/admin-management", label: "Admins" },
    { path: "/admin/change-password", label: "Password" }
];

export default function AdminLayout({ title, subtitle, actions, children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    const Sidebar = () => (
        <aside className="w-64 bg-ink text-white flex flex-col h-full border-r border-white/5">
            <div className="px-6 py-6 border-b border-white/10">
                <Link to="/" className="font-display text-sm font-bold text-white block">
                    <span>PRAGYA SHIPPING </span>
                    <span className="text-signal block text-xs tracking-wider">AND LOGISTICS</span>
                </Link>
                <p className="text-white/40 text-[11px] mt-1.5 tracking-wider uppercase">Admin Portal</p>
            </div>

            <nav className="flex-1 py-4 px-3 space-y-1">
                {NAV.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            type="button"
                            onClick={() => {
                                navigate(item.path);
                                setMobileOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm font-medium transition ${
                                active
                                    ? "bg-signal text-ink"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full py-2.5 text-sm font-semibold border border-white/20 text-white/80 hover:bg-white/5 transition"
                >
                    View Website
                </button>
                <button
                    type="button"
                    onClick={logout}
                    className="w-full py-2.5 text-sm font-semibold bg-white/10 text-white hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </aside>
    );

    return (
        <div className="min-h-screen bg-fog flex">
            <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 z-30">
                <Sidebar />
            </div>

            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-ink/60" onClick={() => setMobileOpen(false)} />
                    <div className="absolute inset-y-0 left-0 z-50">
                        <Sidebar />
                    </div>
                </div>
            )}

            <div className="flex-1 lg:pl-64 min-w-0">
                <header className="sticky top-0 z-20 bg-fog/90 backdrop-blur border-b border-mist px-4 sm:px-8 py-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <button
                                type="button"
                                className="lg:hidden mt-1 p-2 text-ink"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open menu"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">{title}</h1>
                                {subtitle && <p className="text-muted text-sm mt-1">{subtitle}</p>}
                            </div>
                        </div>
                        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
                    </div>
                </header>

                <main className="p-4 sm:p-8">{children}</main>
            </div>
        </div>
    );
}
