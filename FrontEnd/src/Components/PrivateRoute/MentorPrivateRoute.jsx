import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import MentorAuthContext from "../../context/MentorAuthContext"; // Path check kar lena

const MentorPrivateRoute = () => {
  const { mentorToken, loading } = useContext(MentorAuthContext);

  if (loading) return <div style={{ padding: 20 }}>Loading Mentor Profile...</div>;

  // Agar mentor token hai to dashboard/profile dikhao, nahi to login pe bhejo
  return mentorToken ? <Outlet /> : <Navigate to="/mentorSignUp" replace />;
};

export default MentorPrivateRoute;