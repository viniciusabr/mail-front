// src/pages/Login/Login.jsx
import FormInput from "../../components/FormInput/FormInput";
import useLoginForm from "./login.js";

export default function Login() {
  const {
    emailInput,
    passwordInput,
    emailInputError,
    passwordInputError,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    formError
  } = useLoginForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm w-full bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold text-center">Login</h2>

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
      />

      <FormInput
        type="password"
        placeholder="Senha"
        value={passwordInput}
        onChange={handlePasswordChange}
        error={
          passwordInputError === "required"
            ? "Preencha o campo Senha."
            : passwordInputError === "short"
              ? "A senha precisa ter pelo menos 6 caracteres."
              : ""
        }
      />

      {formError && (
        <div className="text-red-600 text-sm text-center">
          {formError}
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Entrar
      </button>
    </form>
  );
}
