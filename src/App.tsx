import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Login } from "./pages/Login";
import { Callback } from "./pages/Callback";
import { AuthPopup } from "./pages/AuthPopup";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { PricingPlans } from "./pages/dashboard/PricingPlans";
import { ClientKeys } from "./pages/dashboard/ClientKeys";
import { Overview } from "./pages/dashboard/Overview";
import { SSOTest } from "./pages/SSOTest";

function App() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/ssotest" element={<SSOTest />} />
      <Route path="/auth-popup" element={<AuthPopup />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="pricing" element={<PricingPlans />} />
        <Route path="keys" element={<ClientKeys />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
