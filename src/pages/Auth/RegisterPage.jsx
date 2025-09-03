import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import FormInput from "../../components/FormInput/FormInput";
import useRegister from "./register";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/HeaderLogin";
import HeaderRegister from "../../components/Header/HeaderRegister";
import GradientButton from "../../components/GradientButton/GradientButton";
import { Lock, Mail, User } from "lucide-react";
import Back from "../../components/Back/Back";

const MotionForm = motion.form;
const MotionAlert = motion.div;

export default function Register() {
  const {
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
    setFormError,
  } = useRegister();

  const [showError, setShowError] = useState(false);
  const [errorKey, setErrorKey] = useState(0);

  useEffect(() => {
    if (formError) {
      setShowError(false);

      const delay = setTimeout(() => {
        setErrorKey(prev => prev + 1)
        setShowError(true);

        const hide = setTimeout(() => {
          setShowError(false);
          setTimeout(() => setFormError(""), 300);
        }, 4000);

        return () => clearTimeout(hide);
      }, 50);

      return () => clearTimeout(delay);
    }
  }, [formError, setFormError]);

  return (
    // <div className="flex flex-col items-center justify-center flex-1 w-full">
    <div className="flex flex-col items-center justify-center w-full max-w-md gap-8">

      
      <AnimatePresence>
        {showError && (
          <MotionAlert
            key={errorKey}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full bg-white rounded-xl shadow-lg border border-1 border-orange-500 p-8 space-y-6 text-black"
          >
            {formError}
          </MotionAlert>
        )}
      </AnimatePresence>

      <MotionForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-white rounded-xl shadow-lg border border-1 border-orange-500 p-8 space-y-6 text-black"
      >
        <Back/>
        <h2 className="text-3xl font-semibold text-center text-[#512DA8]">Registro</h2>

        <FormInput
          type="text"
          name="name"
          placeholder="Nome"
          autoComplete="name"
          value={nameInput}
          onChange={handleNameChange}
          error={nameInputError && "Preencha o campo Nome."}
          icon={User}
        />

        <FormInput
          type="email"
          name="email"
          placeholder="E-mail"
          autoComplete="email"
          value={emailInput}
          onChange={handleEmailChange}
          error={
            emailInputError === "required"
              ? "Preencha o campo E-mail."
              : emailInputError === "invalid"
                ? "Digite um e-mail válido."
                : ""
          }
          icon={Mail}
        />

        <FormInput
          type="password"
          name="password"
          placeholder="Senha"
          autoComplete="new-password"
          value={passwordInput}
          onChange={handlePasswordChange}
          error={
            passwordInputError === "required"
              ? "Preencha o campo Senha."
              : passwordInputError === "short"
                ? "A senha precisa ter pelo menos 6 caracteres."
                : ""
          }
          icon={Lock}
        />

        <GradientButton type="submit">Registrar</GradientButton>
      </MotionForm>

    </div>
  );
}

