import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/emailService";

export default function useRegister() {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [nameInputError, setNameInputError] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");


  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
    setNameInputError("");
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
    setEmailInputError("");
  };

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
    setPasswordInputError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!nameInput.trim()) {
      setNameInputError("required");
      hasError = true;
    }

    if (!emailInput.trim()) {
      setEmailInputError("required");
      hasError = true;
    } else if (!validateEmail(emailInput)) {
      setEmailInputError("invalid");
      hasError = true;
    }

    if (!passwordInput) {
      setPasswordInputError("required");
      hasError = true;
    } else if (passwordInput.length < 6) {
      setPasswordInputError("short");
      hasError = true;
    }

    if (hasError) return;

    console.log("Registro enviado:", {
      name: nameInput,
      email: emailInput,
      password: passwordInput,
    });

    try {
      const result = await register({
        name: nameInput,
        email: emailInput,
        password: passwordInput,
      });

      console.log("Resultado do register:", result);
      console.log("Token retornado:", result?.token);

      navigate("/send-emails");

    } catch (error) {
      console.error("Erro ao registrar:", error.response?.data || error.message);
      setFormError(error.message)
      throw error;
    }

  };

  return {
    nameInput,
    emailInput,
    passwordInput,
    nameInputError,
    emailInputError,
    passwordInputError,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    formError,
    setFormError
  };
}
