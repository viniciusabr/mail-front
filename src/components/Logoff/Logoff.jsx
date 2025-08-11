import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    // Remove dados de autenticação
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redireciona para login
    navigate("/auth/login");
  }

  return (
    <button onClick={handleLogout} style={{
      padding: "10px 20px",
      backgroundColor: "#e63946",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}> <LogOut />Sair
    </button>
  );
}