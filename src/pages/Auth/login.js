// src/pages/Login/login.js
import { useState } from "react";
import { login } from "../../services/emailService";
import { useNavigate } from "react-router-dom";


export default function useLoginForm() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [formError, setFormError] = useState('');


  const navigate = useNavigate()

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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

    if (!emailInput) {
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

    try {
      const response = await login({ email: emailInput, password: passwordInput });
      const token = response.data.token;

      localStorage.setItem('token', token);
      navigate('/send-emails');
    } catch (error) {
      setFormError(error.message);
    }
  };

  return {
    emailInput,
    passwordInput,
    emailInputError,
    passwordInputError,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    formError
  };
}
