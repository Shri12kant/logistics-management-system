import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";

import "./App.css";

function App() {

    return (

        <BrowserRouter>

            {/* ================= TOAST ================= */}

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,

                    style: {
                        background: "#ffffff",
                        color: "#111827",
                        borderRadius: "12px",
                        padding: "14px 18px",
                        fontWeight: "500",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                    },

                    success: {
                        iconTheme: {
                            primary: "#10B981",
                            secondary: "#ffffff"
                        }
                    },

                    error: {
                        iconTheme: {
                            primary: "#EF4444",
                            secondary: "#ffffff"
                        }
                    }
                }}
            />

            <Routes>

                {/* ================= PUBLIC WEBSITE ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                {/* ================= ADMIN LOGIN ================= */}

                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

                {/* ================= ADMIN DASHBOARD ================= */}

                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />

                {/* ================= CONTACTS ================= */}

                <Route
                    path="/admin/contacts"
                    element={<Admin />}
                />

                {/* ================= REDIRECT ================= */}

                <Route
                    path="/admin"
                    element={
                        <Navigate
                            to="/admin/dashboard"
                            replace
                        />
                    }
                />

                {/* ================= 404 ================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;