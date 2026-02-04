import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const PrivateRoute = () => {
  const { token, loading } = useAuth();

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return token ? <Outlet /> : <Navigate to="/userSignUp" replace />;
};

export default PrivateRoute;
