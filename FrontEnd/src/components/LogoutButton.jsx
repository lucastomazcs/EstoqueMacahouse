import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// É necessario atualizar const handleLogout para que o Logout funcione

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/logout/", {
        method: "POST",
        credentials: "include", // Garante que os cookies sejam enviados
      });
  
      navigate("/"); // Redireciona para a pagina de login
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
