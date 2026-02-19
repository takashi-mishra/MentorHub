import React from "react";
import Home from "./Pages/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar/Navbar";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import MentorProfile from "./Pages/MentorProfile";
import Chat from './Pages/Chat.jsx';
import ChatPage from "./Pages/ChatPage.jsx";
import MentorChat from './Pages/MentorChat.jsx';
import MentorDetails from "./Components/Mentor list/MentorDetails";
import SearchResults from "./Components/Mentor list/SearchResults";
// files imported
import UserForm from "./Components/Forms/userForm.jsx";
import UserLoginForm from "./Components/Forms/userLoginForm.jsx";
import OtpVerify from "./Components/Forms/OtpVerify.jsx";
import MentorForm from "./Components/Forms/MentorForm.jsx";
import MentorOtpVerify from "./Components/Forms/MentorOtpVerify.jsx";
import MentorLoginForm from "./Components/Forms/MentorLoginForm.jsx";
import MentorPrivateRoute from "./Components/PrivateRoute/MentorPrivateRoute.jsx";
import SharedPrivateRoute from "./Components/PrivateRoute/SharedPrivateRoute.jsx";



function App() {
  return (
    <>
      <Navbar />
     <Routes>
        {/* --- Public Routes (Sab dekh sakte hain) --- */}
        <Route path="/" element={<Home />} />
        <Route path="/userSignUp" element={<UserForm />} />
        <Route path="/userloginform" element={<UserLoginForm />} />
        <Route path="/otpverify" element={<OtpVerify />} />
        <Route path="/mentor-register" element={<MentorForm />} />
        <Route path="/mentor-otpverify" element={<MentorOtpVerify />} />
        <Route path="/mentorloginform" element={<MentorLoginForm />} />

        {/* --- Shared Protected Routes (User aur Mentor dono ke liye) --- */}
        <Route element={<SharedPrivateRoute />}>
          <Route path="/mentor/:id" element={<MentorDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mentor-chat" element={<MentorChat/>} />
          <Route path="/chat-window" element={<ChatPage />} />

        </Route>

        {/* --- Exclusive Mentor Routes (Sirf Mentor ke liye) --- */}
        <Route element={<MentorPrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentor-profile" element={<MentorProfile />} />
        </Route>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App
