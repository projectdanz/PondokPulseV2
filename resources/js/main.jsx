import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import RegisterSuccess from "./page/RegisterSuccess";
import ProtectedRoute from "./middleware/ProtectedRoute";
import DashboardManager from "./page/manager/Manager";
import DashboardKoordinator from "./page/koordinator/Koordinator";
import DashboardKaryawan from "./page/karyawan/Karyawan";
import Event from "./page/Event";
import Auth from "./page/Auth";
import "../css/app.css";

createRoot(document.getElementById("main")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/register-success" element={<RegisterSuccess />} />

            {/* Dashboard Manager */}
            <Route
                path="/dashboard/manager"
                element={
                    <ProtectedRoute role="Manager">
                        <DashboardManager />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/manager/event"
                element={
                    <ProtectedRoute role="Manager">
                        <Event />
                    </ProtectedRoute>
                }
            />

            {/* Dashboard Koordinator */}
            <Route
                path="/dashboard/koordinator"
                element={
                    <ProtectedRoute role="Koordinator">
                        <DashboardKoordinator />
                    </ProtectedRoute>
                }
            />

            {/* Dashboard Karyawan */}
            <Route
                path="/dashboard/karyawan"
                element={
                    <ProtectedRoute role="Karyawan">
                        <DashboardKaryawan />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </BrowserRouter>,
);
