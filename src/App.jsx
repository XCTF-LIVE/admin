import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes basename={`https://admin.xctf.live`}>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
