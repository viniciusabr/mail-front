export default function UserTable({ users, onToggleStatus, onToggleAdmin }) {
  if (!Array.isArray(users) || users.length === 0) {
    return <p className="text-gray-500">Nenhum usuário encontrado.</p>;
  }

  return (
    <table className="w-full border-collapse ">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Nome</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Admin</th>
          <th className="border p-2">Ações</th>
          
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="border p-2">{user.id}</td>
            <td className="border p-2">{user.name}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{user.status}</td>
            <td className="border p-2">
              {user.user_adm ? "Sim" : "Não"}
            </td>
            <td className="border p-2 flex gap-2">
              {/* Botão de ativar/inativar */}
              <button
                onClick={() => onToggleStatus(user.id, user.status)}
                className={`px-3 py-1 rounded text-white ${
                  user.status === "ativo" ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {user.status === "ativo" ? "Inativar" : "Ativar"}
              </button>

              {/* Botão de admin */}
              <button
                onClick={() => onToggleAdmin(user.id, user.user_adm)}
                className={`px-3 py-1 rounded text-white ${
                  user.user_adm ? "bg-purple-500" : "bg-gray-500"
                }`}
              >
                {user.user_adm ? "Remover ADM" : "Tornar ADM"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}