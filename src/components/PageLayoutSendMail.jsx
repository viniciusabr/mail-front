import React, { useState } from "react";
import Footer from "./Footer/Footer";
import HeaderDashboard from "./Header/HeaderDashboard";
import Sidebar from "../components/Sidebar/Sidebar"; // importa o sidebar

export default function PageLayoutSendMail({
  children,
  header = <HeaderDashboard />,
  showHeader = true,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // controla sidebar

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[#4c1d95] via-[#5b21b6] to-[#3b0764]">
      {/* SIDEBAR */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* CONTEÚDO PRINCIPAL */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* HEADER */}
        {showHeader && (
          <header className="flex flex-col items-center justify-center h-32 text-center w-full">
            {header}
          </header>
        )}

        {/* MAIN */}
        <main className="flex-grow flex flex-col items-center justify-start overflow-y-auto px-4">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="mt-6 w-full">
          <Footer />
        </footer>
      </div>
    </div>
  );
}