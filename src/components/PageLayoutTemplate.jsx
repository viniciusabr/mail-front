import React, { useState } from "react";
import Footer from "./Footer/Footer";
import HeaderTemplate from "./Header/HeaderTemplate";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar/Sidebar";
import SidebarAdm from "./Sidebar/SidebarAdm";
import { useCurrentUser } from "../hook/useCurrentUser.js";

export default function PageLayoutTemplate({ children, showHeader = true }) {
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

  // Se não estiver logado
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Usuário não autenticado. Faça login para continuar.</p>
      </div>
    );
  }

  // Sidebar correta
  const SidebarComponent = user.user_adm ? SidebarAdm : Sidebar;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[#4c1d95] via-[#5b21b6] to-[#3b0764]">
      {/* Sidebar */}
      <SidebarComponent isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Conteúdo */}
      <motion.div
        className={`flex flex-col flex-1 transition-all duration-300 grid grid-rows-[auto_1fr_auto] 
          ${isSidebarOpen ? "ml-64" : "ml-20"}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {showHeader && (
          <motion.header
            className="flex flex-col items-center justify-center h-40 text-center px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <HeaderTemplate />
          </motion.header>
        )}

        <motion.main
          className="flex items-center justify-center pt-6 pb-20 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          {children}
        </motion.main>

        <Footer />
      </motion.div>
    </div>
  );
}
