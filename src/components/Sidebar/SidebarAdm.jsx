import { Home, User, Settings, LogOut, AlignJustify, Mail, LayoutDashboard, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarAdm({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Início", icon: <Home size={20} />, path: "/send-emails" },
    { name: "Perfil", icon: <User size={20} />, path: "/profile" },
    { name: "E-mails CSAT", icon: <Mail size={20} />, path: "/send-emails" },
    { name: "Templates IA", icon: <Sparkles size={20} />, path: "/templates" },
    { name: "Dashbord", icon: <LayoutDashboard size={20} />, path: "/dashbord" },
    { name: "Painel Administração", icon: <Settings size={20} />, path: "/painel" }
  ];



  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  }

  return (
    <div
      className={`fixed top-0 left-0 h-screen ${isOpen ? "w-64" : "w-20"
        } bg-violet-950 text-white transition-all duration-300 flex flex-col`}
    >
      {/* Botão de toggle */}
      <button
        className="p-3 hover:bg-purple-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AlignJustify />
      </button>

      {/* Menu */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-md transition-colors
              ${location.pathname === item.path ? "bg-purple-700" : "hover:bg-purple-800"}
            `}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        onClick={handleLogout}
        className="p-3 hover:bg-red-700 cursor-pointer flex items-center gap-3 transition-colors"
      >
        <LogOut size={20} />
        {isOpen && <span>Sair</span>}
      </div>
    </div>
  );
}