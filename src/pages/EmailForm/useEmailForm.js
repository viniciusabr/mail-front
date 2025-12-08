import { toast } from 'react-toastify';
import { sendEmails } from '../../services/emailService';
import { useState } from 'react';

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export default function useEmailForm() {

  const [nome, setNome] = useState('');
  const [numeroCaso, setNumeroCaso] = useState(['']); 
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
      background: '#ffe5e5',
      color: '#b91c1c',
      fontWeight: 'bold',
      borderLeft: '6px solid #dc2626',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      borderRadius: '8px',
    },
    progressStyle: { background: '#dc2626' },
  };

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
    progressStyle: { background: '#22c55e' },
  };

  // ======================================================================
  // 🔥 ADICIONAR UMA ENTRADA A LISTA
  // ======================================================================

  const handleAddEntryToList = () => {
    let hasError = false;

    // valida nome
    if (!nome.trim()) {
      setNomeError(true);
      hasError = true;
    } else {
      setNomeError(false);
    }

    // valida email vazio
    if (!emailInput.trim()) {
      setEmailInputError(true);
      hasError = true;
    } else {
      setEmailInputError(false);
    }

    // valida email inválido
    if (!isValidEmail(emailInput) && emailInput.length !== 0) {
      setEmailInputError(true);
      setValidEmail(true);
      toast.error('Endereço de e-mail inválido. Por favor, revise e tente novamente.', toastErrorStyle);
      return false;
    }

    // ======================================================================
    // 🔥 VALIDAÇÃO DOS CAMPOS DINÂMICOS (numeroCaso[])
    // ======================================================================
    numeroCaso.forEach((caso, index) => {
      const trimmed = caso.trim();

      if (!trimmed) {
        setCasoError(true);
        hasError = true;
        return;
      }

      if (!/^\d+$/.test(trimmed)) {
        setCasoError(true);
        hasError = true;
        toast.error(`O número do caso no campo #${index + 1} deve conter apenas números.`, toastErrorStyle);
        return;
      }

      if (trimmed.length !== 8) {
        setCasoError(true);
        hasError = true;
        toast.error(`O número do caso no campo #${index + 1} deve ter exatamente 8 dígitos.`, toastErrorStyle);
        return;
      }
    });

    if (hasError) return false;

    const normalizedCases = numeroCaso.map((n) => n.trim());

    // ======================================================================
    // 🔥 EVITAR ENTRADAS DUPLICADAS (nome + email + lista de casos)
    // ======================================================================
    const isDuplicate = pendingEmailEntries.some((entry) =>
      entry.destinatario === emailInput.trim() &&
      entry.nome === nome.trim() &&
      JSON.stringify(entry.numeroCaso) === JSON.stringify(normalizedCases)
    );

    if (isDuplicate) {
      toast.error('Esta entrada (Nome, Números do Caso, E-mail) já foi adicionada à lista.', toastErrorStyle);
      return;
    }

    // ======================================================================
    // 🔥 CRIA NOVA ENTRADA
    // ======================================================================
    const newEntry = {
      id: Date.now(),
      nome: nome.trim(),
      numeroCaso: normalizedCases,
      destinatario: emailInput.trim(),
    };

    setPendingEmailEntries((prev) => [...prev, newEntry]);

    // reset form
    setNome('');
    setNumeroCaso(['']);
    setEmailInput('');
    setEmailInputError(false);

    toast.success('Informações adicionadas à lista de envios! 👌', toastSuccessStyle);

    return true;
  };

  const handleCasoChange = (index, value) => {
    setNumeroCaso(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };


  // ======================================================================
  // 🔥 REMOVER ITEM
  // ======================================================================
  const handleRemoveEntry = (idToRemove) => {
    setPendingEmailEntries((prev) => prev.filter((entry) => entry.id !== idToRemove));
  };

  // ======================================================================
  // 🔥 ENVIAR TODOS
  // ======================================================================
  const handleSendAllEmails = async () => {
    if (pendingEmailEntries.length === 0) {
      toast.warn('Não há e-mails na lista para enviar.');
      return;
    }

    setIsSending(true);

    const dataToSend = pendingEmailEntries.map((entry) => ({
      name: entry.nome,
      email: entry.destinatario,
      casos: entry.numeroCaso,   // 🔥 AGORA CORRETO!
      data: new Date(),
    }));

    const payload = { data: dataToSend };

    const total = pendingEmailEntries.length;

    const msgSuccess =
      total === 1
        ? `O e-mail foi enviado com sucesso para a loja! 📬`
        : `Todos os ${total} e-mails foram enviados com sucesso! 📬`;

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
        progressStyle: { background: '#34d399' },
      });

      setPendingEmailEntries([]);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      toast.error(`Erro ao enviar e-mails: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  // ======================================================================
  // 🔥 EXPORTA PARA O COMPONENTE
  // ======================================================================

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
    handleCasoChange
  };
}
