import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import Home from "../main_components/Home";
import AdminPage from "../main_components/AdminPage";
import SuperadminPage from "../main_components/SuperadminPage";
import GuestPage from "../main_components/GuestPage";
import LoginForm from "../reusable_components/LoginForm";

const RoutesComponent: React.FC = () => {
  const { role, isLoggedIn } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      
      <Route 
        path="/admin" 
        element={
          isLoggedIn() && role === 'admin' ? 
            <AdminPage /> : 
            <Navigate to="/home" />
        } 
      />
      <Route 
        path="/superadmin" 
        element={
          isLoggedIn() && role === 'superadmin' ? 
            <SuperadminPage /> : 
            <Navigate to="/home" />
        } 
      />
      <Route path="/guest" element={<GuestPage />} />
    </Routes>
  );
};

export default RoutesComponent;