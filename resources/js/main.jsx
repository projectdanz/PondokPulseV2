import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import RegisterSuccess from "./page/RegisterSuccess";
import ProtectedRoute from "./middleware/ProtectedRoute";
import DashboardManager from "./page/manager/Manager";
import DashboardKoordinator from "./page/koordinator/Koordinator";
import DashboardKaryawan from "./page/karyawan/Karyawan";
import Event from "./page/Event";
import Auth from "./page/Auth";
import PeriodeManagement from "./page/manager/Periode";
import KpiManagement from "./page/manager/Kpi";
import JobDeskManagement from "./page/manager/JobDesk";
import UserManagement from "./page/UserManagement";
import Absensi from "./page/Absensi";
import MyKpi from "./page/MyKpi";
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
            <Route
                path="/dashboard/manager/periode"
                element={
                    <ProtectedRoute role="Manager">
                        <PeriodeManagement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/manager/kpi"
                element={
                    <ProtectedRoute role="Manager">
                        <KpiManagement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/manager/jobdesk"
                element={
                    <ProtectedRoute role="Manager">
                        <JobDeskManagement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/manager/absensi"
                element={
                    <ProtectedRoute role="Manager">
                        <Absensi />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/manager/karyawan"
                element={
                    <ProtectedRoute role="Manager">
                        <UserManagement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/manager/my-kpi"
                element={
                    <ProtectedRoute role="Manager">
                        <MyKpi />
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
            <Route
                path="/dashboard/koordinator/absensi"
                element={
                    <ProtectedRoute role="Koordinator">
                        <Absensi />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/koordinator/karyawan"
                element={
                    <ProtectedRoute role="Koordinator">
                        <UserManagement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/koordinator/my-kpi"
                element={
                    <ProtectedRoute role="Koordinator">
                        <MyKpi />
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
            <Route
                path="/dashboard/karyawan/absensi"
                element={
                    <ProtectedRoute role="Karyawan">
                        <Absensi />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/karyawan/my-kpi"
                element={
                    <ProtectedRoute role="Karyawan">
                        <MyKpi />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </BrowserRouter>,
);
