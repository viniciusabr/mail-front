import axios from 'axios';
import { toast } from "react-toastify";

const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/'
    : 'https://mail-pj9m.onrender.com/';


const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado. Faça login novamente.");
  return token;
};

// Envio de emails
export const sendEmails = async (payload) => {
  const token = getToken();

  try {
    await axios.post(`${BASE_URL}api/email/send`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Erro ao enviar';
    throw new Error(message);
  }
};

// Login
export const login = async (payload) => {
  try {
    return await axios.post(`${BASE_URL}api/auth/login`, payload);
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Erro ao enviar';
    toast.error(message);
    throw new Error(message);
  }
};

// Registro
export const register = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}api/auth/register`, payload);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Erro ao enviar';
    toast.error(message);
    throw new Error(message);
  }
};

// Obter usuários
export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}api/users`);
  if (Array.isArray(response.data)) return response.data;
  if (response.data && Array.isArray(response.data.users)) return response.data.users;
  return [];
};

// Alternar status do usuário
export const toggleUserStatus = async (id, currentStatus) => {
  const newStatus = currentStatus === "ativo" ? "inativo" : "ativo";
  const response = await axios.patch(`${BASE_URL}api/users/${id}/status`, { status: newStatus });
  return response.data.user;
};

// Alternar admin do usuário
export const updateUserAdmin = async (id, isAdmin) => {
  const response = await axios.patch(`${BASE_URL}api/users/${id}/admin`, { isAdmin });
  return response.data.user;
};

//pega o perfil do usuário logado
export const getProfile = async () => {
  const token = getToken(); // pega token do localStorage

  try {
    const response = await axios.get(`${BASE_URL}api/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data; // retorna objeto do usuário
  } catch (error) {
    const message = error.response?.data?.error || error.message || "Erro ao buscar perfil";
    toast.error(message);
    throw new Error(message);
  }
};

export const updateProfile = async (data) => {
  const token = getToken();
  try {
    const response = await axios.put(`${BASE_URL}api/users/me`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success(response.data.message);
    return response.data.user;
  } catch (error) {
    const message = error.response?.data?.error || error.message || "Erro ao atualizar perfil";
    toast.error(message);
    throw new Error(message);
  }
};

// Alterar senha
export const changePassword = async ({ oldPassword, newPassword }) => {
  const token = getToken();
  try {
    const response = await axios.put(
      `${BASE_URL}api/users/me/password`,
      { oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success(response.data.message);
    return true;
  } catch (error) {
    const message = error.response?.data?.error || error.message || "Erro ao alterar senha";
    toast.error(message);
    throw new Error(message);
  }
};
