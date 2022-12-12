import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/xctf-live-admin/login" element={<Login />} />
        <Route exact path="/xctf-live-admin/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
