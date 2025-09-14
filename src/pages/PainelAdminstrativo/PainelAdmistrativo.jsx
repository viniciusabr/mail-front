import React, { useEffect, useState } from "react";
import SidebarAdm from "../../components/Sidebar/SidebarAdm";
import UserTable from "../../components/UserTable/UserTable";
import { getUsers, toggleUserStatus as apiToggleUserStatus, updateUserAdmin } from "../../services/emailService";

export default function PainelAdmistrativo() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(""); // estado da pesquisa

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();0,
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();
  }, []);

  // alternar status (ativo/inativo)
  const toggleUserStatus = async (id, currentStatus) => {
    try {
      const updatedUser = await apiToggleUserStatus(id, currentStatus);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: updatedUser.status } : user
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  // alternar admin (true/false)
  const toggleUserAdminStatus = async (id, currentAdm) => {
    try {
      const updatedUser = await updateUserAdmin(id, !currentAdm);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, user_adm: updatedUser.user_adm } : user
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar admin:", error);
    }
  };

  // aplica filtro pelo nome ou email
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <SidebarAdm isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`flex-1 min-h-screen p-10 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="bg-white shadow-lg rounded-xl w-[890px] max-w-6xl mx-auto p-8 border border-orange-500">
          <h1 className="text-2xl font-semibold mb-6">Usuários</h1>

          {/* Caixa de pesquisa alinhada à direita */}
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Pesquisar por nome ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 rounded w-1/3 outline-none"
            />
          </div>

          {/* Tabela com altura fixa */}
          <div className="h-[510px] overflow-y-scroll">
            {filteredUsers.length > 0 ? (
              <UserTable
                users={filteredUsers}
                onToggleStatus={toggleUserStatus}
                onToggleAdmin={toggleUserAdminStatus} // ⚡ ajuste aqui
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Nenhum usuário encontrado
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}