import React, { useState } from "react";
import Footer from "./Footer/Footer.jsx";
import HeaderDashboard from "./Header/HeaderProfile.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx"; // sidebar comum
import SidebarAdm from "./Sidebar/SidebarAdm.jsx"; // sidebar admin
import { useCurrentUser } from "../hook/useCurrentUser.js";

export default function PageLayoutSendMail({ 
  children, 
  header = <HeaderDashboard />, 
  showHeader = true 
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useCurrentUser();

  // Se ainda estiver carregando
  if (user === null) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Carregando usuário...</p>
      </div>
    );
  }

  // Se o usuário não estiver logado
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Usuário não autenticado. Faça login para continuar.</p>
      </div>
    );
  }

  // Escolhe sidebar de acordo com admin
  const SidebarComponent = user.user_adm ? SidebarAdm : Sidebar;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[#4c1d95] via-[#5b21b6] to-[#3b0764]">
      <SidebarComponent isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {showHeader && (
          <header className="flex flex-col items-center justify-center h-32 text-center w-full">
            {header}
          </header>
        )}

        <main className="flex-grow flex flex-col items-center justify-start overflow-y-auto px-4">
          {children}
        </main>

        <footer className="mt-6 w-full">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
