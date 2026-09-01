import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminManagement from "./Pages/AdminManagement";
import TrackShipment from "./Pages/TrackShipment";
import QuoteCalculator from "./Pages/QuoteCalculator";
import AdminShipments from "./Pages/AdminShipments";
import AdminPayments from "./Pages/AdminPayments";
import AdminChangePassword from "./Pages/AdminChangePassword";
import AdminRates from "./Pages/AdminRates";

import "./App.css";


// ================= PROTECTED ROUTE =================

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("adminToken");

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}


function App() {

    return (

        <BrowserRouter>

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
                    }
                }}
            />

            <Routes>

                {/* ================= PUBLIC WEBSITE ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* ================= TRACK SHIPMENT (PUBLIC) ================= */}

                <Route
                    path="/track"
                    element={<TrackShipment />}
                />


                {/* ================= QUOTE CALCULATOR (PUBLIC) ================= */}

                <Route
                    path="/quote"
                    element={<QuoteCalculator />}
                />


                {/* ================= ADMIN LOGIN ================= */}

                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />


                {/* ================= PROTECTED DASHBOARD ================= */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* ================= PROTECTED CONTACTS ================= */}

                <Route
                    path="/admin/contacts"
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    }
                />


                {/* ================= PROTECTED SHIPMENTS ================= */}

                <Route
                    path="/admin/shipments"
                    element={
                        <ProtectedRoute>
                            <AdminShipments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/payments"
                    element={
                        <ProtectedRoute>
                            <AdminPayments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/change-password"
                    element={
                        <ProtectedRoute>
                            <AdminChangePassword />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/rates"
                    element={
                        <ProtectedRoute>
                            <AdminRates />
                        </ProtectedRoute>
                    }
                />


                {/* ================= PROTECTED ADMIN MANAGEMENT ================= */}

                <Route
                    path="/admin/admin-management"
                    element={
                        <ProtectedRoute>
                            <AdminManagement />
                        </ProtectedRoute>
                    }
                />


                {/* ================= ADMIN ROOT ================= */}

                <Route
                    path="/admin"
                    element={
                        <Navigate
                            to="/admin/login"
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