import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Auth from './page/Auth'
import RegisterSuccess from './page/RegisterSuccess'
import '../css/app.css'

createRoot(document.getElementById('main')).render(
 <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
    </Routes>
  </BrowserRouter>
)
