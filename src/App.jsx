import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import EmailForm from "./pages/EmailForm/EmailForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // se ainda não tiver incluído

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/send-emails" element={<EmailForm />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>
);
