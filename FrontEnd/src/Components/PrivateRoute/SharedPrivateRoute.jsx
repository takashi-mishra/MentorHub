import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthContext"; 
import MentorAuthContext from "../../context/MentorAuthContext";

const SharedPrivateRoute = () => {
  const { token, loading: userLoading } = useContext(AuthContext);
  const { mentorToken, loading: mentorLoading } = useContext(MentorAuthContext);

  if (userLoading || mentorLoading) return <div style={{ padding: 20 }}>Checking session...</div>;

  // Agar Dono mein se koi ek bhi login hai toh aage badhne do
  return (token || mentorToken) ? <Outlet /> : <Navigate to="/userSignUp" replace />;
};

export default SharedPrivateRoute;