import React from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hook/useCurrentUser";

const PrivateRouteAdmin = ({ children }) => {
  const { user } = useCurrentUser();

  // Enquanto carrega o usuário
  if (user === null) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Carregando usuário...</p>
      </div>
    );
  }

  // Se não estiver logado ou não for admin
  if (!user || !user.user_adm) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default PrivateRouteAdmin;
