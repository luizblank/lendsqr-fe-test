import { BrowserRouter, Routes, Route } from "react-router-dom";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/userdetails" element={<UserDetails />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
