import { useEffect, useState } from "react";
import ProfileForm from "../../components/Profile/ProfileForm";
import { getProfile, updateProfile, changePassword } from "../../services/emailService";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleUpdateProfile = async (data) => {
    try {
      const updated = await updateProfile(data);
      setUser(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePassword = async (data) => {
    try {
      await changePassword(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando perfil...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">Usuário não encontrado</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ProfileForm
        user={user}
        onUpdateProfile={handleUpdateProfile}
        onChangePassword={handleChangePassword}
      />
    </div>
  );
}

export default ProfilePage;
