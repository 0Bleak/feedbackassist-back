import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import Home from "../main_components/Home";
import AdminPage from "../main_components/AdminPage";
import SuperadminPage from "../main_components/SuperadminPage";
import GuestPage from "../main_components/GuestPage";
import LoginForm from "../reusable_components/LoginForm";

const RoutesComponent: React.FC = () => {
  const { role } = useAuthStore(); // Access role from Zustand store

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      
      {/* Protected Routes */}
      <Route path="/admin" element={role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
      <Route path="/superadmin" element={role === 'superadmin' ? <SuperadminPage /> : <Navigate to="/login" />} />
      
      {/* Guest route */}
      <Route path="/guest" element={<GuestPage />} />
    </Routes>
  );
};

export default RoutesComponent;
