import { Home, User, Settings, LogOut, AlignJustify, StickyNote } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Início", icon: <Home size={20} />, path: "/send-emails" },
    { name: "Perfil", icon: <User size={20} />, path: "/profile" },
    { name: "Cadastrar Templates", icon: <StickyNote size={20} />, path: "/templates" },
    { name: "Configurações", icon: <Settings size={20} />, path: "/settings" },
  ];

  const filteredMenu = import.meta.env.MODE === 'development'
    ? menuItems
    : menuItems.filter(
      (item) => item.path !== "/templates" && item.path !== "/settings"
    )


  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  }

  return (
    <div
      className={`fixed top-0 left-0 h-screen 
        ${isOpen ? "w-52  " : "w-16"} 
        bg-violet-950 text-white 
        transition-all duration-300 flex flex-col shadow-lg`}
    >
      {/* Header com toggle */}
      <div
        className={`flex items-center border-b border-purple-800 transition-all ${isOpen ? "justify-between px-3 py-3" : "justify-center py-3"
          }`}
      >
        {isOpen && <span className="text-lg font-bold">Mail CSAT</span>}
        <button
          className="p-2 rounded-md hover:bg-purple-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AlignJustify />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4 space-y-1">
        {filteredMenu.map((item, index) => {
          const active = location.pathname === item.path;
          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center py-2 cursor-pointer rounded-md transition-colors
    ${active ? "bg-purple-700 border-l-4 border-yellow-300 text-yellow-300" : "hover:bg-purple-800"}
    ${isOpen ? "px-3 gap-3 justify-start" : "justify-start pl-5"}
  `}
            >
              {item.icon}
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            </div>

          );
        })}
      </nav>

      {/* Footer - Logout */}
      <div className="border-t border-purple-800">
        <div
          onClick={handleLogout}
          className={`flex items-center cursor-pointer transition-colors hover:bg-red-700
            ${isOpen ? "px-3 gap-3 justify-start py-3" : "justify-center py-3"}
          `}
        >
          <LogOut size={20} />
          {isOpen && <span className="text-sm font-medium">Sair</span>}
        </div>
      </div>
    </div>
  );
}
