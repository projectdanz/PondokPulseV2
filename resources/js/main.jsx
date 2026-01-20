import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import RegisterSuccess from './page/RegisterSuccess'
import ProtectedRoute from './middleware/ProtectedRoute'
import DashboardManager from './page/manager/Manager'
import DashboardKoordinator from './page/koordinator/Koordinator'
import DashboardKaryawan from './page/karyawan/Karyawan'
import Auth from './page/Auth'
import '../css/app.css'

createRoot(document.getElementById('main')).render(
 <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/register-success" element={<RegisterSuccess />} />

      /* dashboard user role */
      //manager
      <Route 
        path="/dashboard/manager"
        element={
          <ProtectedRoute role="Manager">
            <DashboardManager />
          </ProtectedRoute>
        } 
      />

      //koordinator
      <Route 
        path="/dashboard/koordinator"
        element={
          <ProtectedRoute role="Koordinator">
            <DashboardKoordinator />
          </ProtectedRoute>
        } 
      />

      //karyawan
      <Route 
        path="/dashboard/karyawan"
        element={
          <ProtectedRoute role="Karyawan">
            <DashboardKaryawan />
          </ProtectedRoute>
        } 
      />
    </Routes>
  </BrowserRouter>
)
