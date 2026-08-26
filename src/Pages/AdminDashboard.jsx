import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        totalContacts: 0,
        newContacts: 0,
        readContacts: 0,
        resolvedContacts: 0
    });

    const [loading, setLoading] = useState(true);

    // ================= FETCH DASHBOARD =================

    const fetchDashboard = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/contact/dashboard"
            );

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    // ================= DASHBOARD CARDS =================

    const cards = [

        {
            title: "Total Contacts",
            value: dashboard.totalContacts,
            icon: "📩",
            color: "bg-emerald-500"
        },

        {
            title: "New Messages",
            value: dashboard.newContacts,
            icon: "🔔",
            color: "bg-orange-500"
        },

        {
            title: "Read Messages",
            value: dashboard.readContacts,
            icon: "👀",
            color: "bg-sky-500"
        },

        {
            title: "Resolved",
            value: dashboard.resolvedContacts,
            icon: "✅",
            color: "bg-green-500"
        }

    ];

    return (

        <div className="min-h-screen bg-sky-200 flex">

            {/* ================= SIDEBAR ================= */}

            <aside className="w-72 bg-emerald-900 text-white flex flex-col shadow-xl">

                <div className="p-6 border-b border-emerald-700">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-xl bg-white text-emerald-700 flex items-center justify-center text-2xl">

                            🚚

                        </div>

                        <div>

                            <h2 className="font-bold text-xl">

                                Pragya Shipping

                            </h2>

                            <p className="text-sm text-emerald-200">

                                Admin Dashboard

                            </p>

                        </div>

                    </div>

                </div>

                <div className="flex-1 py-6">

                    <button

                        onClick={() => navigate("/admin/dashboard")}

                        className="w-full px-6 py-4 flex items-center gap-3 bg-emerald-700 hover:bg-emerald-600 transition"

                    >

                        📊 Dashboard

                    </button>

                    <button

                        onClick={() => navigate("/admin/contacts")}

                        className="w-full px-6 py-4 flex items-center gap-3 hover:bg-emerald-800 transition"

                    >

                        📩 Contacts

                    </button>

                </div>

                <div className="p-6 border-t border-emerald-700">

                    <button

                        onClick={() => navigate("/")}

                        className="w-full py-3 rounded-lg bg-white text-emerald-700 font-semibold hover:bg-gray-100"

                    >

                        🌐 View Website

                    </button>

                    <button

                        onClick={() => navigate("/admin/login")}

                        className="w-full mt-3 py-3 rounded-lg bg-red-500 hover:bg-red-600"

                    >

                        Logout

                    </button>

                </div>

            </aside>

            {/* ================= MAIN ================= */}

            <div className="flex-1">

                {/* HEADER */}

                <header className="bg-sky-200 shadow-sm px-10 py-6 flex justify-between items-center">

                    <div>

                        <h1 className="text-3xl font-bold">

                            Dashboard

                        </h1>

                        <p className="text-gray-500">

                            Welcome Back Administrator

                        </p>

                    </div>

                    <button

                        onClick={fetchDashboard}

                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"

                    >

                        Refresh

                    </button>

                </header>

                {/* CONTENT */}

                <main className="p-8">

                    <div className="mb-8">

                        <h2 className="text-3xl font-bold">

                            Dashboard Overview

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Monitor your transportation website.

                        </p>

                    </div>

                    {/* CARDS */}

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

                        {cards.map((card) => (

                            <div

                                key={card.title}

                                className="bg-white rounded-2xl shadow-lg p-6"

                            >

                                <div className="flex justify-between items-center">

                                    <div>

                                        <p className="text-gray-500">

                                            {card.title}

                                        </p>

                                        <h2 className="text-4xl font-bold mt-3">

                                            {loading ? "..." : card.value}

                                        </h2>

                                    </div>

                                    <div

                                        className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl`}

                                    >

                                        {card.icon}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* ====== PART-2 yahin se continue hoga ====== */}
                    {/* ================= MAIN GRID ================= */}

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">

                        {/* LEFT SECTION */}

                        <div className="xl:col-span-2">

                            <div className="bg-white rounded-2xl shadow-lg p-6">

                                <div className="flex justify-between items-center mb-8">

                                    <div>

                                        <h2 className="text-2xl font-bold">
                                            Contact Summary
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            Overall message statistics
                                        </p>

                                    </div>

                                </div>

                                <div className="space-y-6">

                                    {/* NEW */}

                                    <div>

                                        <div className="flex justify-between mb-2">

                                            <span className="font-medium">
                                                🔔 New Messages
                                            </span>

                                            <span className="font-bold">
                                                {dashboard.newContacts}
                                            </span>

                                        </div>

                                        <div className="w-full h-3 rounded-full bg-gray-200">

                                            <div
                                                className="h-3 rounded-full bg-orange-500"
                                                style={{
                                                    width: dashboard.totalContacts
                                                        ? `${(dashboard.newContacts / dashboard.totalContacts) * 100}%`
                                                        : "0%"
                                                }}
                                            ></div>

                                        </div>

                                    </div>

                                    {/* READ */}

                                    <div>

                                        <div className="flex justify-between mb-2">

                                            <span className="font-medium">
                                                👀 Read Messages
                                            </span>

                                            <span className="font-bold">
                                                {dashboard.readContacts}
                                            </span>

                                        </div>

                                        <div className="w-full h-3 rounded-full bg-gray-200">

                                            <div
                                                className="h-3 rounded-full bg-sky-500"
                                                style={{
                                                    width: dashboard.totalContacts
                                                        ? `${(dashboard.readContacts / dashboard.totalContacts) * 100}%`
                                                        : "0%"
                                                }}
                                            ></div>

                                        </div>

                                    </div>

                                    {/* RESOLVED */}

                                    <div>

                                        <div className="flex justify-between mb-2">

                                            <span className="font-medium">
                                                ✅ Resolved
                                            </span>

                                            <span className="font-bold">
                                                {dashboard.resolvedContacts}
                                            </span>

                                        </div>

                                        <div className="w-full h-3 rounded-full bg-gray-200">

                                            <div
                                                className="h-3 rounded-full bg-green-600"
                                                style={{
                                                    width: dashboard.totalContacts
                                                        ? `${(dashboard.resolvedContacts / dashboard.totalContacts) * 100}%`
                                                        : "0%"
                                                }}
                                            ></div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT SECTION */}

                        <div className="space-y-7">

                            {/* SYSTEM STATUS */}

                            <div className="bg-white rounded-2xl shadow-lg p-6">

                                <h2 className="text-xl font-bold mb-5">

                                    System Status

                                </h2>

                                <div className="space-y-5">

                                    <div className="flex justify-between">

                                        <span>Server</span>

                                        <span className="text-green-600 font-bold">

                                            ● Online

                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Database</span>

                                        <span className="text-green-600 font-bold">

                                            ● Connected

                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>API</span>

                                        <span className="text-green-600 font-bold">

                                            ● Running

                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* RECENT ACTIVITY */}

                            <div className="bg-white rounded-2xl shadow-lg p-6">

                                <h2 className="text-xl font-bold mb-5">

                                    Recent Activity

                                </h2>

                                <div className="space-y-5">

                                    <div>

                                        <p className="font-medium">

                                            📩 Contact Form Submitted

                                        </p>

                                        <small className="text-gray-500">

                                            Customer inquiry received

                                        </small>

                                    </div>

                                    <div>

                                        <p className="font-medium">

                                            👀 Message Reviewed

                                        </p>

                                        <small className="text-gray-500">

                                            Admin viewed a contact

                                        </small>

                                    </div>

                                    <div>

                                        <p className="font-medium">

                                            ✅ Ticket Resolved

                                        </p>

                                        <small className="text-gray-500">

                                            Inquiry marked as resolved

                                        </small>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* FOOTER */}

                    <footer className="text-center text-gray-500 mt-12 pb-5">

                        © 2026 Pragya Shipping Admin Dashboard

                    </footer>

                </main>

            </div>

        </div>

    );

}

export default AdminDashboard;