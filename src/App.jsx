import './styles/tailwind.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import EmailForm from "./pages/EmailForm/EmailForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Auth/LoginPage';
import Register from './pages/Auth/RegisterPage';
import PageLayout from './components/PageLayout';
import HeaderDashboard from './components/Header/HeaderDashboard';
import HeaderRegister from './components/Header/HeaderRegister';
import HeaderLogin from './components/Header/HeaderLogin';
import PageLayoutRegister from './components/PageLayoutRegister';
import PageLayoutSendMail from './components/PageLayoutSendMail';
import PrivateRoute from "./routes/PrivateRoute";
import PainelAdmistrativo from './pages/PainelAdminstrativo/PainelAdmistrativo';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirecionamento padrão baseado no token */}
        <Route
          path="/"
          element={<Navigate to={localStorage.getItem("token") ? "/send-emails" : "/auth/login"} />}
        />

        {/* Rota protegida */}
        <Route
          path="/send-emails"
          element={
            <PrivateRoute>
              <PageLayoutSendMail
                showHeader={true}
                header={<HeaderDashboard />}
              >
                <EmailForm />
              </PageLayoutSendMail>
            </PrivateRoute>
          }
        />

        <Route
          path="/auth/register"
          element={
            <PageLayoutRegister
              showHeader={true}
              header={<HeaderRegister />}
            >
              <Register />
            </PageLayoutRegister>
          }
        />

        <Route
          path="/auth/login"
          element={
            <PageLayout
              showHeader={true}
              header={<HeaderLogin />}
            >
              <Login />
            </PageLayout>
          }
        />
        <Route
          path="/painel"
          element={
            <PrivateRoute>
            <PageLayout
              showHeader={true}
              header={<HeaderLogin />}
            >
              <PainelAdmistrativo />
            </PageLayout>
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>
);