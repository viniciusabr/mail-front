import './styles/tailwind.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import EmailForm from "./pages/EmailForm/EmailForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Auth/LoginPage';
import Register from './pages/Auth/RegisterPage';
import PageLayout from './components/PageLayout';
import PageLayoutRegister from './components/PageLayoutRegister';
import PageLayoutSendMail from './components/PageLayoutSendMail';
import HeaderDashboard from './components/Header/HeaderDashboard';
import HeaderProfile from './components/Header/HeaderProfile';
import HeaderRegister from './components/Header/HeaderRegister';
import HeaderLogin from './components/Header/HeaderLogin';
import HeaderAdministrativo from './components/Header/HeaderAdminstrativo'
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/ProfilePage'
import TemplateGenerator from './pages/Templates/TemplateGeneratorPage';

import PrivateRoute from "./routes/PrivateRoute";
import PrivateRouteAdmin from "./routes/PrivateRouteAdm";
import PainelAdmistrativo from './pages/PainelAdminstrativo/PainelAdmistrativo';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        {/* Redirecionamento padrão baseado no usuário salvo */}
        <Route
          path="/"
          element={
            <Navigate
              to={localStorage.getItem("user") ? "/send-emails" : "/auth/login"}
            />
          }
        />

        {/* Rota protegida para envio de emails */}
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

        {/* Rota de registro */}
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

        {/* Rota de login */}
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

        {/* Rota protegida para painel administrativo */}
        <Route
          path="/painel"
          element={
            <PrivateRouteAdmin>
              <PageLayoutSendMail
                showHeader={true}
                header={<HeaderAdministrativo />}
              >
                <PainelAdmistrativo />
              </PageLayoutSendMail>
            </PrivateRouteAdmin>
          }
        />

        <Route
          path="/dashbord"
          element={
            <PrivateRouteAdmin>
              <PageLayoutSendMail
                showHeader={true}
                header={<HeaderDashboard />}
              >
                <Dashboard />

              </PageLayoutSendMail>
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PageLayoutSendMail
                showHeader={true}
                header={<HeaderProfile />}
              >
                <Profile />

              </PageLayoutSendMail>
            </PrivateRoute>
          }
        />

        {
          import.meta.env.MODE === 'development' && (
            <Route path="/templates" element={<TemplateGenerator />} />
          )}

      </Routes>

      <ToastContainer />
    </HashRouter>
  </StrictMode>
);
