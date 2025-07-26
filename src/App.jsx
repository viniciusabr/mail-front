import './styles/tailwind.css';


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import EmailForm from "./pages/EmailForm/EmailForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PageLayout from './components/PageLayout';
import HeaderDashboard from './components/Header/HeaderDashboard';
import HeaderRegister from './components/Header/HeaderRegister';
import HeaderLogin from './components/Header/HeaderLogin';
import PageLayoutRegister from './components/PageLayoutRegister';
import PageLayoutSendMail from './components/PageLayoutSendMail';

const token = localStorage.getItem("token");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirecionamento padrão baseado no token */}
        <Route
          path="/"
          element={<Navigate to={token ? "/send-emails" : "/auth/login"} />}
        />

        {/* Páginas com layout padrão */}
        <Route
          path="/send-emails"
          element={
            <PageLayoutSendMail
              showHeader={true}
              header={<HeaderDashboard />}
            >
              <EmailForm />
            </PageLayoutSendMail>
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
              header={<HeaderLogin />}>
              <Login />
            </PageLayout>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>
);
