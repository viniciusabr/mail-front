import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import FormInput from "../../components/FormInput/FormInput.jsx";
import useLoginForm from "./login.js";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout.jsx";

const MotionForm = motion.form;

export default function Login() {
  const navigate = useNavigate();

  const {
    emailInput,
    passwordInput,
    emailInputError,
    passwordInputError,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    formError,
  } = useLoginForm();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md gap-8">
      <MotionForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-white rounded-xl shadow-lg border border-1 border-orange-500 p-8 space-y-6 text-black"
      >
        <h2 className="text-2xl font-semibold text-center text-[#512DA8]">
          Login
        </h2>

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
          placeholder="Senha"
          autoComplete="current-password"
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

        {formError && (
          <div className="text-red-600 text-sm text-center">{formError}</div>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-md text-white font-semibold transition duration-300 shadow-md bg-[linear-gradient(to_right,_#ff7c00,_#ff9900_50%,_#ff7c00)] hover:brightness-110 hover:shadow-lg"

        >
          Entrar
        </button>

        <div className="text-center text-sm text-[#512DA8] mt-2">
          Não tem uma conta?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/register")}
            className="underline text-[#f7941e] hover:text-[#d67600] transition"
          >
            Registrar
          </button>
        </div>
      </MotionForm>
    </div>
  );
}

