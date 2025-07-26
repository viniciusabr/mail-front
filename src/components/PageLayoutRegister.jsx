import React from "react";
import Footer from "./Footer/Footer";
import HeaderRegister from "./Header/HeaderRegister";

export default function PageLayoutRegister({ children, header = <HeaderRegister />, showHeader = true }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#4c1d95] via-[#5b21b6] to-[#3b0764] grid grid-rows-[auto_1fr_auto] px-4">
      {showHeader && (
        <header className="flex flex-col items-center justify-center h-32 text-center">
          {header}
        </header>
      )}

      <main className="flex items-center justify-center -mt-28">
        {children}
      </main>

      <Footer />
    </div>
  );
}
