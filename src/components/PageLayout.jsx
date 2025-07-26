// import React from "react";
// import Footer from "./Footer/Footer";
// import HeaderLogin from "./Header/HeaderLogin";

// export default function PageLayout({ children, showHeader = true }) {
//   return (
//     <div className="min-h-screen w-full bg-gradient-to-b from-[#512DA8] to-[#673AB7] flex flex-col items-center justify-start pt-40 px-4 pb-6">
//       {showHeader && (
//         <header className="text-center space-y-1 mb-14">
//           <HeaderLogin />
//         </header>
//       )}
//       <main className="w-full flex flex-col items-center justify-center">
//         {children}
//       </main>
//       <Footer />
//     </div>
//   );
// }


import React from "react";
import Footer from "./Footer/Footer";
import HeaderLogin from "./Header/HeaderLogin";

export default function PageLayout({ children, header = <HeaderLogin />, showHeader = true }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#4c1d95] via-[#5b21b6] to-[#3b0764] grid grid-rows-[auto_1fr_auto] px-4">
      {showHeader && (
        <header className="flex flex-col items-center justify-center h-32 text-center">

          {header}
        </header>
      )}

      <main className="flex items-center justify-center -mt-28 ">
        {children}
      </main>

      <Footer />
    </div>
  );
}

