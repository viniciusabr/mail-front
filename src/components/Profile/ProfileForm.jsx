import { useState } from "react";

function ProfileForm({ user, onUpdateProfile, onChangePassword }) {
  const [profileData, setProfileData] = useState({ name: user.name, email: user.email });
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onUpdateProfile(profileData); // só manda name/email
      }}
      className="bg-white shadow-md rounded-lg p-6 w-[800px] mx-auto space-y-4 border border-orange-500"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Meu Perfil</h2>

      {/* Nome */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Nome:</label>
        <input
          type="text"
          value={profileData.name}
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Email */}
      {/* <div>
        <label className="block text-gray-700 font-medium mb-1">Email:</label>
        <input
          type="email"
          value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div> */}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Atualizar Perfil
      </button>

      <hr className="my-4 border-gray-300" />

      {/* Senha */}
      <h3 className="text-xl font-semibold mb-2">Alterar Senha</h3>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Senha Atual:</label>
        <input
          type="password"
          value={passwordData.oldPassword}
          onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="***********"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Nova Senha:</label>
        <input
          type="password"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="***********"
        />
      </div>

      <button
        type="button"
        onClick={() => onChangePassword(passwordData)} // só manda senha
        className="w-full bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        Alterar Senha
      </button>
    </form>
  );
}

export default ProfileForm;
