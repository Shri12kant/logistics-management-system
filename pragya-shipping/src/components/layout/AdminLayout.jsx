import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../assets/pragya-logo.png";

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
        <aside className="w-64 bg-[#0a1628] text-white flex flex-col h-full border-r border-slate-800">
            <div className="px-5 py-5 border-b border-slate-800">
                <Link to="/" className="flex items-center gap-2.5">
                    <img
                        src={logoImg}
                        alt="Logo"
                        className="h-10 w-auto object-contain shrink-0"
                    />
                    <div className="flex flex-col leading-tight">
                        <span className="font-display text-xs font-bold text-signal">
                            Pragya Shipping and Logistics
                        </span>
                        <span className="text-[9px] font-semibold text-orange-400">
                            International Freight Forwarders
                        </span>
                        <span className="text-[9px] font-semibold text-orange-400">
                            प्रज्ञा शिपिंग आणि लॉजिस्टिक्स
                        </span>
                    </div>
                </Link>
                <p className="text-slate-400 text-[10px] mt-2 tracking-wider uppercase font-semibold">Admin Portal</p>
            </div>

            <nav className="flex-1 py-4 px-3 space-y-1.5">
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
                            className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition ${
                                active
                                    ? "bg-signal text-[#0a1628] font-bold shadow-sm"
                                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-2">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full py-2.5 text-sm font-semibold border border-slate-700 text-slate-200 hover:bg-white/10 rounded-lg transition"
                >
                    View Website
                </button>
                <button
                    type="button"
                    onClick={logout}
                    className="w-full py-2.5 text-sm font-semibold bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white rounded-lg transition"
                >
                    Logout
                </button>
            </div>
        </aside>
    );

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 flex">
            <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 z-30">
                <Sidebar />
            </div>

            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-[#0a1628]/70 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
                    <div className="absolute inset-y-0 left-0 z-50">
                        <Sidebar />
                    </div>
                </div>
            )}

            <div className="flex-1 lg:pl-64 min-w-0">
                <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-8 py-5 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <button
                                type="button"
                                className="lg:hidden mt-1 p-2 text-slate-700 hover:bg-slate-100 rounded-md"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open menu"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-900">{title}</h1>
                                {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
                            </div>
                        </div>
                        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
                    </div>
                </header>

                <main className="p-4 sm:p-8 text-slate-900">{children}</main>
            </div>
        </div>
    );
}
