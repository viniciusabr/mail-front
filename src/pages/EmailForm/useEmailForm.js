import { toast } from 'react-toastify';
import { sendEmails } from '../../services/emailService';
import { useState } from 'react';


const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export default function useEmailForm() {
  const [nome, setNome] = useState('');
  const [numeroCaso, setNumeroCaso] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [pendingEmailEntries, setPendingEmailEntries] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [nomeError, setNomeError] = useState(false);
  const [casoError, setCasoError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const toastErrorStyle = {
    icon: '❌',
    style: {
      background: '#ffe5e5', // tom rosado claro
      color: '#b91c1c',                 // vermelho escuro para o texto
      fontWeight: 'bold',
      borderLeft: '6px solid #dc2626', // vermelho vibrante
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      borderRadius: '8px',
    },
    progressStyle: {
      background: '#dc2626', // mesmo vermelho do destaque lateral
    },
  }

  const toastSuccessStyle = {
    icon: '📤',
    style: {
      background: '#f0fdf4',
      color: '#065f46',
      fontWeight: 'bold',
      borderLeft: '6px solid #22c55e',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
    progressStyle: {
      background: '#22c55e',
    }
  }

  const handleAddEntryToList = () => {

    let hasError = false;

    if (!nome.trim()) {
      setNomeError(true);
      hasError = true
    } else {
      setNomeError(false);
    }

    if (!numeroCaso.trim()) {
      setCasoError(true);
      hasError = true
    } else {
      setCasoError(false);
    }

    if (!emailInput.trim()) {
      setEmailInputError(true);
      hasError = true
    } else {
      setEmailInputError(false);
    }

    if (!isValidEmail(emailInput) && emailInput.length !== 0) {
      setEmailInputError(true);
      setValidEmail(true);
      toast.error('Endereço de e-mail inválido. Por favor, revise e tente novamente.', toastErrorStyle);

      return false
    }


    if (!/^\d+$/.test(numeroCaso) && numeroCaso.length !== 0) {
      setCasoError(true);
      toast.error('O número do caso deve conter apenas números.', toastErrorStyle);
      return false;
    }

    if (numeroCaso.length !== 8 && numeroCaso.length !== 0) {
      setCasoError(true);
      toast.error('O número do caso deve ter exatamente 8 dígitos.', toastErrorStyle);
      return false;
    }

    if (hasError) return false


    const isDuplicate = pendingEmailEntries.some(entry =>
      entry.destinatario === emailInput.trim() &&
      entry.nome === nome.trim() &&
      entry.numeroCaso === numeroCaso.trim()
    );

    if (isDuplicate) {
      toast.error('Esta entrada (Nome, Número do Caso, E-mail) já foi adicionada à lista.', toastErrorStyle);
      return;
    }

    const newEntry = {
      id: Date.now(),
      nome: nome.trim(),
      numeroCaso: numeroCaso.trim(),
      destinatario: emailInput.trim(),
    };

    setPendingEmailEntries(prev => [...prev, newEntry]);
    setNome('');
    setNumeroCaso('');
    setEmailInput('');
    setEmailInputError(false);
    toast.success('Informações adicionadas à lista de envios! 👌', toastSuccessStyle);

    return true
  };

  const handleRemoveEntry = (idToRemove) => {
    setPendingEmailEntries(prev => prev.filter(entry => entry.id !== idToRemove));
  };

  const handleSendAllEmails = async () => {
    if (pendingEmailEntries.length === 0) {
      toast.warn('Não há e-mails na lista para enviar.');
      return;
    }

    setIsSending(true);

    const dataToSend = pendingEmailEntries.map(entry => ({
      name: entry.nome,
      email: entry.destinatario,
      caso: entry.numeroCaso,
      data: new Date()
    }));

    const payload = { data: dataToSend };

    const totalPendingEmails = pendingEmailEntries.length;
    const msgSuccess =
      totalPendingEmails === 1
        ? `O e-mail foi enviado com sucesso para a loja! 📬`
        : `Todos os ${totalPendingEmails} e-mails foram enviados com sucesso para as respectivas lojas! 📬`;

    try {
      await sendEmails(payload);
      toast.success(msgSuccess, {
        icon: '📤',
        style: {
          background: '#e6ffed',
          color: '#065f46',
          fontWeight: 'bold',
          borderLeft: '6px solid #34d399',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          borderRadius: '8px',
        },
        progressStyle: {
          background: '#34d399',
        },
      });


      setPendingEmailEntries([]);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      toast.error(`Erro ao enviar e-mails: ${error.message}`);

    } finally {
      setIsSending(false);
    }
  };

  return {
    nome, setNome,
    numeroCaso, setNumeroCaso,
    emailInput, setEmailInput,
    validEmail, setValidEmail,
    pendingEmailEntries,
    nomeError, emailInputError, casoError,
    setNomeError, setEmailInputError, setCasoError,
    isSending,
    handleAddEntryToList,
    handleRemoveEntry,
    handleSendAllEmails,
  };
}