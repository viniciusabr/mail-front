// import React from "react";
// import Footer from "./Footer/Footer";
// import HeaderDashboard from "./Header/HeaderDashboard";

// export default function PageLayoutSendMail({ children, header = <HeaderDashboard />, showHeader = true }) {
//   return (
//     <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#4c1d95] via-[#5b21b6] to-[#3b0764]">
//       {showHeader && (
//         <header className="flex flex-col items-center justify-center h-32 text-center w-full">
//           {header}
//         </header>
//       )}

//       <main className="flex-grow flex flex-col items-center justify-start overflow-x-hidden">
//         {children}
//       </main>

//       <Footer />
//     </div>
//   );
// }


import React from "react";
import Footer from "./Footer/Footer";
import HeaderDashboard from "./Header/HeaderDashboard";

export default function PageLayoutSendMail({ children, header = <HeaderDashboard />, showHeader = true }) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#4c1d95] via-[#5b21b6] to-[#3b0764]">
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
  );
}
