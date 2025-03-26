import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/logout/", {
        method: "POST",
        credentials: "include", //Ensure cookies are sent
      });
  
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  return (
    <button className="leave-button" onClick={handleLogout}>
      SAIR
    </button>
  );
};

export default LogoutButton;
